export default {
  mounted() {
    const { canonicalUrl } = this.$page.frontmatter;
    const linkTag = document.createElement("link");
    linkTag.setAttribute("rel", "canonical");
    linkTag.setAttribute("href", canonicalUrl);
    document.head.appendChild(linkTag);
  }
};
