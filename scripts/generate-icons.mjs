import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const baseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="felt" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#2d6a4f" />
      <stop offset="60%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#0f3d2e" />
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#felt)" />
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#d4af37" stroke-width="2.5" />
  <path
    fill="#f4e3a6"
    d="M32 12c-7 8-15 13-15 21a9 9 0 0 0 14 7.5c-.6 4-1.8 7-4 9.5h14c-2.2-2.5-3.4-5.5-4-9.5a9 9 0 0 0 14-7.5c0-8-8-13-15-21z"
  />
</svg>
`

// Maskable: full-bleed solid background, no corner rounding, spade kept inside the
// ~80% safe-zone circle so OS masks (circle/squircle/etc.) never clip the artwork.
const maskableIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="felt" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#2d6a4f" />
      <stop offset="60%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#0f3d2e" />
    </radialGradient>
  </defs>
  <rect width="64" height="64" fill="url(#felt)" />
  <path
    fill="#f4e3a6"
    transform="translate(32 32) scale(0.62) translate(-32 -32)"
    d="M32 12c-7 8-15 13-15 21a9 9 0 0 0 14 7.5c-.6 4-1.8 7-4 9.5h14c-2.2-2.5-3.4-5.5-4-9.5a9 9 0 0 0 14-7.5c0-8-8-13-15-21z"
  />
</svg>
`

const jobs = [
  { svg: baseIcon, size: 192, file: 'icon-192.png' },
  { svg: baseIcon, size: 512, file: 'icon-512.png' },
  { svg: maskableIcon, size: 512, file: 'icon-512-maskable.png' },
  { svg: baseIcon, size: 180, file: 'apple-touch-icon.png' },
]

for (const job of jobs) {
  await sharp(Buffer.from(job.svg))
    .resize(job.size, job.size)
    .png()
    .toFile(path.join(outDir, job.file))
  console.log(`wrote ${job.file}`)
}
