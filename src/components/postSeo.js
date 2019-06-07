import React from "react"
import Helmet from "react-helmet"

export const PostSeo = ({ article }) => (
  <Helmet
    htmlAttributes={{
      lang: article.frontmatter.lang || "en",
    }}
    title={article.frontmatter.title}
    meta={[
      {
        name: `description`,
        content: article.frontmatter.description,
      },
      {
        property: `og:title`,
        content: article.frontmatter.title,
      },
      {
        property: `og:description`,
        content: article.frontmatter.description,
      },
      {
        property: `og:type`,
        content: `website`,
      },
      {
        name: `twitter:card`,
        content: `summary`,
      },
      {
        name: `twitter:creator`,
        content: article.frontmatter.author,
      },
      {
        name: `twitter:title`,
        content: article.frontmatter.title,
      },
      {
        name: `twitter:description`,
        content: article.frontmatter.description,
      },
      {
        property: `og:image`,
        content:
          article.frontmatter.hero &&
          article.frontmatter.hero.childImageSharp.fixed.src,
      },
      {
        property: `og:url`,
        content:
          article.frontmatter.hero &&
          article.frontmatter.hero.childImageSharp.fixed.src,
      },
    ]}
  />
)
