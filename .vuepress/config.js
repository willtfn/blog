module.exports = {
  title: "willtfn",
  description: "lixiang的博客",
  dest: "dist",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
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
        "data-type",
        "const",
        "map-set",
        {
          title: "JavaScript运行原理",
          children: ["V8", "ast", "heap-stack", "execution-context"],
        },
      ],
      "/blogs/npm/": [{ title: "NPM", children: ["dev"] }],
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
    record: "粤ICP备2021117388号",
    recordLink: "http://beian.miit.gov.cn/",
    startYear: "2020",
  },
  plugins: {
    "@vuepress/medium-zoom": {
      selector: ".theme-reco-content:not(a) img",
    },
    "vuepress-plugin-nuggets-style-copy": {
      copyText: "复制代码",
      tip: {
        content: "复制成功!",
      },
    },
  },
  markdown: {
    lineNumbers: false,
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-sup")).use(require("markdown-it-sub"));
    },
  },
};
