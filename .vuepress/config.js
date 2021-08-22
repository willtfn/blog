module.exports = {
  title: "willtfn",
  description: "lixiang的博客",
  dest: "dist",
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
          { text: "工具", link: "/categories/工具/" },
          { text: "浏览器", link: "/categories/浏览器/" },
          { text: "计算机网络", link: "/categories/计算机网络/" },
        ],
      },
      {
        text: "标签",
        link: "/tag/",
        icon: "reco-tag",
      },
      // {
      //   text: "归档",
      //   link: "/timeline/",
      //   icon: "reco-date",
      // },
      {
        text: "GitHub",
        link: "https://github.com/willtfn/blog",
        icon: "reco-github",
      },
    ],
    sidebar: {
      "/blogs/git/": [{ title: "Git", children: ["base", "api"] }],
      "/blogs/javascript/": [
        {
          title: "JavaScript",
          children: ["data-type", "const", "map-set", "heap-stack"],
        },
      ],
      "/blogs/npm/": [{ title: "NPM", children: ["api", "dev"] }],
      "/blogs/tools/": [{ title: "工具", children: ["links", "lerna"] }],
      "/blogs/browser/": [
        { title: "浏览器", children: ["base", "cache", "garbage-collection"] },
      ],
      "/blogs/network/": [{ title: "计算机网络", children: ["base"] }],
    },
    // blogConfig: {
    //   tag: {
    //     location: 3,
    //     text: "标签",
    //     icon: "reco-sticky",
    //   },
    // },

    plugins: [
      ["@vuepress/medium-zoom"], // 图片预览
      ["vuepress-plugin-code-copy", true],
    ],
    subSidebar: "auto",
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
      md.use(require("markdown-it-sup")).use(require("markdown-it-sub"));
    },
  },
};
