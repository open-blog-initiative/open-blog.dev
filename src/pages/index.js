import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import langs from "../constants/langs"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Link
        to={node.fields.slug}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div key={node.id}>
          <h3>
            {langs[node.frontmatter.lang] || langs.en} {node.frontmatter.title}{" "}
            <span>— {node.frontmatter.date}</span>
          </h3>
          <span>
            {node.frontmatter.tags.map((tag, index) => (
              <Link
                to={`tags/${tag}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  margin: "0 0.2rem",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "8px",
                  backgroundColor: "lightgrey",
                }}
              >
                {tag}
              </Link>
            ))}
            &nbsp;by{" "}
            <Link to={node.frontmatter.pseudo}>{node.frontmatter.author}</Link>
          </span>
          <p>{node.excerpt}</p>
        </div>
      </Link>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { ne: "doc" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            lang
            tags
            author
            pseudo
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
