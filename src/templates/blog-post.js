import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  const post = data.markdownRemark
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
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lang
        canonical
      }
    }
  }
`
