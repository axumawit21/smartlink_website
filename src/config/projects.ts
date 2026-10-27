/** Editable project catalogue. Every fact comes from the SmartLink company profile. Photos live in /public/projects. */
export type Sector = 'healthcare' | 'education' | 'public' | 'banking' | 'industry'
export type Pillar = 'security' | 'safety' | 'communication'
export interface Sys { label: string; pillar: Pillar }
export interface Project {
  id: string; title: string; client: string; sector: Sector; summary: string
  image?: string; render?: boolean; featured?: boolean
  metric?: { value: string; label: string }   // big number for text-only cards
  note?: string                               // status / date / contractor, only when the profile states it
  systems: Sys[]
}
export const SECTORS: { id: Sector | 'all'; label: string }[] = [
  { id: 'all', label: 'All projects' }, { id: 'healthcare', label: 'Healthcare' }, { id: 'education', label: 'Education' },
  { id: 'public', label: 'Public sector' }, { id: 'banking', label: 'Banking' }, { id: 'industry', label: 'Industry & NGO' },
]
const S = (label: string, pillar: Pillar): Sys => ({ label, pillar })
const net = (l: string) => S(l, 'communication'), sec = (l: string) => S(l, 'security'), saf = (l: string) => S(l, 'safety')

export const STATS = [
  { value: 180, suffix: '+', label: 'Bank branches networked', sub: 'Wegagen Bank' },
  { value: 113, suffix: '', label: 'Weredas secured, plus 10 sub-cities', sub: 'Addis Ababa Trade & Industry Bureau' },
  { value: 270, suffix: '', label: 'Wireless access points deployed', sub: 'Ethiopian Civil Service University' },
  { value: 150, suffix: '+', label: 'CCTV cameras in a single hospital', sub: 'Arbaminch Referral Hospital' },
]

export const PROJECTS: Project[] = [
  { id: 'arbaminch', title: 'Arbaminch Referral Hospital', client: 'Arbaminch University', sector: 'healthcare', featured: true, image: 'arbaminch.jpg',
    summary: 'A complete hospital building: Cisco campus network, data center, surveillance, IPTV, nurse call, fire alarm and door access, delivered as a subcontract for Yirgalem Construction.',
    metric: { value: '150+', label: 'CCTV cameras' },
    systems: [net('Cisco campus network'), net('Data center'), sec('150+ CCTV cameras'), net('200+ IPTV'), saf('Nurse call'), saf('Fire alarm'), sec('Door access control')] },
  { id: 'wegagen', title: 'Wegagen Bank', client: 'Wegagen Bank', sector: 'banking', metric: { value: '180+', label: 'branches networked' },
    summary: 'LAN implementation and maintenance for more than 180 branches and the head office, backed by a 5-year SLA.',
    note: 'Client letter dated March 2020', systems: [net('LAN: trunk, cabling, patch panel'), net('Configuration'), net('Maintenance and support'), net('5-year SLA')] },
  { id: 'tidb', title: 'Addis Ababa Trade & Industry Bureau', client: 'Addis Ababa Trade & Industry Development Bureau', sector: 'public', metric: { value: '113', label: 'weredas + 10 sub-cities' },
    summary: 'A secured network for 113 weredas and 10 sub-cities, with a two-year support agreement and training for the bureau\u2019s engineers.',
    note: 'Completed July 2012', systems: [net('Secured network'), net('Exchange, DNS, DHCP, Active Directory'), net('Cisco and Microsoft training')] },
  { id: 'wolkite', title: 'Wolkite University Workshop', client: 'Wolkite University', sector: 'education', image: 'wolkite.jpg',
    summary: 'Campus network, surveillance, conferencing and building safety for the university workshop.',
    systems: [net('Cisco campus network'), net('Data center'), sec('CCTV'), net('MATV'), net('Audio and video conferencing'), saf('Fire alarm'), sec('Door access control')] },
  { id: 'nma', title: 'National Meteorology Agency', client: 'FDRE Ministry of Urban Development and Construction', sector: 'public', image: 'nma.jpg', render: true,
    summary: 'LOT I Educational, Office II and Meeting Hall Building: data and wireless network, surveillance, fire alarm and public address.',
    note: 'Completed', systems: [net('Wi-Fi network'), net('Fiber backbone cabling'), net('Rack and patch panel'), sec('Security cameras'), saf('Fire alarm'), saf('Public address')] },
  { id: 'debrebirhan', title: 'Hakim Gizawu Referral Hospital', client: 'Debrebirhan University', sector: 'healthcare', image: 'debrebirhan.jpg',
    summary: 'Network, surveillance, nurse call, fire alarm and public address for the referral hospital building.',
    systems: [net('Wi-Fi network'), net('Fiber backbone cabling'), sec('Security cameras'), saf('Nurse call'), saf('Fire alarm'), saf('Public address')] },
  { id: 'ena', title: 'Ethiopian News Agency Media Complex', client: 'Ethiopian News Agency', sector: 'public', image: 'ena.jpg',
    summary: 'Voice and data network infrastructure with video surveillance, fire alarm and door access control.',
    systems: [net('Voice and data network'), sec('CCTV'), saf('Fire alarm'), sec('Door access control')] },
  { id: 'ecsu-hall', title: 'Administration and Education Hall', client: 'Ethiopian Civil Service University', sector: 'education', image: 'ecsu-hall.jpg', render: true,
    summary: 'Cisco 9300-series switching, Aironet wireless access points, a 27U data rack with fiber backbone, plus cameras, TV, fire alarm and sound.',
    note: 'Contractor: Bantiwalu Tesema GC', systems: [net('Cisco switching and Wi-Fi'), net('12-core fiber backbone'), sec('Security cameras'), net('TV system'), saf('Fire alarm'), saf('Public address and sound')] },
  { id: 'diredawa', title: 'Clinic Block and Library', client: 'Dire Dawa University', sector: 'education', image: 'diredawa.jpg',
    summary: 'Network, surveillance, nurse call, fire alarm and public address across the clinic block and library.',
    note: 'Completed and successfully commissioned', systems: [net('Wi-Fi network'), net('Fiber backbone cabling'), sec('Security cameras'), saf('Nurse call'), saf('Fire alarm'), saf('Public address')] },
  { id: 'ecsu-wifi', title: 'Campus Wireless and Fiber Network', client: 'Ethiopian Civil Service University', sector: 'education', metric: { value: '270', label: 'access points' },
    summary: 'Fiber optic backbone, LAN and a wireless network with powered access points across the campus, plus a data center.',
    systems: [net('Fiber backbone'), net('Wireless LAN'), net('Data center')] },
  { id: 'metrology', title: 'Metrology African Institute', client: 'Metrology African Institute, Addis Ababa', sector: 'public', metric: { value: '150+', label: 'security cameras' },
    summary: 'Surveillance, door and pedestrian gate access control, fire alarm, public address and LAN infrastructure.',
    systems: [sec('150+ security cameras'), sec('Door access control'), sec('Pedestrian gate access'), saf('Fire alarm'), net('MATV and LAN')] },
  { id: 'police', title: 'Nefas Silk Lafto Police Department', client: 'Addis Ababa Police Commission', sector: 'public',
    summary: 'Supply, design, installation and commissioning of CCTV and integrated physical security for a G+5 building and selected roads.',
    note: 'Completed', systems: [sec('CCTV'), sec('Integrated physical security')] },
  { id: 'amhara', title: 'Amhara Bureau of Agriculture', client: 'Amhara National Regional State', sector: 'public', metric: { value: '600', label: 'users trained' },
    summary: 'LAN installation at 6 zonal and 28 wereda sites across the region, with training for end users.',
    systems: [net('LAN: 6 zonal and 28 wereda sites'), net('End-user training')] },
  { id: 'giz', title: 'GIZ Ethiopia and Djibouti', client: 'GIZ country office', sector: 'industry',
    summary: 'A secured network infrastructure with data center devices, structured cabling and data center cooling, power and fire protection.',
    systems: [net('Secured network'), net('Structured cabling'), net('Data center: AC, UPS, fire extinguisher')] },
  { id: 'steel', title: 'Steely RMI and Asmen Steel', client: 'Steel factories, Bishoftu', sector: 'industry',
    summary: 'IP-based CCTV deployed across the manufacturing area, with fiber backbone and LAN installation. Both clients provided recommendation letters.',
    note: 'Completed', systems: [sec('IP CCTV'), net('Fiber backbone'), net('LAN')] },
]
