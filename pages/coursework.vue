<template lang="html">
  <div class="container-fluid">
    <b-row class="mt-5 pl-3 pr-3">
      <h3 class="cards-title">{{ $t('coursework.upcoming') }} <small class="text-muted">{{ $t('coursework.lastupdated') }} {{ convertTimestamp(lastUpdated) }}</small></h3>
      <b-col md="4" class="mt-3" v-for="cw in curCoursework"   v-bind:key="cw.key">
        <b-card :title="title(cw.module, cw.title)" :sub-title="cw.deadline">
          <b-card-text>Feedback by {{ cw.feedback }}</b-card-text>
          <a href="#" class="card-link" v-on:click="remind(cw)" v-b-modal.notify-modal>Remind Me</a>
        </b-card>
      </b-col>

      <h3 class="cards-title mt-4">{{ $t('coursework.past') }}</h3>

      <b-col md="4" class="mt-3" v-for="cw in oldCoursework" v-bind:key="cw.key">
        <b-card :title="title(cw.module, cw.title)" :sub-title="cw.deadline">
          <b-card-text>Feedback by {{ cw.feedback }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="notify-modal" :title="title(cw.module, cw.title)" v-if="cw != null" @ok="notify(cw, selected)">
      <p class="my-4">When to remind you?</p>
      <b-form-radio-group
        v-model="selected"
        :options="options"
        name="radios-stacked"
        stacked
      ></b-form-radio-group>
    </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'
import cachios from 'cachios'

export default {
  asyncData ({ app, params }) {
      return cachios.post('https://intranet.blackman.fyi/api/coursework/year', {
          api: app.$cookies.get('intranet-token'),
          lang: app.$cookies.get('locale'),
        },
        {
          ttl:259200,
          force:true,
        })
        .then((res) => {
          return {
            lastUpdated: res.data.time,
            curCoursework: res.data.curCoursework,
            oldCoursework: res.data.oldCoursework,

          }
      })
      .catch(() => {
        cachios.post('https://intranet.blackman.fyi/api/coursework/year', {
            api: app.$cookies.get('intranet-token'),
            lang: app.$cookies.get('locale'),
          },
          {
            ttl:259200,
          })
          .then((res) => {
            return {
              lastUpdated: res.data.time,
              curCoursework: res.data.curCoursework,
              oldCoursework: res.data.oldCoursework,
            }
        })
      })
    },
    middleware: 'auth',
    data(){
      return{
        cw: null,
        selected: 'Due in 2 Weeks',
        options: [
          { text: '1 Day', value: 'Due in 1 Day' },
          { text: '7 Days ', value: 'Due in 7 Days' },
          { text: '2 Weeks', value: 'Due in 2 Weeks' },
          { text: '1 Month', value: 'Due in 1 Month' }
        ]

      }
    },
    methods:{
      title(moduleCode, title){
        if(title == ""){
          return moduleCode
        } else {
          return moduleCode + ' - ' + title;
        }
      },
      convertTimestamp(timestamp){
        return moment.unix(timestamp).format('DD/MM/YY');
      },
      remind(cw){
        this.cw = cw
      },
      notify(cw, when){
        axios.post('https://intranet.blackman.fyi/api/notify', {
            title: this.title(cw.module, cw.title),
            body: when,
            timestamp: moment().utc().format('X'),
            recipient: this.$cookies.get('intranet-notification'),
          })
      }
    }
}
</script>

<style lang="css" scoped>
.cards-title{
  font-family:cosmos;
  border-bottom: 2px solid #cad400;
  color: #242f60;
  padding-bottom: 10px;
  display:block;
  width:100%;
}

</style>
