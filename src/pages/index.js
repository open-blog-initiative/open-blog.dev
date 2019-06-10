import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ArticleList } from "../components/articleList"
import { Presentation } from "../components/presentation"

const logoAbsoluteUrl = `https://open-blog.dev/icons/icon-384x384.png`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Home"
      description={`Open blog is here for authors that desire the advantages of a publication like Medium or Dev.to
       but without letting your users pay the price. Feel free to submit your blog post to this publication.`}
      image={logoAbsoluteUrl}
    />
    <Presentation />
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
