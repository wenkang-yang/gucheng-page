import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://gucheng.ink/',
  base: '/',
  title: '孤城',
  description:
    '你好，我是孤城，目前就读于北京大学，是一个热爱技术，对电子信息工程，计算机科学与技术，人工智能与嵌入式系统等领域感兴趣的开发者，并在这里记录项目实践，学习笔记与技术思考。',
  author: '孤城',
  lang: 'zh-CN',
  ogLocale: 'zh_CN',
  imageDomains: [],
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/projects',
      title: 'Projects',
      displayMode: 'alwaysText',
      text: 'Projects',
    },
    {
      path: '/writing',
      title: 'Writing',
      displayMode: 'alwaysText',
      text: 'Writing',
    },
    {
      path: '/notes',
      title: 'Notes',
      displayMode: 'alwaysText',
      text: 'Notes',
    },
    {
      path: '/photos',
      title: 'Photos',
      displayMode: 'iconToTextOnMobile',
      text: 'Photos',
      icon: 'i-ri-camera-ai-line',
    },
  ],
  socialLinks: [
    {
      link: 'https://github.com/wenkang-yang',
      title: '孤城 on GitHub',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'hr',
      'socialLinks',
      'hr',
      'searchButton',
      'themeButton',
      'rssLink',
    ],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: false,
  postView: {
    postMetaStyle: 'minimal',
    useCoverAltAsCaption: true,
  },
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  githubView: {
    monorepos: [],
    mainLogoOverrides: [],
    subLogoMatches: [],
  },
  externalLink: {
    newTab: false,
    cursorType: '',
    showNewTabIcon: false,
  },
}

/**
 * Globally controls whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
 */
export const FEATURES: Features = {
  slideEnterAnim: [true, { enterStep: 80 }],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
      collections: [
        { collection: 'writing', pathnamePrefix: '/writing' },
        { collection: 'notes', pathnamePrefix: '/notes' },
      ],
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'right',
      displayMode: 'content',
    },
  ],
  share: false,
  giscus: false,
  search: [
    true,
    {
      includes: ['writing', 'notes'],
      filter: true,
      navHighlight: true,
      batchLoadSize: [true, 5],
      maxItemsPerPage: [true, 3],
    },
  ],
  tag: [
    true,
    {
      displayPosition: 'right',
      displayMode: 'content',
      filterMode: 'AND',
    },
  ],
}
