import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { PostSeo } from "../components/postSeo"

// eslint-disable-next-line react/prop-types
export default ({ data: { currentArticle } }) => {
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
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    currentArticle: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lang
        canonical
        description
        hero {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
            fixed {
              src
            }
          }
        }
      }
    }
  }
`
