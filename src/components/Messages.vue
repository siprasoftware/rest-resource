<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    messages: {
      required: true,
      default() {
        return this.$parent.mixinMessages;
      },
    },
  },
});
</script>

<template>
  <div>
    <b-alert
      show
      v-for="(messageObj, i) in messages"
      :key="i"
      :variant="messageObj.variant"
      >{{ messageObj.text }}</b-alert
    >
  </div>
</template>
