<template>

  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="createArticle">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tag" type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="createArticle">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { createArticle } from "@/api/article";
export default {
  name: "EditorPage",
  middleware: "authenticated",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
    };
  },
  methods: {
    async createArticle() {
      let params = {
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: [this.tag],
        },
      };
      const { data } = await createArticle(params)
      this.$router.push({
          name: 'article',
          params:{
              slug: data.article.slug
          }
      })
    },
  },
};
</script>

<style>
</style>