import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"
import AuthorBox from "../components/authorBox"

// eslint-disable-next-line react/prop-types
export default ({ data, pageContext }) => {
  return (
    <Layout>
      <AuthorBox author={data.author} />
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
    author: github {
      user(login: $pseudo) {
        name
        login
        url
        bioHTML
        avatarUrl
      }
    }
  }
`
