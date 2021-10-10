<template>
</template>

<script>
export default {
  name: 'VLoading',
  props: ['isLoading'],

  data() {
    return {}
  },

  watch: {
    'isLoading': function (val) {
      val
        ? this.$q.loading.show()
        : this.$q.loading.hide();
    }
  }
}
</script>

<style scoped>

</style>
