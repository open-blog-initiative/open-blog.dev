import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"

// eslint-disable-next-line react/prop-types
export default ({ data, pageContext }) => {
  return (
    <Layout>
      <h1>Articles from "{pageContext.pseudo}"</h1>
      <ArticleList articleList={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export const query = graphql`
  query($pseudo: String!) {
    allMarkdownRemark(filter: { frontmatter: { pseudo: { eq: $pseudo } } }) {
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
