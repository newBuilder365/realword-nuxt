<template>

  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article" />

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticleBySlug } from "@/api/article";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from './components/article-comments.vue'
import MarkdownIt from 'markdown-it'
export default {
  name: "ArticlePage",
  middleware: "authenticated",
  async asyncData({ params }) {
    const { slug } = params;
    const { data } = await getArticleBySlug(slug);
    const { article } = data;
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
    };
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
};
</script>

<style>
</style>