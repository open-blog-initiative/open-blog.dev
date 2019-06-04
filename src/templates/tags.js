import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"

// eslint-disable-next-line react/prop-types
export default ({ data, pageContext }) => {
  return (
    <Layout>
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
