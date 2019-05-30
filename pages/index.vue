<template>
  <section class="container">
    <div>
      <b-row class="justify-content-center">
        <b-col cols="12" lg="6" md="8" sm="12" xs="12">
          <login-form/>
        </b-col>
      </b-row>

    </div>
  </section>
</template>

<script>
import loginform from '~/components/login/login-form.vue'

export default {
  layout: 'login',
  middleware: ['auth-checker'],
  components: {
    'login-form': loginform
  }
}
</script>

<style>

</style>
