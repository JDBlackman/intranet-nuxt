<template lang="html">
  <div class="container-fluid">
    <b-row class="mt-5 pl-3 pr-3">
      <h3 class="cards-title ml-3 mr-3 mb-3">{{ $t('directory.staffdirectory') }}</h3>
      <b-input-group prepend="" class="mb-2 ml-3 mr-3 mb-sm-0">
        <b-input id="search" :placeholder="$t('directory.search')" class="search-input" v-model="search"></b-input>
      </b-input-group>
      <b-col md="3" class="mt-3" v-for="office in filteredList">
        <b-card :title="office.lecturer" :sub-title="office.building" class="h-100">
          <b-card-text v-for="time in office.times">{{ time.day }} {{ time.hours }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment';
import cachios from 'cachios'

export default {
  asyncData ({ app, params }) {
      return cachios.post('https://intranet.blackman.fyi/api/directory', {
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
            hours: res.data.hours,
          }
      })
      .catch(() => {
        cachios.post('https://intranet.blackman.fyi/api/directory', {
            api: app.$cookies.get('intranet-token'),
            lang: app.$cookies.get('locale'),
          },
          {
            ttl:259200,
          })
          .then((res) => {
            return {
              lastUpdated: res.data.time,
              hours: res.data.hours,
            }
        })
      })
    },
    middleware: 'auth',
    data(){
      return{
        search: ''
      }
    },
    methods:{
    },
    computed:{
      filteredList() {

       return this.hours.filter(hour => {
         var vm = this;
         return hour.lecturer.toLowerCase().includes(vm.search.toLowerCase())
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

.search-input{
  height:50px;
  font-size:24px;
  border: 1px solid #242f60 !important;
  border-radius:0px;
  color:rgb(81, 80, 81);
  font-family:cosmos;
}

</style>
