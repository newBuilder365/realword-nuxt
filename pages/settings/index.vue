<template>

  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "SettingsPage",
  middleware: "authenticated",
  data() {
    return {
      email: "",
      username: "",
      bio: "",
      image: "",
      token: "",
      password: "",
    };
  },
  async mounted() {
    const { data } = await getUser();
    const { user } = data;
    this.email = user.email || "";
    this.username = user.username || "";
    this.bio = user.bio || "";
    this.image = user.image || "";
    this.password = user.password || "";
    this.token = user.token || "";
  },
  methods: {
    async updateUser() {
      try {
        let params = {
          user: {
            email: this.email,
            username: this.username,
            bio: this.bio,
            image: this.image,
            password: this.password,
            token: this.token,
          },
        };
        await updateUser(params);
        this.$store.commit("setUser", params.user);
        Cookie.set("user", JSON.stringify(params.user));
        this.$router.push({
          name: "profile",
          params: {
            username: params.user.username,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    logout() {
      this.$store.commit("setUser", null);
      Cookie.set("user", null);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>