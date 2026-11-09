import { describe, it, expect } from 'vitest'
import { generateVCard } from '../utils/vcard'
import type { ProfileData } from '../types/profile'

describe('vCard generation', () => {
  const mockProfile: ProfileData = {
    id: 'test-123',
    name: 'Morgan Vance',
    headline: 'Software Architect',
    avatarInitials: 'MV',
    isVerified: true,
    phone: '+15551234567',
    email: 'morgan.vance@example.com',
    website: 'https://morganvance.dev',
    personalLinks: [],
    businessLinks: [],
  }

  it('generates standard RFC compliant vCard 3.0 string', () => {
    const vcard = generateVCard(mockProfile)

    expect(vcard).toContain('BEGIN:VCARD')
    expect(vcard).toContain('VERSION:3.0')
    expect(vcard).toContain('FN:Morgan Vance')
    expect(vcard).toContain('TITLE:Software Architect')
    expect(vcard).toContain('TEL;TYPE=CELL:+15551234567')
    expect(vcard).toContain('EMAIL;TYPE=INTERNET:morgan.vance@example.com')
    expect(vcard).toContain('URL:https://morganvance.dev')
    expect(vcard).toContain('END:VCARD')
  })
})
