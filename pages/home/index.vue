<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{
                  active: tab === 'your_feed'
                }" :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed' 
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{
                  active: tab === 'global_feed'
                }" :to="{
                  name:'home',
                  query: {
                    tab: 'global_feed'
                  }
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link exact class="nav-link" :class="{
                  active: tab === tag
                }" :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag
                  }
                }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }" class="author">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
              </div>
              <button @click="handleFavorites(article)" 
                class="btn btn-outline-primary btn-sm pull-xs-right" 
                :disabled="article.favoriteDisabled"
                :class="{
                active: article.favorited
              }">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li class="page-item" v-for="item in totalPage" :key="item">
                <nuxt-link :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag,
                    tab
                  }
                }" class="tag-pill tag-default">
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{
                name:'home',
                query:{
                  tab: 'tag',
                  tag,
                }
              }" class="tag-pill tag-default" v-for="tag in tags" :key="tag">
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  onFavorites,
  unFavorites,
} from "@/api/article";
import { getTags } from "@/api/tags";
export default {
  name: "HomePage",
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    let limit = 20;
    const { page, tag, tab = "global_feed" } = query;
    let offset = (page - 1) * limit;
    let pars = {
      limit,
      offset,
      tag,
    };
    let [articleRes, tagRes] = await Promise.all([
      tab === "your_feed" ? getFeedArticles() : getArticles(pars),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags: tags?.slice(0, 20) || [],
      tag,
      tab,
      offset,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async handleFavorites(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await unFavorites({ slug: article.slug });
        article.favorited = false;
        article.favoritesCount--;
      } else {
        await onFavorites({ slug: article.slug });
        article.favorited = true;
        article.favoritesCount++;
      }
      article.favoriteDisabled = false
    },
  },
};
</script>

<style>
</style>