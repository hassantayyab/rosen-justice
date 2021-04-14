require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: "rosen-justice",
    siteUrl: `https://rosen-justice.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-VLD8KR6W6P"
        ],
        pluginConfig: {

          head: true,
        },
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: `${process.env.WP_URL}/graphql`,
        production: {
          allow404Images: true,
        },
      },
    },
    "gatsby-plugin-smoothscroll",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // "gatsby-transformer-sharp",
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "images",
    //     path: "./src/images/",
    //   },
    //   __key: "images",
    // },
  ],
};
