<template>
  <q-page class="flex flex-center" >
    <v-loading :isLoading="isLoading" />

    <div class="row q-gutter-md" style="max-width: 800px; width:100%; margin-top:50px" >
      <div class="col-12 " v-for="item in people"><Card :user="item" :can-make-friends="false"></Card></div>
    </div>

  </q-page>
</template>

<script>
import httpClient from 'src/app/api/httpClient';
import VLoading from 'components/VLoading'
import Card from 'components/Card'
const API_PEOPLE = '/friends';
export default {
  name: 'PageFriends',
  components: {VLoading, Card},

  data() {
    return {
      isLoading:false,
      people:[],
    }
  },
    mounted() {
        this.getItems()
    },
    methods:{
        getItems() {
            this.isLoading = true;
            return httpClient.get(API_PEOPLE).then((res) => {
                this.people = res.data;
            }).finally(() => {
                this.isLoading = false;
                this.$q.loading.hide()
            });
        },
    }
}
</script>
