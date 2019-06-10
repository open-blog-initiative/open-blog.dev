import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"
import AuthorBox from "../components/authorBox"
import { Helmet } from "react-helmet"

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  return (
    <Layout>
      <Helmet
        title={`${data.author.user.name} (${
          data.author.user.login
        }) | Open Blog`}
      >
        <meta name="description" content={data.author.user.bio} />
        <meta name="og:description" content={data.author.user.bio} />
        <meta property="og:image" content={data.author.user.avatarUrl} />
        <meta name="twitter:image" content={data.author.user.avatarUrl} />
        <meta name="twitter:card" content="summary" />
      </Helmet>
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
    author: github {
      user(login: $pseudo) {
        name
        login
        url
        bio
        bioHTML
        avatarUrl
      }
    }
  }
`
