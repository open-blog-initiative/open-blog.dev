import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  const post = data.currentArticle
  const canonical = post.frontmatter.canonical
  return (
    <Layout>
      <Helmet
        htmlAttributes={{
          lang: post.frontmatter.lang || "en",
        }}
      >
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <hr />

      <img src={data.author.user.avatarUrl} alt={data.author.user.name} />

      {data.lastArticles.totalCount && (
        <aside>
          <h2>Other articles from this author</h2>
          <ArticleList articleList={data.lastArticles.edges} />
        </aside>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $pseudo: String!, $loadAuthor: Boolean!) {
    currentArticle: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lang
        canonical
      }
    }
    lastArticles: allMarkdownRemark(
      filter: { frontmatter: { pseudo: { eq: $pseudo } } }
      limit: 5
    ) {
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
      totalCount
    }
    author: github @include(if: $loadAuthor) {
      user(login: $pseudo) {
        id
        name
        location
        url
        company
        bioHTML
        avatarUrl
      }
    }
  }
`
