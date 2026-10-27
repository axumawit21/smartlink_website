/** SVG wireframe seen "through the lens". Paths use pathLength=1 so stroke-dashoffset 1->0 draws them. */
const NODES = [
  { x: 325, y: 170, tx: 337, ty: 160, label: 'CCTV' },
  { x: 475, y: 250, tx: 487, ty: 240, label: 'ACCESS CONTROL' },
  { x: 290, y: 330, tx: 140, ty: 320, label: 'FIRE & SAFETY' },
  { x: 520, y: 390, tx: 532, ty: 380, label: 'NETWORK & DATA CENTER' },
]
export default function WireframeBuilding() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <g id="pan">
        <path className="w" pathLength={1} d="M250 420V140L400 100L550 140V420Z" />
        <path className="w" pathLength={1} d="M200 420H600" />
        <path className="w" pathLength={1} d="M250 200H550M250 280H550M250 360H550" />
        <path className="w" pathLength={1} d="M325 140V420M400 100V420M475 140V420" />
        {NODES.map(n => (
          <g className="nd" key={n.label}><circle cx={n.x} cy={n.y} r="5" /><text x={n.tx} y={n.ty}>{n.label}</text></g>
        ))}
      </g>
    </svg>
  )
}
