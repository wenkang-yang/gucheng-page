import { readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

import { experimental_getFontFileURL, fontData } from 'astro:assets'
import { decode } from 'html-entities'
import satori from 'satori'
import sharp from 'sharp'

import { ogImageMarkup } from '~/utils/og-image/template/markup'

import type { html } from 'satori-html'
import type { BgType } from '~/types'

const fontDataCache = new Map<string, Promise<ArrayBuffer | undefined>>()

/**
 * Recursively unescapes HTML entities in a given virtual DOM node's children.
 *
 * Fix accidental HTML entity escaping in 'satori-html'.
 * @see https://github.com/natemoo-re/satori-html/issues/20#issuecomment-1999332693
 */
function unescapeHTML(node: ReturnType<typeof html>) {
  const children = node?.props?.children
  if (!children) {
    return
  } else if (Array.isArray(children)) {
    for (const n of children) {
      unescapeHTML(n)
    }
  } else if (typeof children === 'object') {
    unescapeHTML(children)
  } else if (typeof children === 'string') {
    node.props.children = decode(children)
  }
}

/**
 * Resolves the URL of the Satori-compatible WOFF font file for `--font-og-sans` style.
 */
function resolveSatoriFontUrl(requestUrl: URL) {
  const font = fontData['--font-og-sans']?.find(
    (item) => item.style === 'normal'
  )
  const source = font?.src.find((item) => item.format === 'woff')
  if (!source)
    throw new Error(
      "Unable to find a Satori-compatible WOFF source for '--font-og-sans'."
    )

  const fontUrl = new URL(experimental_getFontFileURL(source.url, requestUrl))

  // On Windows, Node may resolve localhost to ::1 while Astro's temporary
  // build server is listening on IPv4 only.
  if (['localhost', '[::]', '::', '0.0.0.0'].includes(fontUrl.hostname))
    fontUrl.hostname = '127.0.0.1'

  return fontUrl.href
}

/**
 * Caches and retrieves the Satori font data for the given request URL.
 */
async function getSatoriFontData(requestUrl: URL) {
  const fontUrl = resolveSatoriFontUrl(requestUrl)
  let fontDataPromise = fontDataCache.get(fontUrl)

  if (!fontDataPromise) {
    fontDataPromise = (async () => {
      try {
        const localFontPath = join(
          process.cwd(),
          'node_modules',
          '.astro',
          'fonts',
          basename(new URL(fontUrl).pathname)
        )
        const data = await readFile(localFontPath)
        return data.buffer.slice(
          data.byteOffset,
          data.byteOffset + data.byteLength
        ) as ArrayBuffer
      } catch {
        const response = await fetch(fontUrl)
        if (!response.ok) throw new Error('Failed to fetch OG font file')
        return response.arrayBuffer()
      }
    })()
    fontDataCache.set(fontUrl, fontDataPromise)
  }

  return fontDataPromise
}

/**
 * Generates an Open Graph image as a PNG buffer.
 * @see https://docs.astro.build/en/guides/fonts/#accessing-font-data-programmatically
 */
export async function generateOgImageBuffer(
  authorOrBrand: string,
  title: string,
  bgType: BgType,
  requestUrl: URL
) {
  const node = ogImageMarkup(authorOrBrand, title, bgType)
  unescapeHTML(node)

  const satoriFontData = await getSatoriFontData(requestUrl)
  if (!satoriFontData) throw new Error('Failed to fetch OG font file')

  const svg = await satori(node, {
    // debug: true,
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        weight: 400,
        style: 'normal',
        data: satoriFontData,
      },
    ],
  })

  return await sharp(Buffer.from(svg))
    .png({
      compressionLevel: 9,
      quality: 100,
    })
    .toBuffer()
}
