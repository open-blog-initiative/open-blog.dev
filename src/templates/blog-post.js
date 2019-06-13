import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ArticleList } from "../components/articleList"
import AuthorBox from "../components/authorBox"
import { PostSeo } from "../components/postSeo"
import { CommentList } from "../components/commentList"

// eslint-disable-next-line react/prop-types
export default ({
  data: { currentArticle, author, orga, lastArticles, comments },
  pageContext,
}) => {
  return (
    <Layout>
      <PostSeo article={currentArticle} />

      {currentArticle.frontmatter.hero && (
        <picture>
          <source
            srcSet={
              currentArticle.frontmatter.hero.childImageSharp.fluid.srcSetWebp
            }
            sizes="(max-width: 600px) 100vw, 600px"
            type="image/webp"
          />
          <source
            srcSet={
              currentArticle.frontmatter.hero.childImageSharp.fluid.srcSet
            }
            sizes="(max-width: 600px) 100vw, 600px"
            type="image/png"
          />
          <img
            style={{ width: "100vw", maxHeight: "50vh", objectFit: "cover" }}
            src={currentArticle.frontmatter.hero.childImageSharp.fluid.src}
            alt="hero"
          />
        </picture>
      )}
      <div>
        <h1>{currentArticle.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: currentArticle.html }} />
      </div>

      <hr />

      {pageContext.pseudo && (
        <AuthorBox author={pageContext.loadOrga ? orga : author} />
      )}

      {pageContext.showComment && (
        <CommentList
          comments={comments.repository.issue.comments.edges}
          url={comments.repository.issue.url}
        />
      )}

      {!!lastArticles.totalCount && (
        <aside>
          <h3>Other articles from this author:</h3>
          <ArticleList articleList={lastArticles.edges} />
        </aside>
      )}
    </Layout>
  )
}

export const query = graphql`
  query(
    $slug: String!
    $pseudo: String!
    $loadAuthor: Boolean!
    $commentIssueId: Int!
    $showComment: Boolean!
    $loadOrga: Boolean!
    $orga: String!
  ) {
    currentArticle: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lang
        canonical
        author
        description
        date(formatString: "DD MMMM, YYYY")
        tags
        hero {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
            fixed {
              src
            }
          }
        }
      }
      fields {
        slug
      }
      wordCount {
        words
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
      totalCount
    }
    author: github @include(if: $loadAuthor) {
      user(login: $pseudo) {
        name
        login
        url
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
    comments: github @include(if: $showComment) {
      repository(name: "open-blog.dev", owner: "open-blog-initiative") {
        id
        issue(number: $commentIssueId) {
          id
          comments(first: 15) {
            edges {
              node {
                id
                author {
                  avatarUrl
                  login
                  url
                  ... on GitHub_User {
                    id
                    email
                    name
                  }
                }
                bodyHTML
              }
            }
          }
          url
        }
      }
    }
  }
`
