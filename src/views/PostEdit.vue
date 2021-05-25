<script>
import Vue from "vue";
import PostResource from "../resources/post";
import ResourceEdit from "../components/ResourceEdit.vue";
import PostFormSet from "../formsets/post";

export default Vue.extend({
  components: {
    ResourceEdit,
  },
  computed: {
      postFormSet(){
          return PostFormSet
      }
    },
  data() {
    return {
      loading: true,
      postResource: null,
    };
  },
  methods: {
    async editSuccess(){
      await this.postResource.save();
      this.$router.go(-1);
    }
  },
  async mounted() {
    this.postResource = await PostResource.detail(this.$route.params.id);
    await this.postResource.resolveAttribute("userId.name");
    this.loading = false;
  },
});
</script>

<template>
  <div>
    <div v-if="!loading">
      <resource-edit
        :resource="postResource"
        :formset="postFormSet"
        @success="editSuccess"
      />
    </div>
    <p v-else>Loading......</p>
  </div>
</template>
