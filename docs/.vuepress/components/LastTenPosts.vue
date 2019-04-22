<template>
  <section class="card-container">
    <PostCard v-for="post in lastTenPosts" :post="post" />
  </section>
</template>

<script>
const sortPageByLastUpdateDate = (post1, post2) =>
  post1.lastUpdated.getTime() > post2.lastUpdated.getTime();

const metaPredicat = name => meta => meta.name === name;
const findInMeta = (meta, name) => meta.find(metaPredicat(name)).content;

const isPost = page => page.frontmatter.type === "post";
const filterByLang = lang => page => page.lang === lang;

const mapToPost = page => ({
  title: page.title,
  url: page.path,
  lastUpdated: new Date(page.lastUpdated),
  image: findInMeta(page.frontmatter.meta, "og-image"),
  author: {
    name: page.frontmatter.author,
    image: page.frontmatter.profile_picture
  }
});

export default {
  name: "LastTenPosts",
  computed: {
    lastTenPosts() {
      return this.$site.pages
        .filter(isPost)
        .filter(filterByLang(this.$page.lang))
        .map(mapToPost)
        .sort(sortPageByLastUpdateDate)
        .slice(0, 10);
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
