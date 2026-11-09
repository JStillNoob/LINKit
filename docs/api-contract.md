# LINKit — API Contract (`docs/api-contract.md`)
**Version:** 1.0 (MVP)  
**Base URL:** `/api/v1`  
**Authentication:** Laravel Sanctum (`Authorization: Bearer <token>`)  
**Design / Theme System:** Monochrome (default theme key: `"professional"`)  

---

## 1. General Conventions
1. **JSON Envelope:** All responses return standard JSON bodies.
2. **Public vs. Protected Scope:** Public endpoints return public profile fields only. **Never** expose user email, role, or account credentials.
3. **Privacy Compliance:** Never store raw visitor IP addresses; all telemetry endpoints hash IP with application key.
4. **Scope Flags:**
   - Multi-profile switching (Personal vs. Business) is **[post-MVP]**.
   - Two-way Contact Exchange lead capture is **[post-MVP]**.

---

## 2. Authentication Endpoints (Public)

### 2.1 Register
`POST /api/v1/auth/register`
* **Request:**
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "password": "Password123!",
    "password_confirmation": "Password123!"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "Alex Mercer",
        "email": "alex@example.com"
      },
      "token": "1|sanctum_token_string..."
    }
  }
  ```

### 2.2 Login
`POST /api/v1/auth/login`
* **Request:**
  ```json
  {
    "email": "alex@example.com",
    "password": "Password123!"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "Alex Mercer",
        "email": "alex@example.com"
      },
      "token": "2|sanctum_token_string..."
    }
  }
  ```

### 2.3 Logout
`POST /api/v1/auth/logout` *(Sanctum Auth Required)*
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### 2.4 Authenticated User Me
`GET /api/v1/auth/me` *(Sanctum Auth Required)*
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "name": "Alex Mercer",
      "email": "alex@example.com",
      "role": "customer"
    }
  }
  ```

---

## 3. Public Profile Endpoints (No Auth Required)

Used by NFC card taps, QR scans, and public web profile visitors (`https://linkit.id/c/{slug}`).

### 3.1 Get Public Profile
`GET /api/v1/public/profiles/{slug}`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "8f8b8a8b-4c2d-4e9f-9a1b-3c4d5e6f7a8b",
      "slug": "alex-mercer",
      "title": "Main Profile",
      "first_name": "Alex",
      "last_name": "Mercer",
      "prefix": "Dr.",
      "headline": "Lead Software Architect",
      "company": "LINKit Technologies",
      "department": "Engineering",
      "bio": "Building next-generation digital identity solutions.",
      "avatar_url": "https://[supabase-storage]/avatars/alex.jpg",
      "banner_url": "https://[supabase-storage]/banners/hero.jpg",
      "is_verified": true,
      "theme": "professional",
      "links": [
        {
          "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          "platform": "phone",
          "label": "Call Direct",
          "value": "+1234567890",
          "icon": "phone",
          "display_order": 1
        },
        {
          "id": "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          "platform": "linkedin",
          "label": "Connect on LinkedIn",
          "value": "https://linkedin.com/in/alexmercer",
          "icon": "linkedin",
          "display_order": 2
        }
      ]
    }
  }
  ```
  *(Notice: User account email, role, and password data are completely stripped).*

### 3.2 Download vCard (.vcf)
`GET /api/v1/public/profiles/{slug}/vcard`
* **Response:** Streamed MIME `text/vcard; charset=utf-8` file download (RFC 6350) triggering direct phone contact import.

### 3.3 Log Tap / Scan / View / Click Event
`POST /api/v1/public/profiles/{slug}/track`
* **Request:**
  ```json
  {
    "event_type": "nfc_tap",
    "profile_link_id": null,
    "referrer": "nfc"
  }
  ```
* **Response (202 Accepted):**
  ```json
  {
    "success": true,
    "message": "Event recorded"
  }
  ```

---

## 4. Profile Management Endpoints (Customer Auth Required)

### 4.1 Get Customer Profile
`GET /api/v1/profile`
* Returns the authenticated user's profile with all configuration fields (`is_verified`, `theme`, etc.).

### 4.2 Update Customer Profile
`PUT /api/v1/profile`
* **Request:**
  ```json
  {
    "title": "Executive Profile",
    "first_name": "Alex",
    "last_name": "Mercer",
    "prefix": "Dr.",
    "headline": "VP of Architecture",
    "company": "LINKit Corp",
    "department": "Platform",
    "bio": "Updated bio text...",
    "theme": "dark",
    "is_public": true
  }
  ```
  *(Note: `is_verified` is read-only for customers; managed via super_admin).*

### 4.3 Profile Links CRUD
* `GET /api/v1/profile/links`: List all links.
* `POST /api/v1/profile/links`: Add a new link.
* `PUT /api/v1/profile/links/{id}`: Update an existing link.
* `DELETE /api/v1/profile/links/{id}`: Delete a link.
* `PUT /api/v1/profile/links/reorder`: Reorder link display positions:
  ```json
  {
    "orders": [
      { "id": "uuid-1", "display_order": 1 },
      { "id": "uuid-2", "display_order": 2 }
    ]
  }
  ```

### 4.4 Profile Media Upload
* `POST /api/v1/profile/avatar`: Upload avatar file (validated: max 2MB, jpg/png/webp) to Supabase Storage.
* `POST /api/v1/profile/banner`: Upload banner file (validated: max 5MB, jpg/png/webp) to Supabase Storage.

### 4.5 Profile Analytics Summary
`GET /api/v1/profile/analytics`
* Returns real metric counts: views, NFC taps, QR scans, vCard downloads, and link click breakdowns. (Real zeros, no fake sample data).

---

## 5. Post-MVP Endpoints (Reserved / Feature-Flagged)
* `POST /api/v1/profiles`: Create secondary profile (Personal / Business switching) — **[post-MVP]**.
* `PUT /api/v1/profiles/{id}/switch`: Switch active primary profile — **[post-MVP]**.
* `POST /api/v1/public/profiles/{slug}/exchange`: Submit visitor contact information (Two-way contact exchange) — **[post-MVP]**.
