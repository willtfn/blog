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
  },
};
