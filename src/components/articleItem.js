import { Link } from "gatsby"
import React from "react"
import langs from "../constants/langs"

import "./articleItem.css"

const ArticleItem = ({ node }) => (
  <Link
    to={node.fields.slug}
    style={{ textDecoration: "none", color: "black" }}
  >
    <article className="article-item">
      <header>
        <h3
          className="article-item__title"
          style={{
            margin: "0.5rem 0",
          }}
        >
          {langs[node.frontmatter.lang] || langs.en} {node.frontmatter.title}
        </h3>
        <span>
          {node.frontmatter.tags.map((tag, index) => (
            <Link
              to={`tags/${tag}`}
              style={{
                margin: "0 0.2rem",
                textDecoration: "none",
                color: "#3f51b5",
              }}
            >
              #{tag}
            </Link>
          ))}
          &nbsp;by{" "}
          <Link to={`authors/${node.frontmatter.pseudo}`}>
            {node.frontmatter.author}
          </Link>
        </span>
        <p>{node.excerpt}</p>
      </header>
      {node.frontmatter.hero && (
        <picture>
          <source
            srcSet={node.frontmatter.hero.childImageSharp.fluid.srcSetWebp}
            sizes="30vw"
            type="image/webp"
          />
          <source
            srcSet={node.frontmatter.hero.childImageSharp.fluid.srcSet}
            sizes="30vw"
            type="image/png"
          />
          <img
            className="article-item__picture"
            src={node.frontmatter.hero.childImageSharp.fluid.src}
            alt="hero"
          />
        </picture>
      )}
    </article>
  </Link>
)

export default ArticleItem
