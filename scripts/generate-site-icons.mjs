import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import sharp from 'sharp'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, '..')
const publicDirectory = resolve(projectRoot, 'public')
const source = await readFile(resolve(publicDirectory, 'favicon.svg'))

async function createPng(filename, size) {
  const output = await sharp(source)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()

  await writeFile(resolve(publicDirectory, filename), output)
  return output
}

function createIco(png) {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header.writeUInt8(32, 6)
  header.writeUInt8(32, 7)
  header.writeUInt8(0, 8)
  header.writeUInt8(0, 9)
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(png.length, 14)
  header.writeUInt32LE(header.length, 18)
  return Buffer.concat([header, png])
}

const faviconPng = await createPng('favicon-32.png', 32)
await Promise.all([
  createPng('apple-touch-icon.png', 180),
  createPng('icon-192.png', 192),
  createPng('icon-512.png', 512),
  createPng('icon-mask.png', 512),
  writeFile(resolve(publicDirectory, 'favicon.ico'), createIco(faviconPng)),
])

console.log('Generated site icons from public/favicon.svg')
