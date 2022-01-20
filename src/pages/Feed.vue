<template>
  <q-page class="flex flex-center" >
    <v-loading :isLoading="isLoading" />
    <div class="row q-gutter-md" style="max-width: 800px; width:100%; margin-top:50px" >
      <div class="col-12 "> <q-input
        v-model="post"
        filled
        type="textarea"
        style="margin-bottom:10px"
      />
        <q-btn :disable="post.length < 10" color="primary" @click="publish" label="Publish" />
      </div>
      <div class="col-12 " v-for="item in feed"><feed-item :item="item" ></feed-item></div>
    </div>

  </q-page>
</template>

<script>
import httpClient from 'src/app/api/httpClient';
import VLoading from 'components/VLoading'
import FeedItem from 'components/FeedItem'
const API_FEED = '/feed';
const API_POST = '/post';

export default {
  name: 'PageFriends',
  components: {VLoading, FeedItem},

  data() {
    return {
      isLoading:false,
        feed:[],
        post:"",
    }
  },
    mounted() {
        this.getItems()
    },
    methods:{
        getItems() {
            this.isLoading = true;
            console.log("process.env.API_FEED_BASE_URL", process.env.API_FEED_BASE_URL);
            return httpClient.get(API_FEED, {baseURL: `${process.env.API_FEED_BASE_URL}/`}).then((res) => {
                this.feed = res.data;
            }).finally(() => {
                this.isLoading = false;
                this.$q.loading.hide()
            });
        },
        publish() {
            this.isLoading = true;
            return httpClient.post(API_POST, {
                body:this.post,
            }).then((res) => {

                this.post = "";
                this.getItems();
            }).finally(() => {
                this.isLoading = false;
                this.$q.loading.hide()
            });
        }
    }
}
</script>
