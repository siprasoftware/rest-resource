<script>
// @ is an alias to /src
import Vue from "vue";
import ResourceList from "../components/ResourceList.vue";
import TodoResource from "../resources/todo";
export default Vue.extend({
  name: "Todos",
  components: {
      ResourceList
  },
  computed:{
    fields(){
      return [{key:'title', label:'Title'},{key:'userId.name',label:'Created By'},{key:'completed',label:'Completed'}]
    }
  },
  data() {
    return {
      loading: true,
      TodoResources: [],
      resourceName:'Todos List'
    };
  },
  methods: {
    async getTodos() {
      let todoResult = await TodoResource.list({ resolveRelated: true });
      this.TodoResources = todoResult.resources;
    },
    async completedItem(resource, value){
      
        resource.set('completed', value)
        await resource.save()
  }
  },
  async mounted() {
    await this.getTodos();
    this.loading = false;
  },
  
});
</script>

<template>
  <div class="users">
    <resource-list 
    :resources="TodoResources" 
    :fields="fields"
    :resourceName="resourceName"
    v-if="!loading" >
    <template slot="value-completed" slot-scope="data">
        <b-form-checkbox @input="(value) => completedItem(data.resource, value)" :checked="!!data.value" />
      </template>

    </resource-list>
    <p v-else>Loading.......</p>
  </div>
</template>
