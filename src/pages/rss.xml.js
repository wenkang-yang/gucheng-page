import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

import { SITE } from '~/config'
import { withBasePath } from '~/utils/path'

export async function GET() {
  const writing = await getCollection('writing')

  const filteredWritingItems = writing.filter((item) => !item.data.draft)

  const sortedWritingItems = filteredWritingItems.sort(
    (a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)
  )

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    customData: `
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <title>${SITE.title}</title>
        <url>${SITE.website}/icon-512.png</url>
        <link>${SITE.website}</link>
      </image>`,

    items: sortedWritingItems.map((item) => ({
      title: `${item.data.title}`,
      link: withBasePath(`/writing/${item.id}/`),
      pubDate: item.data.pubDate,
      description: item.data.description,
      author: SITE.author,
    })),

    stylesheet: withBasePath('/rss-styles.xsl'),
  })
}
