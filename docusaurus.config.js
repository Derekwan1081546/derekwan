// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Derekwan's blog",
  tagline: '歡迎來到我的部落格!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://derekwan.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Derekwan1081546', // Usually your GitHub org/user name.
  projectName: 'derekwan', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      announcementBar: {
        id: "support_us",
        content:
          '⭐️ 歡迎來到我的 <a target="_blank" rel="noopener noreferrer" href="https://github.com/Derekwan1081546">Github</a> 參觀哦！ ⭐️',
        backgroundColor: "#68B984",

        textColor: "#091E42",
        isCloseable: false,
      },
      navbar: {
        title: "Derekwan's blog",
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Note',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Derekwan1081546/derekwan',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Note',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Social Media',
            items: [
              {
                label: "Facebook",
                href: "https://www.facebook.com/derek.wan.562",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/yjwan_0810/",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/channel/UCaPj_q7JYYJo_73eu3S6llw",
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Derekwan1081546',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} By Derekwan. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      metadata: [
        {
          googleSiteVerification: 'EvrJeEbVHSjxeiU0znafeC82EObxTXftZeEHfASEFII',
        },
      ],
    }),
};

export default config;
