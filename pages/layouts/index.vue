<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link to='/'>conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <nuxt-link to='/' class="nav-link" exact>Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to='/article/123' class="nav-link">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to='/settings' class="nav-link">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to='/login' class="nav-link">
              Sign in
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to='/register' class="nav-link">
              Sign up
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <!-- <a href="/" class="logo-font">conduit</a> -->
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "layoutPage",
};
</script>

<style>
</style>