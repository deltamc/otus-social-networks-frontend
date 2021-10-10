<template>
  <q-dialog
    v-model="isModalShow"
    no-esc-dismiss
    no-backdrop-dismiss
    @hide="onModalClose()"
  >
    <q-card :style="{maxWidth:maxWidth, 'width':'70%'}">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ formTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "Modal",
  components: {},
  props: {'formTitle':{}, 'value':{}, 'maxWidth':{
    default: '1080px',
}},

  data() {
    return {
      isModalShow: this.value,
    }
  },

  methods: {
    onModalClose() {
      this.$emit('close', false);
    },
  },

  watch: {
    'value': function (val) {
      this.isModalShow = val;
    },
    'isModalShow': function (val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style scoped>

</style>
