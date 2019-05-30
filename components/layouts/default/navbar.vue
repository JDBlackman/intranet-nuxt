<template lang="html">
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="swansea-nav">
      <div class="container-fluid">
        <b-navbar-brand href="#" class="brand-swansea">
          <img src="/img/logo-white-en.svg" alt="Swansea University" class="h-100">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/dashboard">{{ $t('navbar.dashboard') }}</b-nav-item>
            <b-nav-item to="/timetable">{{ $t('navbar.timetable') }}</b-nav-item>
            <b-nav-item to="/coursework">{{ $t('navbar.coursework') }}</b-nav-item>
            <b-nav-item to="/directory">{{ $t('navbar.directory') }}</b-nav-item>
          </b-navbar-nav>


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="$t('navbar.language')" right>
              <b-dropdown-item v-on:click="changeLang('en')">EN</b-dropdown-item>
              <b-dropdown-item v-on:click="changeLang('cy')">CY</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>{{ name }}</em></template>
              <b-dropdown-item v-on:click="logout()">{{ $t('navbar.logout') }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/cy'

export default {
  data(){
    return {
      name: ''
    }
  },
  created() {
    this.name = this.$cookies.get('intranet-user')
  },
  methods: {
    changeLang (localeCode) {
      document.cookie = `locale=${localeCode}`;
      location.reload();

      this.$bus.$emit('language');
    },
    logout(){
      this.$cookies.remove('intranet-token');
      this.$cookies.remove('intranet-user');
      location.reload();
    }
  }
}
</script>

<style lang="css" scoped>
.bg-info {
  background-color: #242f60 !important;
}

.brand-swansea{
  width:150px;
}

.navbar-brand{
  font-family:cosmos;
}

.nav-item{
  font-size:1em;
  color:white;
  margin-right:10px;
  font-family:cosmos
}

.nav-item a {
  color:white !important;
}


.nav-link:hover, .nav-link:focus {
    border-bottom:2px solid #cad400;
}

.nav-item a:active{
  border-bottom:2px solid #cad400;
}

.nuxt-link-exact-active{
  border-bottom:2px solid #cad400;
}
</style>
