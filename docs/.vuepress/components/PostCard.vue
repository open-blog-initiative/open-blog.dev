<template>
  <a class="card" :href="post.url">
    <img :src="post.image" class="card-image" :alt="post.title" />
    <div class="card-title">{{ post.title }}</div>
    <div class="card-author">
      <img :src="post.author.image" alt="profile" class="card-author-image" />
      <span class="card-author-name">{{ post.author.name }}</span>
    </div>
  </a>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"]
};
</script>

<style scoped>
.card {
  display: inline-block;
  width: 20%;
  margin: 5px;
  min-width: 300px;
  border: 1px solid rgba(128, 128, 128, 0.7);
  box-shadow: 2px 2px 10px 0px;
  border-radius: 3px;
  background-color: #fff;
  color: inherit;
  text-decoration: inherit;
}

.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.card-author {
  padding: 0em 1em 1em 1em;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.card-author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.card-author-name {
  padding-left: 1em;
}

.card-title {
  padding-bottom: 0.5em;
  padding-left: 0.5em;
  font-size: 1.2em;
  height: 3.6em;
  line-height: 1.2em;
  overflow: hidden;
}
</style>
