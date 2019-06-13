import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"
import AuthorBox from "../components/authorBox"
import { Helmet } from "react-helmet"

// eslint-disable-next-line react/prop-types
export default ({
  data: { allMarkdownRemark, author, orga },
  pageContext: { loadOrga },
}) => {
  const user = loadOrga ? orga : author
  const title = `${user.user.name} (${user.user.login}) | Open Blog`
  const description = user.user.bio
  return (
    <Layout>
      <Helmet title={title}>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content={user.user.avatarUrl} />
        <meta name="twitter:image" content={user.user.avatarUrl} />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <AuthorBox author={user} />
      <ArticleList articleList={allMarkdownRemark.edges} />
    </Layout>
  )
}

export const query = graphql`
  query($pseudo: String!, $loadOrga: Boolean!, $orga: String!) {
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
    author: github @skip(if: $loadOrga) {
      user(login: $pseudo) {
        name
        login
        url
        bio
        bioHTML
        avatarUrl
      }
    }
    orga: github @include(if: $loadOrga) {
      user: repositoryOwner(login: $orga) {
        ... on GitHub_Organization {
          id
          description
          name
          url
          avatarUrl
          login
        }
      }
    }
  }
`
