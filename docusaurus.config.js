module.exports = {
  title: 'ProgIvt',
  tagline: 'Основы программирования ИВТ ИМИ',
  url: 'https://progivt.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/progivt.png',
  organizationName: 'progivt', // Usually your GitHub org/user name.
  projectName: 'progivt.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'ProgIvt',
      logo: {
        alt: 'My Site Logo',
        src: 'img/progivt.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Лабы',
          position: 'left',
        },
        {
          to: 'blog', 
          label: 'Блог', 
          position: 'left'},
        {
          href: 'https://github.com/progivt/progivt.github.io',
          label: 'Этот сайт@GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Ссылки',
          items: [
            {
              label: 'Learn.Javascript.Ru',
              href: 'https://learn.javascript.ru/',
            },
            {
              label: 'JavaScript: основы и функции, МФТИ@Coursera',
              href: 'https://www.coursera.org/learn/javascript-osnovy-i-funktsii',
            },
          ],
        },
        {
          title: 'Ещё',
          items: [
            {
              label: 'Гарвардский курс CS50 по-русски',
              href: 'https://www.youtube.com/playlist?list=PLawfWYMUziZqyUL5QDLVbe3j5BKWj42E5',
            },
            {
              label: 'Справка по JS@MDN',
              href: 'https://developer.mozilla.org/ru/docs/Web/JavaScript',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} А. Павлов и соавторы. Работает на Docusaurus <img class="hitcount" src="https://hitcounter.pythonanywhere.com/count/tag.svg" alt="Hits">`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/progivt/progivt.github.io/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/progivt/progivt.github.io/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
