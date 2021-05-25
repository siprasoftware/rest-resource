<script>
// @ is an alias to /src
import Vue from "vue";
import ResourceList from "../components/ResourceList.vue";
import PostResource from "../resources/post";
export default Vue.extend({
  name: "Home",
  components: {
    ResourceList,
  },
  computed: {
    fields() {
      return [
        { key: "id", label: "Id" },
        { key: "userId.name", label: "Author" },
        { key: "title", label: "Title" },
      ];
    },
  },
  data() {
    return {
      loading: true,
      postResources: [],
      resourceName:'Posts'
    };
  },
  methods: {
    async getPosts() {
      let postResult = await PostResource.list();
      this.postResources = postResult.resources;
      let promises = [];
      this.postResources.forEach((resource) => {
        let promise = resource.resolveAttribute("userId.name");
        promises.push(promise);
      });

      await Promise.all(promises);
    },
  },
  async mounted() {
    await this.getPosts();
    this.loading = false;
  },
});
</script>

<template>
  <div class="home">
    <resource-list :resources="postResources" :fields="fields" :resourceName="resourceName"  v-if="!loading">
      <template slot="value-title" slot-scope="data">
        <router-link :to="{name:'Post' , params:{id:data.resource.id}}">{{ data.value }}</router-link>
      </template>
    </resource-list>
    <p v-else>Loading.......</p>
  </div>
</template>
