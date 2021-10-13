import Auth from '@websanova/vue-auth/dist/vue-auth.esm'
import driverAuth from '@websanova/vue-auth/drivers/auth/bearer'
import httpDriver from '@websanova/vue-auth/drivers/http/axios.1.x'
import routerDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x'
import httpClient from 'src/app/api/httpClient'

/**
 * https://websanova.com/docs/vue-auth/home
 */
export default ({ Vue, router }) => {
  /*
   * vue-auth использует переменные Vue.axios и Vue.router вместо
   * общепринятых переменных с $ в начале, пока так можно делать
   */
  Vue.axios = httpClient
  Vue.router = router

  const baseUrl = `${process.env.API_BASE_URL}`

  Vue.use(Auth, {
    auth: driverAuth,
    http: httpDriver,
    router: routerDriver,
    tokenDefaultName: 'token',
    tokenStore: ['localStorage'],
    registerData: {
      url: `${baseUrl}/register`,
      redirect: '/people',
      autoLogin: true
    },
    loginData: {
      url: `${baseUrl}/sign-in`,
      method: 'POST',
      redirect: false,
      fetchUser: true,
      staySignedIn: true
    },
    logoutData: {
      url: `${baseUrl}/logout`,
      makeRequest: true,
      redirect: '/login'
    },
    authRedirect: '/login',
    fetchData: {
      url: `${baseUrl}/me`,
      method: 'GET',
      enabled: true
    },
    refreshData: {
      url: `${baseUrl}/refresh`,
      method: 'POST',
      interval: 30 /* Авто-рефреш каждые 30 минут, в 2 раза чаще чем жизнь токена */
    },
    parseUserData: (data) => {
      const user = data

      return user || {}
    }
  })
}
