require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Open Blog`,
    description: `Share blog posts on an free open platform.`,
    author: `@Slashgear_`,
    siteUrl: `https://open-blog.dev`,
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        // Url to query from
        url: "https://api.github.com/graphql",
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/blog/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Open Blog: Web free publication`,
        short_name: `Open Blog`,
        start_url: `/`,
        background_color: `#3f51b5`,
        theme_color: `#3f51b5`,
        display: `minimal-ui`,
        icon: "./blog/images/logo.svg",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/blog/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              withWebp: true,
            },
          },
          "gatsby-remark-prismjs",
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: edge.node.frontmatter.hero
                    ? {
                        url:
                          site.siteMetadata.siteUrl +
                          edge.node.frontmatter.hero.childImageSharp.fluid.src,
                        size: edge.node.frontmatter.hero.size,
                      }
                    : null,
                  categories: edge.node.frontmatter.tags,
                  author: edge.node.frontmatter.author,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { type: { ne: "doc" } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        date
                        tags
                        author
                         hero {
                        childImageSharp {
                          fluid(maxWidth: 200) {
                            src
                          }
                        }
                        size
                      }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Open blog",
            match: "^/posts/",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-html2amp",
      options: {
        files: ["posts/**/index.html"],
        publicPath: "public",
        dist: "public/amp",
      },
    },
  ],
}
