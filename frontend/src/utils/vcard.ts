import type { ProfileData } from '@/types/profile'

export function generateVCard(profile: ProfileData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `TITLE:${profile.headline}`,
  ]

  if (profile.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${profile.email}`)
  }

  if (profile.phone) {
    lines.push(`TEL;TYPE=CELL:${profile.phone}`)
  }

  if (profile.website) {
    lines.push(`URL:${profile.website}`)
  }

  lines.push('END:VCARD')
  return lines.join('\r\n')
}

export function downloadVCard(profile: ProfileData): void {
  const vcardContent = generateVCard(profile)
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const cleanFileName = profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'contact'

  link.href = url
  link.setAttribute('download', `${cleanFileName}.vcf`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
