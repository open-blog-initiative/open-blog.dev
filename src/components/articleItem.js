import { Link } from "gatsby"
import React from "react"
import langs from "../constants/langs"

import "./articleItem.css"

const ArticleItem = ({ node }) => (
  <Link
    to={node.fields.slug}
    style={{ textDecoration: "none", color: "black" }}
  >
    <div key={node.id}>
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
        <Link to={node.frontmatter.pseudo}>{node.frontmatter.author}</Link>
      </span>
      <p>{node.excerpt}</p>
    </div>
  </Link>
)

export default ArticleItem
