/** Editable About content. Source: SmartLink company profile (Who We Are, Mission, Teams, Why Choose Us, org chart, name-change notice, client letters). */
export const FACTS = [['2008', 'Established'], ['Addis Ababa', 'Head office, Bole'], ['Premier', 'Cisco Partner']]
export const ROLES = [
  { title: 'Project managers', text: 'Leadership and guidance so every project is completed efficiently, with a deep understanding of IT installation, configuration and consultancy.', tags: [], icon: 'M6 3v18M6 4h12l-3 4 3 4H6' },
  { title: 'Network engineers', text: 'Experts in network analysis, design, installation and testing, advising on the best network automation technologies.', tags: ['CCNP', 'CCNA', 'CCDA'], icon: 'M9 5a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 19a3 3 0 1 0 6 0a3 3 0 1 0-6 0M15 19a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 8v4M12 12L6 16M12 12l6 4' },
  { title: 'Web and application engineers', text: 'Technical consultancy and development of web-based applications, analyzed, designed and built around your business needs.', tags: [], icon: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14' },
  { title: 'System engineers', text: 'Experienced in setting up and configuring hardware, operating systems and database software.', tags: ['Oracle', 'MCSE'], icon: 'M4 5h16v5H4zM4 14h16v5H4zM7.5 7.5h.01M7.5 16.5h.01' },
]
export const CERTS = ['CCNP', 'CCIE', 'CCSP', 'CCDA', 'CCVP', 'ITIL', 'MCSE']
export const PURSUING = ['Microsoft', 'Cisco', 'Oracle', 'Huawei']
export const WHY = [
  ['Client-focused approach', 'We help you achieve value from your IT investments so you can focus on your core business.'],
  ['Long-term relationships', 'We build lasting partnerships and provide continuous support and value beyond one-off transactions.'],
  ['Commitment to quality', 'Our business is guided by diligence, sincerity and a relentless pursuit of quality.'],
  ['Flexible and adaptable', 'We apply proven methodologies with flexibility, tailoring our approach to each project.'],
  ['Certified expertise', 'Our team keeps training and certifying to maintain a high level of professional competency.'],
]
export type OrgTone = 'top' | 'staff' | 'tech' | 'net' | 'soft' | 'sec' | 'sales' | 'fin'
export interface OrgNode { name: string; kids?: OrgNode[]; tone: OrgTone }
export const ORG: OrgNode = { name: 'Manager', tone: 'top', kids: [
  { name: 'Secretary', tone: 'staff' }, { name: 'Assistant manager', tone: 'staff' },
  { name: 'Technical manager', tone: 'tech', kids: [
    { name: 'Network and support team', tone: 'net' }, { name: 'Software and website development team', tone: 'soft' }, { name: 'Security and safety team', tone: 'sec' }] },
  { name: 'Sales and marketing', tone: 'sales' }, { name: 'Finance and administration', tone: 'fin' },
] }
export const ORG_LEGEND: [string, string][] = [['#0B1F3A', 'Leadership'], ['#8B5CF6', 'Office support'], ['#0070C0', 'Technical'], ['#DB2777', 'Sales'], ['#CA8A04', 'Finance']]