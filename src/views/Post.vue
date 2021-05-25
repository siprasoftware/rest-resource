<script>
import Vue from "vue";
import PostResource from "../resources/post";
import CommentResource from "../resources/comment";

export default Vue.extend({
  data() {
    return {
      loading: true,
      postResource: null,
      commentResources: [],
    };
  },
  async mounted() {
    this.postResource = await PostResource.detail(this.$route.params.id);
    await this.postResource.resolveAttribute("userId.name");
    let commentResult = await CommentResource.list({
      query: { postId: this.postResource.id },
    });
    this.commentResources = commentResult.resources;
    this.loading = false;
  },
});
</script>

<template>
  <div>
    <div v-if="!loading">
      <b-row>
        <b-col cols="6"><h2 class="text-primary">Post Details</h2></b-col>
        <b-col cols="6"
          ><b-button
            class="float-right"
            variant="primary"
            :to="{ name: 'PostEdit', params: { id: $route.params.id } }"
          >
            Edit</b-button
          ></b-col
        >
      </b-row>
      <strong>Title</strong>
      <p>{{ postResource.attributes.title }}</p>
      <strong>User Name</strong>
      <p>{{ postResource.get("userId.name") }}</p>
      <strong>Body</strong>
      <p>{{ postResource.attributes.body }}</p>
      <hr />
      <h4>Comments</h4>
      <ul class="comments">
        <li v-for="(commentResource, i) in commentResources" :key="i">
          <strong> {{ commentResource.attributes.email }} said </strong>
          {{ commentResource.attributes.body }}
        </li>
      </ul>
    </div>
    <p v-else>Loading......</p>
  </div>
</template>

<style scoped>
ul.comments {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
