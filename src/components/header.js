import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#3f51b5`,
      marginBottom: `1.45rem`,
    }}
  >
    <nav
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <h2
        style={{
          margin: 0,
        }}
      >
        <Link
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
          to="contributing"
        >
          Contribute
        </Link>
      </h2>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
