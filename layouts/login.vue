<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'login-body'
    }
  }
}
</script>


<style>
.login-body{
  background-image:url('~assets/img/bg.jpg');
}
</style>
