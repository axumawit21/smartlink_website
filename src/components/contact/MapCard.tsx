import { SITE } from '../../config/site'
/** Live Google map centred on the SmartLink office (Blen Building, Bole). Loads only when scrolled near. */
export default function MapCard() {
  return (
    <div className="map relative overflow-hidden rounded-[20px] border border-white/15" data-gaze>
      <iframe title="SmartLink office location on Google Maps" src={`https://www.google.com/maps?q=${SITE.mapLat},${SITE.mapLng}&z=17&output=embed`}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="block h-[260px] w-full border-0 sm:h-[320px]" />
      <div className="flex flex-col gap-3 bg-[#0D1B33] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/75">{SITE.building} · {SITE.landmark}</p>
        <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-[#FB923C] hover:underline">Open in Google Maps ↗</a>
      </div>
    </div>
  )
}