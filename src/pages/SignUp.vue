<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-center q-mb-lg menu-icon">Sign up</div>
        <div class="login-form">
          <q-form ref="regForm" @submit.prevent="onSubmit" class="q-gutter-md">
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

            <q-input
              filled
              v-model="form.first_name"
              label="First name"

              :rules="[rules.required]"
            />

            <q-input
              filled
              v-model="form.last_name"
              label="Last name"

              :rules="[rules.required]"
            />

            <q-input
              filled
              v-model="form.age"
              label="Age"

              :rules="[rules.required]"
            />


            <q-select
              label="Sex"
              dense
              filled
              option-value="id"
              option-label="name"
              emit-value
              map-options
              v-model="form.sex"
              :options="sex"
              :rules="[rules.required]"
            />


            <q-input
              filled
              v-model="form.city"
              label="City"

              :rules="[rules.required]"
            />

            <q-input
              filled
              v-model="form.interests"
              label="Interests"
              type="textarea"
              :rules="[rules.required]"
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
    import httpClient from 'src/app/api/httpClient';
import VLoading from 'components/VLoading'
const REGISTER_URL = 'sign-up';
export default {
  name: 'Login',
  components: {VLoading},

  data() {
    return {
        isLoading:false,
      sex:[
          {id:1, name:'Male'},
          {id:2, name:'Female'},
      ],
      form: {
        email: '',
        password: '',
          first_name: '',
          last_name: '',
          sex: null,
          age: '',
          city: '',
          interests: '',
      },
      rules: {
        required: (v) => !!v || 'Require  d field',
        minLen: (minLen) => (v) => v.length >= minLen || `Minimum  ${minLen} characters `,
      },
    }
  },

  methods: {



    onSubmit() {
      this.$q.loading.show();
      const { regForm } = this.$refs;
        regForm
        .validate()
        .then((success) => {
          return success && this.submit();
        });
    },

      submit() {
          httpClient({
              method: 'POST',
              url: REGISTER_URL,
              data: this.form,
              // headers: {
              //     'Content-Type': 'application/x-www-form-urlencoded',
              // },
          }).then((res) => {
              this.authenticate();
          }).finally(() => {
              this.isLoading = false;
              this.$q.loading.hide()
          })
    },

      authenticate() {
          this.$auth.login({ data: this.form }).then(({ data }) => {
              const { results } = data;
              this.$router.push("/home");
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
