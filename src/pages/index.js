import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ArticleList } from "../components/articleList"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h2>Last blog posts :</h2>
    <ArticleList articleList={data.allMarkdownRemark.edges} />
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { ne: "doc" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            lang
            tags
            author
            pseudo
            hero {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
