import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export const PostSeo = ({ article }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{
        lang: article.frontmatter.lang || "en",
      }}
      title={`${article.frontmatter.title} |  Open blog`}
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
            site.siteMetadata.siteUrl +
              article.frontmatter.hero.childImageSharp.fixed.src,
        },
      ]}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.frontmatter.title,
          image:
            article.frontmatter.hero &&
            site.siteMetadata.siteUrl +
              article.frontmatter.hero.childImageSharp.fixed.src,
          author: article.frontmatter.author,
          keywords:
            article.frontmatter.tags && article.frontmatter.tags.join(", "),
          publisher: "Open Blog",
          url:
            article.frontmatter.pseudo &&
            `http://open-blog.dev/${article.frontmatter.pseudo}/${
              article.fields.slug
            }`,
          wordcount: article.wordCount.word,
          datePublished: article.frontmatter.date,
          dateCreated: article.frontmatter.date,
          dateModified: article.frontmatter.date,
          description: article.frontmatter.description,
        })}
      </script>
    </Helmet>
  )
}
