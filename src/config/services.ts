/** Editable service catalogue. Source: SmartLink company profile. */
export type Pillar = 'security' | 'safety' | 'communication' | 'violet' | 'cyan' | 'gold'
export interface ServiceCategory { id: string; title: string; pillar: Pillar; summary: string; items: string[]; proof: string }

export const SERVICES: ServiceCategory[] = [
  { id: 'security', title: 'Security Systems', pillar: 'security',
    summary: 'Surveillance and access systems designed, supplied and installed for corporate sites.',
    items: ['CCTV and IP CCTV', 'Digital video, storage and video multiplexing', 'Surveillance equipment', 'Access control systems', 'Biometric security systems', 'Electromagnetic locks and accessories', 'Car park gate barriers', 'Intrusion and unauthorized access detection'],
    proof: 'ENA Media Complex: CCTV, access control, voice/data and fire alarm' },
  { id: 'safety', title: 'Safety & Building Systems', pillar: 'safety',
    summary: 'Fire, evacuation and building management systems that protect people and property.',
    items: ['Fire alarm system supply and installation', 'Fire evacuation systems', 'Data center fire suppression', 'Integrated building management systems', 'PA/VA (public address and voice alarm)', 'Emergency evacuation systems', 'Key management and remote access', 'Electronic access and facility management', 'Nurse call systems', 'Hotel door locks'],
    proof: 'Arbaminch Referral Hospital: nurse call, fire alarm and voice evacuation' },
  { id: 'communication', title: 'Networks & Communication', pillar: 'communication',
    summary: 'Enterprise networks and communication infrastructure, from a single office to hundreds of branches.',
    items: ['Enterprise LAN and WAN', 'Wireless LAN', 'Fiber optic and structured cabling', 'IP telephony', 'Video conferencing', 'Network and performance management', 'Data center design and implementation', 'ISP and multimedia backbone design', 'VSAT solutions', 'Professional mobile radio (PMR) and TETRA'],
    proof: 'Wegagen Bank: data networks for 180+ branches' },
  { id: 'software', title: 'Software & ERP', pillar: 'violet',
    summary: 'Business software that automates how your organization runs.',
    items: ['Web-based ERP software', 'Customer relationship management', 'Corporate financial systems', 'Procurement and material management', 'Supply chain management', 'Messaging and collaboration solutions', 'Directory and identity solutions', 'Web design, hosting and domain names'],
    proof: 'Kality Food Share Company: ERP consultancy' },
  { id: 'hardware', title: 'Hardware & IT Security', pillar: 'cyan',
    summary: 'The equipment and protection your systems run on.',
    items: ['Workstations', 'Servers', 'Storage (SAN and NAS)', 'Operating systems', 'IT security auditing', 'Network policies', 'Antivirus and anti-spam supply and implementation'],
    proof: 'Addis Ababa Trade & Industry Bureau: secured network infrastructure for 113 weredas' },
  { id: 'support', title: 'Consultancy & Support', pillar: 'gold',
    summary: 'Planning before the project and care after it.',
    items: ['Infrastructure consultancy', 'System requirement analysis', 'Hardware, software and application consultancy', 'IT security consultancy', 'Project management', 'Annual maintenance contracts'],
    proof: 'Annual maintenance and SLA support for enterprise clients' },
]
export const STEPS = [
  { n: 1, title: 'Consult', text: 'Requirement analysis and planning' },
  { n: 2, title: 'Design', text: 'Network and system design with a bill of quantities' },
  { n: 3, title: 'Install', text: 'Supply, installation and configuration' },
  { n: 4, title: 'Support', text: 'Training, maintenance and SLA support' },
]