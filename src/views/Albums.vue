<script>
// @ is an alias to /src
import Vue from "vue";
import ResourceList from "../components/ResourceList.vue";
import AlbumResource from "../resources/album";
import PhotosResource from "../resources/photos";

export default Vue.extend({
  name: "Albums",
  components: {
      ResourceList
  },
  computed:{
    fields(){
      return [{key:'title', label:'Title'},{key:'userId.name',label:'Created By'},{key:'albumId',label:'Photos'}]
    }
  },
  data() {
    return {
      loading: true,
      AlbumResources: [],
      photosResource:[],
      resourceName:'Albums'
    };
  },
  methods: {
    async getAlbums() {
      let albumsResult = await AlbumResource.list({ resolveRelated: true });
      this.AlbumResources = albumsResult.resources;
    },
  async showPhots(resource){
       let phot0sResult = await PhotosResource.list({ query: { albumId: resource.id}});
       this.photosResource = phot0sResult.resources
       this.$bvModal.show('bv-modal-phots')
  }
  },
  async mounted() {
    await this.getAlbums();
    this.loading = false;
  },
  
});
</script>

<template>
  <div class="albums">
    <resource-list 
    :resources="AlbumResources" 
    :fields="fields"
    :resourceName="resourceName"
    v-if="!loading" >
    <template slot="value-albumId" slot-scope="data">
       <div>
            <b-button class="view-btn" v-on:click="showPhots(data.resource)" v-b-modal.modal-scrollable>View</b-button>
            <b-modal id="bv-modal-phots" size="lg" hide-footer scrollable>
                <template #modal-title>
                List of photos 
                </template>
                <div class="d-block">
                <ul v-for="(photo, i) in photosResource" :key="i">
                    <li> {{photo._attributes.title}} </li>
                </ul>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-phots')">Close</b-button>
            </b-modal>
             </div>
      </template>

    </resource-list>
    <p v-else>Loading.......</p>
  </div>
  
</template>

<style scoped>

.view-btn{
    padding: 0 6px 0 4px;
    margin-bottom: 8px;
    margin-top: -6px;
}

</style>