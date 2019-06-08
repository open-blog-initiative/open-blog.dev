import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"
import { Helmet } from "react-helmet"

// eslint-disable-next-line react/prop-types
export default ({ data, pageContext }) => {
  return (
    <Layout>
      <Helmet title={`${pageContext.tag} | Open Blog`}>
        <meta
          name="description"
          content={`List of blog posts about ${pageContext.tag}.`}
        />
      </Helmet>
      <h1>Articles of category "{pageContext.tag}"</h1>
      <ArticleList articleList={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
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
