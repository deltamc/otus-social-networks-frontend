<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-center q-mb-lg menu-icon">My profile</div>
        <div class="login-form">
          <q-form ref="regForm" @submit.prevent="onSubmit" class="q-gutter-md">

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
import { Notify } from 'quasar';

const EDIT_PROFILE_URL = 'profile';
export default {
  name: 'Profit',
  components: {VLoading},

  data() {
    return {
        isLoading:false,
      sex:[
          {id:1, name:'Male'},
          {id:2, name:'Female'},
      ],
      form: {
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
  mounted(){
      let user = this.$auth.user();
      this.form = {
          first_name: user.first_name,
          last_name: user.last_name,
          sex: user.sex,
          age: user.age,
          city: user.city,
          interests: user.interests,
      };
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
              url: EDIT_PROFILE_URL,
              data: this.form,
          }).then((res) => {
              Notify.create({
                  color: 'positive',
                  message: 'Saved ',
                  icon: 'report_problem',
                  position: 'top',
                  avatar: '',
                  duration: 5000,
              })
          }).finally(() => {
              this.isLoading = false;
              this.$q.loading.hide()
          })
    },

      authenticate() {
          this.$auth.login({ data: this.form }).then(({ data }) => {
              const { results } = data;
              this.$router.push({path: '/'});
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
