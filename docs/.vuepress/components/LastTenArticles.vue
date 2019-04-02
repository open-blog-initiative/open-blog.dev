<template>
  <section>
    <ArticleCard v-for="article in lastTenArticles" :article="article" />
  </section>
</template>

<script>
const metaPredicat = name => meta => meta.name === name;
const sortPageByLastUpdateDate = (article1, article2) =>
  article1.lastUpdated.getTime() > article2.lastUpdated.getTime();
const getLocalFromRelativeUrl = relativeUrl => relativeUrl.split("/")[1];
const findBaseUrlInLocales = (lang, locales) =>
  Object.keys(locales).find(key => locales[key].lang === lang);
const filterByLocale = (lang, locales) => article =>
  article.url.match(new RegExp(`^${findBaseUrlInLocales(lang, locales)}`));

class Article {
  constructor(page) {
    console.log(page);
    this.title = page.title;
    this.locale = getLocalFromRelativeUrl(page.path);
    this.url = page.path;
    this.lastUpdated = new Date(page.lastUpdated);
    const meta = page.frontmatter.meta;
    if (meta) this.image = meta.find(metaPredicat("og-image")).content;
    this.author = {
      name: page.frontmatter.author,
      image: page.frontmatter.profile_picture
    };
  }
}

export default {
  name: "LastTenArticles",
  props: ["locale"],
  computed: {
    lastTenArticles() {
      return this.$site.pages
        .map(page => new Article(page))
        .filter(filterByLocale(this.locale, this.$site.locales))
        .sort(sortPageByLastUpdateDate)
        .slice(0, 10);
    }
  }
};
</script>

<style scoped></style>
