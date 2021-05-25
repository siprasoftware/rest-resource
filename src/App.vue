<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      mainRoutes: [
        { name: "Home", text: "Posts" },
        { name: "Users", text: "Users" },
        { name: "Todos", text: "Todos" },
        { name: "Albums", text: "Albums" },
      ],
      mainSectionwidth: "10",
      hideSidebar: false
    };
  },
  methods:{
    toggleSidebar(){
      this.hideSidebar = !this.hideSidebar;
      this.hideSidebar?this.mainSectionwidth='12':this.mainSectionwidth='10'
    }
  }
});
</script>

<template>
  <div id="app">
    <b-container class="bv-example-row" fluid>
      <b-row>
        <b-col class="sideBar" v-if="!hideSidebar">
          <div id="side-menu" class="side-nav">
            <div class="side-icon">
              <i class="fas fa-adjust"></i>
            </div>
            <div class="menu-items">
              <router-link
                v-for="(routes, index) in mainRoutes"
                :key="index"
                :to="{ name: routes.name }"
                active-class="active"
                exact
                class="side-item"
              >
                <div class="link-container">{{ routes.text }}</div>
              </router-link>
            </div>
          </div>
        </b-col>
        <b-col :cols="mainSectionwidth">
          <b-row>
            <b-container fluid class="p-0">
              <b-navbar toggleable="lg" type="light" variant="faded">
                <b-nav-item v-on:click="toggleSidebar"><i class="fa fa-bars" aria-hidden="true"></i></b-nav-item>
              </b-navbar>
              <div class="p-4">
              <router-view />
              </div>
            </b-container>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.sideBar {
  -moz-box-shadow: -3px 0 5px 0 #555;
  -webkit-box-shadow: -3px 0 5px 0 #555;
  box-shadow: -3px 0 12px 0 #555;
  background-color: #fff;
  height: 100vh;
}
.navbar{
  box-shadow: 0 7px 10px 0 rgba(0,0,0,.2);
}
.nav-item{
  list-style: none;
}

.link-container{
  padding: 15px;
  border-top: 1px solid gainsboro;
}
.side-icon{
  text-align: center;
  padding: 18px;
  font-size: 49px;
  color: cornflowerblue;
}

.router-link-exact-active .link-container {
  background-color: cornflowerblue;
  color:#fff
}
</style>
