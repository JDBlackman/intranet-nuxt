<template>
  <section class="container-fluid">
    <div>
      <b-row class="mt-5">
        <b-col lg="12" xl="9">
          <timetable v-bind:timetable="timetable" v-bind:lang="lang" v-bind:starting="starting"></timetable>
        </b-col>
        <b-col lg="12" xl="3">
          <coursework v-bind:coursework="coursework"></coursework>
          <office-hours></office-hours>
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import cachios from 'cachios'
import moment from 'moment'

import coursework from '~/components/dashboard/coursework.vue'
import timetable from '~/components/dashboard/timetable.vue'
import officehours from '~/components/dashboard/officehours.vue'

export default {
  asyncData ({ app, params }) {
    const postData = {
      api: app.$cookies.get('intranet-token'),
    };

    var lang = "en"
    if(app.$cookies.get("locale") != undefined){
        lang = app.$cookies.get("locale");
    }

    return cachios.post('https://intranet.blackman.fyi/api/dashboard', postData, {
      ttl:259200,
      force:true,
    }).then((resp) => {
      return {
        timetable: resp.data.timetable,
        starting: moment().format('X'),
        coursework: resp.data.coursework,
        lang: lang,
      }
    })
    .catch(() => {
      cachios.post('https://intranet.blackman.fyi/api/dashboard', postData, {
        ttl:259200,
      }).then((resp) => {
        return {
          timetable: resp.data.timetable,
          starting: moment().format('X'),
          coursework: resp.data.coursework,
          lang: lang,
        }
      })
    })
  },
  middleware: 'auth',
  components: {
    'coursework': coursework,
    'timetable': timetable,
    'office-hours': officehours
  }
}
</script>

<style>

</style>
