<script>
// @ is an alias to /src
import Vue from "vue";
import ResourceList from "../components/ResourceList.vue";
import UserResource from "../resources/user";
export default Vue.extend({
  name: "Home",
  components: {
    ResourceList,
  },
  computed: {
    fields() {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
      ];
    },
  },
  data() {
    return {
      loading: true,
      UserResources: [],
      resourceName: "Users",
    };
  },
  methods: {
    async getUsers() {
      let userResult = await UserResource.list();
      this.UserResources = userResult.resources;
    },
  },
  async mounted() {
    await this.getUsers();
    this.loading = false;
  },
});
</script>

<template>
  <div class="users">
    <resource-list
      :resources="UserResources"
      :fields="fields"
      :resourceName="resourceName"
      v-if="!loading"
    >
      <template slot="value-name" slot-scope="data">
        <router-link
          :to="{ name: 'UserEdit', params: { id: data.resource.id } }"
          >{{ data.value }}</router-link
        >
      </template>
    </resource-list>
    <p v-else>Loading.......</p>
  </div>
</template>
