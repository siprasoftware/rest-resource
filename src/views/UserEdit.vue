<script>
import Vue from "vue";
import UserResource from "../resources/user";
import ResourceEdit from "../components/ResourceEdit.vue";
import UserFormSet from "../formsets/user";

export default Vue.extend({
  components: {
    ResourceEdit,
  },
  computed: {
      userFormSet(){
          return UserFormSet
      }
    },
  data() {
    return {
      loading: true,
      userResource: null,
    };
  },
  methods: {
    async editSuccess(){
      await this.userResource.save();
      this.$router.go(-1);
    }
  },
  async mounted() {
    this.userResource = await UserResource.detail(this.$route.params.id);
    this.loading = false;
  },
});
</script>

<template>
  <div>
    <div v-if="!loading">
      <resource-edit
        :resource="userResource"
        :formset="userFormSet"
        @success="editSuccess"
      />
    </div>
    <p v-else>Loading......</p>
  </div>
</template>
