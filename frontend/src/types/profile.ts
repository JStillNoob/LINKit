export type ThemeName = 'professional' | 'minimal' | 'dark' | 'creative' | 'nature' | 'playful'

export type ProfileMode = 'personal' | 'business'

export interface ProfileLink {
  id: string
  title: string
  subtitle: string
  url: string
  icon: 'linkedin' | 'github' | 'globe' | 'mail' | 'link'
}

export interface ProfileData {
  id: string
  name: string
  headline: string
  avatarUrl?: string
  avatarInitials: string
  isVerified: boolean
  phone?: string
  email?: string
  website?: string
  personalLinks: ProfileLink[]
  businessLinks: ProfileLink[]
}

export interface ExchangeContactInput {
  name: string
  email: string
  phone: string
  notes?: string
}
