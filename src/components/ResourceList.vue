<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    resources: {
      required: true,
      type: Array,
    },
    fields: {
      required: true,
      type: Array,
    },
    resourceName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
			page: 1,
			perPage: 10,
			pages: [],		
    };
  },
  computed: {
    displayedResources () {
      this.setPages();
			return this.paginate(this.resources);
		},
  },
  methods: {
    setPages () {
      this.pages = []
			let numberOfPages = Math.ceil(this.resources.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
    paginate (resources) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  resources.slice(from, to);
		}
  },
  watch: {
		resources() {
			this.setPages();
		}
	},
  
});
</script>

<template>
  <div>
    <div class="resource-title"> <h2>{{resourceName}}</h2> </div>
    <table class="table" outlined>
      <thead>
        <tr>
          <th v-for="(field, i) in fields" :key="i">{{ field.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(resource, i) in displayedResources" :key="i">
          <td v-for="(field, j) in fields" :key="j">
            <slot
              :name="`value-${field.key}`"
              :value="resource.get(field.key)"
              :resource="resource"
              :field="field"
            >
              {{ resource.get(field.key) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example" v-if="pages.length > 1">
			<ul class="pagination">
        <li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="page = 1"> <i class="fas fa-angle-double-left"></i> </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="page--"> <i class="fas fa-angle-left"></i> </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link" v-for="(pageNumber,i) in pages.slice(page-1, page+5)" @click="page = pageNumber" :key="i"> {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> <i class="fas fa-angle-right"></i> </button>
				</li>
        <li class="page-item">
					<button type="button" @click="page = pages.length" v-if="page < pages.length" class="page-link"> <i class="fas fa-angle-double-right"></i> </button>
				</li>
			</ul>
		</nav>
  </div>
</template>
<style scoped>

.table td{
  padding: 11px 0px 11px 10px !important;
}
button.page-link {
	display: inline-block;
}
button.page-link {
    font-size: 20px;
    color: cornflowerblue;
    font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}

.resource-title{
  color:cornflowerblue
}

</style>