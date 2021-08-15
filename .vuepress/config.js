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
        text: "分类",
        link: "/categories/",
        icon: "reco-category",
        items: [
          { text: "Git", link: "/categories/Git/" },
          { text: "JavaScript", link: "/categories/JavaScript/" },
          { text: "Linux", link: "/categories/Linux/" },
          { text: "NPM", link: "/categories/NPM/" },
          { text: "Tools", link: "/categories/Tools/" },
          { text: "浏览器", link: "/categories/浏览器/" },
          { text: "计算机网络", link: "/categories/计算机网络/" },
        ],
      },
      {
        text: "标签",
        link: "/tag/",
        icon: "reco-tag",
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
    // blogConfig: {
    //   tag: {
    //     location: 3,
    //     text: "标签",
    //     icon: "reco-sticky",
    //   },
    // },
    subSidebar: "auto",
    sidebar: {
      "/blogs/browser/": [{ title: "浏览器", children: ["cache"] }],
      "/blogs/git/": [{ title: "Git", children: ["base", "api"] }],
      "/blogs/javascript/": [
        { title: "JavaScript", children: ["data-type", "const", "map-set"] },
      ],
      "/blogs/network/": [{ title: "计算机网络", children: ["base"] }],
      "/blogs/npm/": [{ title: "NPM", children: ["api", "dev"] }],
      "/blogs/tools/": [{ title: "工具", children: ["lerna"] }],
    },
    type: "blog",
    // friendLink: [
    //   {
    //     title: "willtfn@163.com",
    //     email: "willtfn@163.com",
    //     logo: "reco-mail",
    //   },
    // ],
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
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-sup"));
    },
  },
};
