<template>
  <b-card
    header="Login"
    header-tag="header"
    class="swansea-blue mt-5">


    <img src="~assets/img/logo.png" alt="Swansea University" class="w-50 p-2 mx-auto d-block">

    <b-form v-on:submit.prevent="submit">


      <div v-if="form.error != ''">
        <b-alert show class="mt-2" variant="danger">{{ form.error }}</b-alert>
      </div>

      <b-form-group
        id="input-group-number"
        label="Student Number:"
        label-for="input-student-number">
        <b-form-input
          id="input-student-number"
          v-model="form.studentNumber"
          type="text"
          required
          placeholder="Student Number">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="Password:"
        label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          placeholder="Password"
          required>
        </b-form-input>
      </b-form-group>

      <div class="pull-right">
        <b-button type="submit" variant="outline-primary" class="float-right mr-0">Login</b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import axios from 'axios';

import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'

export default{
  mixins: [ validationMixin ],
  data(){
    return {
      error: null,
      form: {
        error: '',
        studentNumber: '',
        password: '',
      }
    }
  },
  methods: {
    submit() {
      this.form.error = ''
      var formData = new FormData();
      formData.append('username', this.form.studentNumber);
      formData.append('password', this.form.password);

      axios.post('https://intranet.blackman.fyi/api/login', formData)
      .then((res) => {
        if(res.data.ok == true){
          this.$cookies.set('intranet-token', res.data.user.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 3
          })

          this.$cookies.set('intranet-user', res.data.user.name, {
            path: '/',
            maxAge: 60 * 60 * 24 * 3
          })

          this.$router.push('/dashboard')
        } else {
          this.form.error = res.data.statusText
          this.form.password = ''
        }

      })
      .catch(function (e) {
        // handle error
        this.form.error = "There was an error with the network. Please contact System Administrator."
      })
    }
  },
  validations: {
    studentNumber: {
      required,
      numeric,
    },
  }
}
</script>

<style>
.swansea-blue .card-header {
  background-color: #242f60;
  font-size: 1.25rem;
  font-family:cosmos;
  color: white;
}
</style>
