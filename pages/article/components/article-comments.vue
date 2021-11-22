<template>
  <div>
    <form class="card comment-form" @submit.prevent="addComments">
      <div class="card-block">
        <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }" class="comment-author">
          <img :src="comment.author.iamge" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }" class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD,YYYY') }}</span>
        <span class="mod-options">
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a" v-if="comment.author.username === user.username" @click="deleteComments(comment)"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from "@/api/comments";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      comments: [],
      comment: "",
    };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async addComments() {
      let params = {
        slug: this.article.slug,
        comment: {
          body: this.comment,
        },
      };
      const { data } = await addComments(params);
      this.comments = [data.comment, ...this.comments];
    },
    async deleteComments(comment) {
      let params = {
        slug: this.article.slug,
        id: comment.id,
      };
      await deleteComments(params);
      this.comments = this.comments.filter((v) => v.id !== comment.id);
    },
  },
};
</script>

<style>
</style>