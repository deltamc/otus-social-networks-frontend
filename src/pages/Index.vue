<template>
  <q-page class="flex flex-center">
    <v-loading :isLoading="isLoading" />

  </q-page>
</template>

<script>
import VLoading from 'components/VLoading'

export default {
  name: 'PageIndex',
  components: {VLoading},

  data() {
    return {
      isLoading: false,
    }
  }
}
</script>
