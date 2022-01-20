<template>
  <q-card class="my-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="`https://avatar.oxro.io/avatar.svg?name=${item.user_name}`">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{item.user_name}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      {{item.body}}
    </q-card-section>

  </q-card>
</template>

<script>

    import httpClient from 'src/app/api/httpClient';
    import { Notify } from 'quasar';
    export default {

        props:["item"],
        data() {
            return {
                isLoading:false,
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
