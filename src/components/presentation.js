import React from "react"

import "./presentation.css"

export const Presentation = () => (
  <section className="presentation">
    <img src="/icons/icon-384x384.png" alt="logo" />
    <h1>What is Open Blog ?</h1>
    <p>
      Open blog is here for <b>authors</b> that desire the advantages of a
      publication like <i>Medium</i> or <i>Dev.to</i> but without letting your
      users pay the price. Feel free to <b>submit</b> your blog post to this
      publication.
    </p>

    <p>
      Authors could also keep their rights on their articles by publishing it on
      their own blog. Open Blog is a <b>publication</b> to help people finding
      great articles to read.
    </p>

    <h2>Available features :</h2>

    <ul>
      <li>
        Post <em>tags</em> to groups articles
      </li>
      <li>
        <em>Author page</em>, to let discover author other articles
      </li>
      <li>
        Comments based on <em>Github Issue</em>
      </li>
    </ul>
  </section>
)
