<template>
  <q-card class="my-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="`https://avatar.oxro.io/avatar.svg?name=${user.first_name}`">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{user.first_name}} {{user.last_name}}</q-item-label>
        <q-item-label caption>
          @{{user.login}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      Sex: <q-icon  v-if="1" name="male" /> <q-icon  v-else name="female" /> <br>
      City: {{user.city}}<br>
      Age: {{user.age}}<br>
      Interests: {{user.interests}}
    </q-card-section>
    <q-separator />
    <q-card-actions v-if="canMakeFriends">
      <q-btn flat color="primary" @click="makeFriends(user.id)">
        make friends
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
    const API_PEOPLE = '/make_friend';
    import httpClient from 'src/app/api/httpClient';
    import { Notify } from 'quasar';
    export default {
        name: "Card",
        props:["user","can-make-friends"],
        data() {
            return {
                isLoading:false,
            }
        },
        methods: {
            makeFriends(id) {
                this.isLoading = true;
                return httpClient.post(API_PEOPLE, {user_id:id}).then((res) => {
                }).finally(() => {
                    this.isLoading = false;
                    this.$q.loading.hide()

                }).then(res =>{
                    Notify.create({
                        color: 'positive',
                        message: 'Saved',
                        icon: 'report_problem',
                        position: 'top',
                        avatar: '',
                        duration: 5000,
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>
