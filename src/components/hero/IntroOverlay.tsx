import HudLayer from './HudLayer'
import WireframeBuilding from './WireframeBuilding'
/** Full-hero layer: blueprint grid, "inside the camera" view (clip-path iris) and HUD. After the intro it stays as a faint background. */
export default function IntroOverlay() {
  return (
    <div id="intro" aria-hidden="true">
      <div className="grid-bg" />
      <div id="inside"><WireframeBuilding /></div>
      <HudLayer />
    </div>
  )
}
