import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import langs from "../constants/langs"

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  return (
    <Layout>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Link
            to={node.fields.slug}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div key={node.id}>
              <h3>
                {langs[node.frontmatter.lang] || langs.en}{" "}
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pseudo: String!) {
    allMarkdownRemark(filter: { frontmatter: { pseudo: { eq: $pseudo } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            lang
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
