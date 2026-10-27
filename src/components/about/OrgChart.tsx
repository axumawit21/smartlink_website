import { ORG, ORG_LEGEND, type OrgNode } from '../../config/about'
const Node = ({ n }: { n: OrgNode }) => (
  <li>
    <span className={`org-node t-${n.tone}`}>{n.name}</span>
    {n.kids && <ul>{n.kids.map(k => <Node key={k.name} n={k} />)}</ul>}
  </li>
)
/** Company structure from the profile, on a white panel with one color per branch. Tree on desktop, outline on mobile. */
export default function OrgChart() {
  return (
    <div className="mt-16" data-gaze>
      <h3 className="bp-label">FIG. 02 · HOW WE ARE ORGANIZED</h3>
      <div className="org-panel rv mt-6 rounded-[24px] p-6 md:p-10">
        <div className="tree mx-auto" role="img" aria-label="Organization chart: the Manager oversees the Secretary, Assistant manager, Technical manager, Sales and marketing, and Finance and administration. The Technical manager leads the Network and support team, the Software and website development team, and the Security and safety team."><ul><Node n={ORG} /></ul></div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-[#E2E8F0] pt-5 text-xs text-[#475569]" aria-hidden="true">
          {ORG_LEGEND.map(([c, l]) => <li key={l} className="flex items-center gap-2"><span className="h-3 w-3 rounded-[4px]" style={{ background: c }} />{l}</li>)}
        </ul>
      </div>
    </div>
  )
}