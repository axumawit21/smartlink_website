/** Tokens mirror the CSS variables so lower sections can be themed later. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { colors: { navy: { 950: '#050B16', 900: '#0B1F3A' }, brand: '#0070C0', cyan: '#22D3EE', muted: '#8FA3BF' },
    fontFamily: { head: ['"Space Grotesk"','system-ui','sans-serif'], mono: ['"JetBrains Mono"','ui-monospace','monospace'] } } },
  plugins: []
}
