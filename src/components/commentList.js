import React from "react"
import { CommentItem } from "./commentItem"

import "./commentList.css"

export const CommentList = ({ comments = [], url }) => (
  <section className="comment-list">
    <h3>Comments :</h3>
    {comments.length > 0 && (
      <ul style={{ margin: 0, listStyle: "none" }}>
        {comments.map(({ node }) => (
          <li>
            <CommentItem key={node.id} comment={node} />
          </li>
        ))}
      </ul>
    )}
    <a className="comment-list__action" href={url}>
      Add your comment
    </a>
  </section>
)
