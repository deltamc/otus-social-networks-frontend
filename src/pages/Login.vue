<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-center q-mb-lg menu-icon">Sign in</div>
        <div class="login-form">
          <q-form ref="loginForm" @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input
              filled
              type="text"
              v-model="form.login"
              label="Login"
              :rules="[rules.required]"
            />

            <q-input
              filled
              type="password"
              v-model="form.password"
              label="Password"

              :rules="[rules.required, rules.minLen(6)]"
            />



            <div class="q-mt-lg">
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import VLoading from 'components/VLoading'

export default {
  name: 'Login',
  components: {VLoading},

  data() {
    return {
      recaptcha_site_key: process.env.RECAPTCHA_SITE_KEY || '',
      form: {
        email: process.env.DEMO_USER || '',
        password: process.env.DEMO_PASSWORD || '',
        'g-recaptcha-response': null,
      },
      rules: {
        required: (v) => !!v || 'Required field',
        minLen: (minLen) => (v) => v.length >= minLen || `Minimum  ${minLen} characters `,
      },
    }
  },

  methods: {



    onSubmit() {
      this.$q.loading.show();
      const { loginForm } = this.$refs;
      loginForm
        .validate()
        .then((success) => {
          return success && this.authenticate();
        });
    },

    authenticate() {
      return this.$auth.login({
          data: this.form,
      }).then(() => {

        setTimeout(() => {this.$q.loading.hide()}, 400);
        this.$router.push({path: '/'});
      }).finally(() => {
        setTimeout(() => {this.$q.loading.hide()}, 400);
      });
    },
  },
}
</script>

<style scoped>
.login-form {
  min-width: 640px;
  max-width: 1080px;
}
</style>
