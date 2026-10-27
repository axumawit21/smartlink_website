/** Decorative HUD: REC dot, brackets, scan line, typed text and corner readouts (all driven by GSAP). */
export default function HudLayer() {
  return (
    <>
      <div id="rec" className="h"><i />REC</div>
      <div id="ring" className="h" />
      <div id="scan" className="h" />
      <div id="brk" className="h"><i /><i /><i /><i /></div>
      <div id="ht" className="h" />
      <div id="hs" className="h" />
      <div id="r1" className="h ro">Est. 2008</div>
      <div id="r2" className="h ro">180+ branches networked</div>
      <div id="r3" className="h ro">Premier Cisco Partner</div>
    </>
  )
}
