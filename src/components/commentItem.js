import React from "react"

import "./commentItem.css"

export const CommentItem = ({ comment = {} }) => (
  <article className="comment-item">
    <img
      src={comment.author.avatarUrl}
      alt={comment.author.name}
      className="comment-item__profile"
    />
    <div className="comment-item__description">
      <div
        className="comment-item__content"
        dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
      />
      <h3 className="comment-item__name">
        - {comment.author.name}
        <a href={comment.author.url}>(@{comment.author.login})</a>
      </h3>
    </div>
  </article>
)
