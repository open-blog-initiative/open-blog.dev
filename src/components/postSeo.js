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
          content: `summary_large_image`,
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
      link={[
        {
          rel: "canonical",
          href: article.frontmatter.canonical
            ? article.frontmatter.canonical
            : `http://open-blog.dev/${article.fields.slug}`,
        },
        {
          rel: "amphtml",
          href: `http://open-blog.dev/amp${article.fields.slug}`,
        },
      ]}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `http://open-blog.dev/${article.fields.slug}`,
          },
          headline: article.frontmatter.title,
          image:
            article.frontmatter.hero &&
            site.siteMetadata.siteUrl +
              article.frontmatter.hero.childImageSharp.fixed.src,
          author: article.frontmatter.author,
          keywords:
            article.frontmatter.tags && article.frontmatter.tags.join(", "),
          publisher: {
            "@type": "Organization",
            name: "Open Blog",
            logo: {
              "@type": "ImageObject",
              url: "https://open-blog.dev/icons/icon-144x144.png",
            },
          },
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
