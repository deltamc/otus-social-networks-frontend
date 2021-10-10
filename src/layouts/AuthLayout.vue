<template>
  <q-layout>
    <q-header elevated class="text-white" height-hint="61.59" style="background: #24292e">
      <q-toolbar class="q-py-sm q-px-md menu-links">
        <!-- Кнопка домой -->
<!--        <router-link :to="`/`">-->
<!--          <q-btn dense flat no-wrap>-->
<!--            <q-icon name="home" color="white" class="menu-icon" />-->
<!--          </q-btn>-->
<!--        </router-link>-->


        <router-link v-for="link in links"
                     :key="link.id"
                     :to="link.link"
                     class="q-pl-md">
          {{ link.title }}
        </router-link>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <!-- Меню пользователя -->
          <q-btn v-if="$auth.user()" dense flat no-wrap>
            <q-avatar rounded size="20px">
              <q-icon name="account_circle" style="font-size: 20px;" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense class="menu-item-links">
                <q-item>
                  <q-item-section>
                    <div></div>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable>
                  <a @click="logout">Log out</a>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink.vue'

    export default {
        name: 'MainLayout',
        components: { EssentialLink },

        data () {
            return {
                searchMenuItem: '',
                // Список ссылок для меню
                links: [
                    {
                        id: 1,
                        title: 'Sign in',
                        link: '/login',
                    },
                    {
                        id: 2,
                        title: 'Sign up',
                        link: '/sign-up',
                    },

                ]
            }
        },

        computed: {

        },
        methods:{
            logout() {
                localStorage.removeItem('auth_token_default')
                this.$router.push('/login')
            }
        }
    }
</script>
