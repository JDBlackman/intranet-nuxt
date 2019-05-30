<template>
  <section class="container-fluid pb-5">
    <div>
      <b-row class="mt-5">
        <b-col lg="12">
          <transition name="fade">
            <div v-if="timetable != null">
              <div class="cards-title d-flex bd-highlight">
                <div class="float-left arrow" v-on:click="prevWeek">
                  <span class="fa-stack fa-1x">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fas fa-arrow-left fa-stack-1x fa-inverse"></i>
                  </span>
                </div>
                <div class="flex-grow-1">
                    <div class="calendar-box p-3 mx-auto">
                      <i class="fa fa-calendar-week mr-1"></i>

                      <span v-if="updated != null">
                         {{ convertTimestampWeek(starting) }}
                      </span>
                    </div>
                </div>
                <div class="float-right arrow" v-on:click="nextWeek">
                  <span class="fa-stack fa-1x">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fas fa-arrow-right fa-stack-1x fa-inverse"></i>
                  </span>
                </div>
              </div>

              <div class="filter d-flex d-flex justify-content-center flex-wrap p-3">
                <b-badge pill variant="primary" class="swansea-badge m-2" v-bind:class="{ 'filter-unselect': filter.lecture }" v-on:click="toggleLecture">{{ $t('timetable.lectures') }}</b-badge>
                <b-badge pill variant="primary" class="swansea-badge m-2" v-bind:class="{ 'filter-unselect': filter.lab }" v-on:click="toggleLab">{{ $t('timetable.practical') }}</b-badge>
                <b-badge pill variant="primary" class="swansea-badge m-2" v-bind:class="{ 'filter-unselect': filter.workshop }"  v-on:click="toggleWorkshop">{{ $t('timetable.workshops') }}</b-badge>
                <b-badge pill variant="primary" class="swansea-badge m-2" v-bind:class="{ 'filter-unselect': filter.support }"  v-on:click="toggleSupport">{{ $t('timetable.support') }}</b-badge>
              </div>

              <div class="d-none d-lg-block d-xl-block">
                <b-row>
                  <b-col cols="1" lg="1">
                    <div class="time-row">09:00</div>
                    <div class="time-row">10:00</div>
                    <div class="time-row">11:00</div>
                    <div class="time-row">12:00</div>
                    <div class="time-row">13:00</div>
                    <div class="time-row">14:00</div>
                    <div class="time-row">15:00</div>
                    <div class="time-row">16:00</div>
                    <div class="time-row">17:00</div>
                  </b-col>

                  <b-col cols="10" lg="2" v-for="(day, key) in timetable" :key="key">
                    <div class="day-header">{{ convertTimestampDay(key) }}</div>
                      <div class="day-slot" v-for="n in 9">
                        <div class="slot" v-if="timetable[key][n-1] != undefined && !isFiltered(timetable[key][n-1].type)">
                          <div class="d-block"><span class="module">{{ timetable[key][n-1].module }}</span> </div>
                          {{ timetable[key][n-1].location }}
                        </div>
                      </div>
                  </b-col>
                </b-row>
              </div>


              <div class="d-lg-none d-xl-none">
                <b-row v-for="(day, key) in timetable" :key="key">
                  <b-col cols="12">
                    <div class="day-header-mobile">{{ convertTimestampDay(key) }}</div>
                  </b-col>
                  <b-col cols="2" lg="2">
                	<div class="time-row">09:00</div>
                	<div class="time-row">10:00</div>
                	<div class="time-row">11:00</div>
                	<div class="time-row">12:00</div>
                	<div class="time-row">13:00</div>
                	<div class="time-row">14:00</div>
                	<div class="time-row">15:00</div>
                	<div class="time-row">16:00</div>
                	<div class="time-row">17:00</div>
                  </b-col>
                  <b-col cols="10" lg="10" class="mt-3">
                	<div class="day-slot" v-for="n in 9">
                    <!-- && isFiltered(timetable[key][n-1].type) -->
                	  <div class="slot" v-if="timetable[key][n-1] != undefined && !isFiltered(timetable[key][n-1].type)">
                		<div class="d-block"><span class="module">{{ timetable[key][n-1].module }}</span> </div>
                		{{ timetable[key][n-1].location }}
                	  </div>
                	</div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </transition>
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import cachios from 'cachios'
import moment from 'moment';
import 'moment/locale/cy'


export default {
  asyncData ({ app, params }) {
    let week = moment().startOf('day').format('X');

    return cachios.post('https://intranet.blackman.fyi/api/timetable/week', {
        api: app.$cookies.get('intranet-token'),
        week: week
      },
      {
        ttl: 259200,
        force: true
      })
      .then((res) => {
        return {
          timetable: res.data.timetable,
          starting: res.data.starting,
          updated: res.data.updated,
          week: week,
          api: app.$cookies.get('intranet-token')
        }
      })
      .catch(() => {
        cachios.post('https://intranet.blackman.fyi/api/timetable/week', {
            api: app.$cookies.get('intranet-token'),
            week: week
          },
          {
            ttl: 259200,
          })
          .then((res) => {
            return {
              timetable: res.data.timetable,
              starting: res.data.starting,
              updated: res.data.updated,
              week: week,
              api: app.$cookies.get('intranet-token')
            }
          })
      });
  },
  middleware: 'auth',
  data(){
    return {
      lang: "en",
      filter:{
        lecture: false,
        lab: false,
        workshop: false,
        support: false,
      }
    }
  },
  mounted() {

    if(this.$cookies.get("locale") != undefined){
        this.lang = this.$cookies.get("locale");
    }

    moment.locale(this.lang)
    this.$forceUpdate();

    this.$bus.$on('language', () => {
      this.lang = this.$store.state.locale;
      moment.locale(this.lang);
      this.$forceUpdate();
    })
  },
  methods: {
    convertTimestampDay(timestamp){
      return moment.unix(timestamp).format('ddd Do MMMM');
    },
    convertTimestampWeek(timestamp){
      return moment.unix(timestamp).format('dddd Do MMMM');
    },
    nextWeek(){
      this.week = moment.unix(this.week).add(7,'days').format('X');
      axios.post('https://intranet.blackman.fyi/api/timetable/week', {
        api: this.api,
        date: this.week,
      })
      .then((res) => {
        this.timetable = res.data.timetable
        this.starting = res.data.starting
      })
    },
    prevWeek(){
      this.week = moment.unix(this.week).subtract(7,'days').format('X');
      axios.post('https://intranet.blackman.fyi/api/timetable/week', {
        api: this.api,
        date: this.week,
      })
      .then((res) => {
        this.timetable = res.data.timetable
        this.starting = res.data.starting
      })
    },
    toggleLecture(){
      this.filter.lecture = !this.filter.lecture
    },
    toggleWorkshop(){
      this.filter.workshop = !this.filter.workshop
    },
    toggleLab(){
      this.filter.lab = !this.filter.lab
    },
    toggleSupport(){
      this.filter.support = !this.filter.support
    },
    isFiltered(filter){
        if(filter == "Lecture"){
          return this.filter.lecture;
        } else if(filter == "Practical (PC Lab)"){
          return this.filter.lab;
        } else if(filter == "Workshop") {
          return this.filter.workshop;
        } else if(filter == "Support Classes") {
          return this.filter.support;
        }
    },
  },
  computed: {
    filtered: function () {
      return this.timetable
    }
  },
}

</script>

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="css" scoped>
.cards-title{
  font-family:cosmos;
  border-bottom: 2px solid #cad400;
  color: #242f60;
  padding-bottom: 10px;
  text-align:center;
  font-size:1.4em;
}

.card{
  border-radius: 0;
}

.day-header{
  font-family: 'futura-pt-bold', Tahoma, sans-serif;
  color: #242f60;
  font-size:1.3em;
  text-align:center;
}

.day-header-mobile{
  font-family: 'futura-pt-bold', Tahoma, sans-serif;
  color: #242f60;
  font-size:1.6em;
  border-bottom:2px solid #cad400;
  text-align:center;
}

.day-slot{
  height:100px;
  margin:10px 0px;
  color:white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.slot{
  background: rgb(36, 47, 96);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.17), inset 0 0 0 0px rgba(0, 0, 0, 0.23);
  height:100%;
  padding:5px;
  text-align:center;
}

.day-row{
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.module{
  font-weight:700;
}

.time-row{
  font-family: 'futura-pt-bold', Tahoma, sans-serif;
  color: #242f60;
  height:110px;
  line-height: 100px;
  text-align:center;
}

.time-row:first-child{
  margin-top:25px;
}

.filter{
  font-size:1.2em;
}

.swansea-badge{
  font-size:1em;
  background-color:#242f60;
  border:2px solid #242f60;
  cursor:pointer;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

.filter-unselect {
  font-size:1em;
  background-color:white !important;
  border:2px solid #242f60;
  color:#242f60;
  cursor:pointer;
}

.arrow{
  cursor:pointer;
}

.calendar-box{
  background-color:#242f60;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.17), inset 0 0 0 0px rgba(0, 0, 0, 0.23);
  color:white;
  max-width:275px;
  cursor:pointer;
  border-radius: 10rem;

}
</style>
