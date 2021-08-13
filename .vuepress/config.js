module.exports = {
  title: "willtfn",
  description: "lixiang的博客",
  dest: "dist",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时光轴",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "GitHub",
        link: "https://github.com/willtfn/blog",
        icon: "reco-github",
      },
    ],
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    subSidebar: "auto",
    sidebar: {
      "/blogs/browser/": ["", "cache"],
      "/blogs/git/": ["", "base", "api"],
      "/blogs/javascript/": ["", "data-type", "const", "map-set"],
      "/blogs/npm/": ["", "api", "dev"],
    },
    type: "blog",
    friendLink: [
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "lixiang",
    authorAvatar: "/avatar.jpg",
    record: "xxxx",
    startYear: "2019",
  },
  markdown: {
    lineNumbers: true,
  },
};
