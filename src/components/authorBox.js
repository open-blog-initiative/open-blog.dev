import React from "react"

import "./authorBox.css"

export default ({ author }) => (
  <section className="author">
    <img
      src={author.user.avatarUrl}
      alt={author.user.name}
      className="author__profile"
    />
    <div className="author__description">
      <h3 className="author__name">
        {author.user.name}
        <a href={author.user.url}>(@{author.user.login})</a>
      </h3>
      <div
        className="author__bio"
        dangerouslySetInnerHTML={{ __html: author.user.bioHTML }}
      />
    </div>
  </section>
)
