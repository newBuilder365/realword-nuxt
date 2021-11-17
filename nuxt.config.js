module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[{
        path: '/',
        component: resolve(__dirname, 'pages/layouts'),
        children: [
          {
            path: '',
            component: resolve(__dirname, 'pages/home'),
            name: 'HomePage'
          },
          {
            path: '/login',
            component: resolve(__dirname, 'pages/login'),
            name: 'LoginPage'
          },
          {
            path: '/register',
            component: resolve(__dirname, 'pages/login'),
            name: 'RegisterPage'
          },
          {
            path: '/profile/:username',
            component: resolve(__dirname, 'pages/profile'),
            name: 'ProfilePage'
          },
          {
            path: '/settings',
            component: resolve(__dirname, 'pages/settings'),
            name: 'SettingsPage'
          },
          {
            path: '/article/:slug',
            component: resolve(__dirname, 'pages/article'),
            name: 'ArticlePage'
          },
          {
            path: '/editor',
            component: resolve(__dirname, 'pages/editor'),
            name: 'EditorPage'
          }
        ]
      }])
    }
  }
}