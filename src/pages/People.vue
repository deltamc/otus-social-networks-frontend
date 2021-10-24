<template>
  <q-page class="flex flex-center content-start" >

    <div style="max-width: 800px; width:100%; margin-top:50px">
    <v-loading :isLoading="isLoading" />
    <div class="q-gutter-xs"  >
     <q-input
       style="max-width: 200px; float:left"
        filled
        dense
        v-model="filter.first_name"
        label="First name"
      />
      <q-input
        style="max-width: 200px; float:left"
        filled
        dense
        v-model="filter.last_name"
        label="Last name"
      />
        <q-btn label="find" @click="find" color="primary"/>
    </div>


    <br>
    <br>
    <div class="row q-gutter-md"  >
      <div class="col-12 " v-for="item in people"><Card :user="item" :can-make-friends="true"></Card></div>
    </div>
      </div>
  </q-page>
</template>

<script>
import httpClient from 'src/app/api/httpClient';
import VLoading from 'components/VLoading'
import Card from 'components/Card'
const API_PEOPLE = '/users';
export default {
  name: 'PagePeople',
  components: {VLoading, Card},

  data() {
    return {
      isLoading:false,
      people:[],
      filter:{
          first_name:'',
          last_name:'',
      }
    }
  },
    mounted() {
        this.getItems()
    },
    methods:{
        getItems() {
            this.isLoading = true;
            return httpClient.get(API_PEOPLE,{params:this.filter}).then((res) => {
                this.people = res.data;
            }).finally(() => {
                this.isLoading = false;
                this.$q.loading.hide()
            });
        },
        find() {
            this.getItems()
        }
    }
}
</script>
