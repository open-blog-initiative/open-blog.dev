/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              pseudo
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
          pseudo: node.frontmatter.pseudo || "",
          loadAuthor: !!node.frontmatter.pseudo,
        },
      })

      createPage({
        path: `${node.fields.slug}amp`,
        component: path.resolve("./src/templates/blog-post.amp.js"),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })

  graphql(`
    {
      allMarkdownRemark {
        distinct(field: frontmatter___pseudo)
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.distinct.forEach(pseudo => {
      createPage({
        path: pseudo,
        component: path.resolve(`./src/templates/author.js`),
        context: {
          pseudo,
        },
      })
    })
  })

  return graphql(`
    {
      allMarkdownRemark {
        distinct(field: frontmatter___tags)
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.distinct.forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: path.resolve(`./src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}
