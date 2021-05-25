<script>
import Vue from "vue";
import messageMixin from "../mixins/messages";

export default Vue.extend({
  mixins: [messageMixin],
  props: {
    resource: {
      required: true,
      type: Object,
    },
    formset: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      errorMessages: {},
    };
  },
  methods: {
    async onSubmit(e) {
      this.errorMessages = {}
      let errors = this.resource.validate();
      if (errors.length > 0) {
        this.$emit("error", errors, e);
        errors.forEach((error) => {
          this.errorMessages[`${error.field}`] = error.message
        });
        return false;
      }
      this.addSuccess("Details Saved Successfully");
      this.$emit("success", e);
    },
  },
});
</script>

<template>
  <div>
    <b-button
      class="float-right"
      variant="outline-primary"
      @click="$router.go(-1)"
      ><i class="fas fa-angle-left"></i>Back</b-button
    >
    <br />
    <form @submit.prevent="onSubmit">
      <b-form-group
        v-for="(field, key) in formset"
        :key="key"
        :label="field.label"
      >
        <component
          :is="field.getComponent()"
          v-model="resource.attributes[key]"
          :resource="resource"
          :field="field"
        ></component>
        <small class="text-danger">{{ errorMessages[key] }}</small>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <Messages :messages="mixinMessages" class="mt-3" />
    </form>
  </div>
</template>

<style scoped>
form {
  width: 50%;
}
</style>
