<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      loading: true,
      query: "",
      initialQuery: "",
      relatedManager: null,
      resourceQueryResults: [],
      hasSearched: false,
      hasSelected: false,
      focused: false,
    };
  },
  props: {
    resource: {
      required: true,
      type: Object,
    },
    field: {
      required: true,
      type: Object,
    },
    deselectTimeOut: {
      default: 500,
    },
  },
  watch: {
    async query(value) {
      this.resourceQueryResults = await this.search(value);
    },
  },
  methods: {
    async getInitialQuery() {
      let fieldName = [
        this.field.relatedField,
        this.field.relatedFieldKey].join('.');
      this.query = await this.resource.resolveAttribute(fieldName);
      this.initialQuery = this.query;
    },
    async search(value) {
      if (!this.relatedManager) {
        return false;
      }
      let ResourceClass = this.relatedManager.to;
      let results = await ResourceClass.search(value);
      this.hasSearched = true;
      return results.resources;
    },
    onBlur(e) {
      setTimeout(() => {
        this.focused = false;
        if (!this.hasSelected) {
          this.query = this.initialQuery;
        }
      }, this.deselectTimeOut);
    },
    onFocus(e) {
      this.focused = true;
      this.$refs.queryInput.focus();
      this.$refs.queryInput.select();
    },
    select(resource) {
      this.resource.set(this.field.relatedField, resource.Id);
      this.query = String(resource);
      this.hasSelected = true;
      this.$emit('input', resource)
    },
  },
  async mounted() {
    await this.getInitialQuery();
    this.relatedManager = this.resource.managers[this.field.relatedField];
    this.loading = false;
  },
});
</script>

<template>
  <div tabindex="-1" class="bv-no-focus-ring typeahead">
    <input
      type="text"
      v-model="query"
      class="form-control"
      v-if="!loading"
      @focus="onFocus"
      @blur="onBlur"
      ref="queryInput"
    />
    <input
      type="text"
      disabled
      readonly
      class="form-control"
      v-else
      value="Loading..."
    />
    <div class="typeahead-options">
      <ul v-if="focused && hasSearched">
        <li v-for="(resource, i) in resourceQueryResults" :key="i">
          <a href="javascript:{};" tabindex="-1" @click="select(resource)">
            {{ resource }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.typeahead {
  position: relative;
}
.typeahead-options {
  position: absolute;
  top: 50px;
  left: 0px;
  background: #fff;
  width: 100%;
}
.typeahead-options ul{
    list-style: none;
    margin: 0;
    padding: 0;
}

.typeahead-options ul li{
    padding: 5px 20px;
}

.typeahead-options ul li a{
    display: block;
}
</style>
