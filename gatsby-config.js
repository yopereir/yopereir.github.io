require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-emilia-core/gatsby-config.js
    siteTitle: `Yohann Pereira`,
    siteTitleAlt: `Yohann - Portfolio`,
    siteHeadline: `Yohann Pereira`,
    siteUrl: `https://yopereir.github.io`,
    siteDescription: `Portfolio website of Yohann Pereira.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `Yohann Pereira`,
    oneLineDescription: `Lifelong learner`,
    categoriesToShow: [`DevOps`,`Blockchain`, `Data`], // set to ['All'] to show all categories
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-emilia`,
      // See the theme's README for all available options
      options: {
        name: "Yohann Pereira",
        location: "", // leave as empty string to not display location
        socialMedia: [
          {
            title: `LinkedIn`,
            href: `https://www.linkedin.com/in/yohannpereira28/`
          },
          {
            title: `GitHub`,
            href: `https://github.com/yopereir`
          },
        ]
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Yohann Pereira`,
        short_name: `Yohann Pereira`,
        description: `Minimalistic portfolio site with masonry grid, page transitions and big images. Themeable with Theme UI. Includes Light/Dark mode.`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#3182ce`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
