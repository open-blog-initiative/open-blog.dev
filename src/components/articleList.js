import React from "react"
import ArticleItem from "./articleItem"

export const ArticleList = ({ articleList }) => (
  <nav>
    <ul style={{ margin: 0, listStyle: "none" }}>
      {articleList.map(({ node }) => (
        <li>
          <ArticleItem node={node} />
        </li>
      ))}
    </ul>
  </nav>
)
