<template>
  <div class="container-fluid p-0 m-0 pb-5">
    <nav-bar></nav-bar>
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/layouts/default/navbar.vue'

export default {
  layout: 'default',
  head: {
    bodyAttrs: {
      class: 'homepage'
    }
  },
  components: {
    'nav-bar': Navbar
  }
}
</script>


<style scoped>

</style>
