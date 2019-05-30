<template lang="html">
  <div>
    <transition name="fade">

      <div v-if="timetable != null" class="d-none d-lg-block d-xl-block">
        <h3 class="cards-title">{{ $t('dashboard.timetable')}}<span> - {{ $t('dashboard.weekbeginning')}} {{ convertTimestampWeek(starting) }}</span></h3>
        <b-row>
          <b-col cols="2" lg="1">
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
              <div v-if="timetable[key][n-1] != undefined">
                <div class="slot">
                  <div class="d-block"><span class="module">{{ timetable[key][n-1].module }}</span> </div>
                  {{ timetable[key][n-1].location }}
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </transition>

    <transition name="fade">

      <div v-if="timetable != null" class="d-lg-none d-xl-none">
        <h3 class="cards-title">{{ $t('dashboard.timetable')}}<span> - {{ $t('dashboard.weekbeginning')}} {{ convertTimestampWeek(starting) }}</span></h3>
        <b-row>
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

          <b-col cols="10" lg="10">
              <div class="day-header">{{ convertTimestampDay(today) }}</div>
              <div class="day-slot" v-for="n in 9">
                <div v-if="timetable[today][n-1] != undefined">
                  <div class="slot">
                    <div class="d-block"><span class="module">{{ timetable[today][n-1].module }}</span> </div>
                    {{ timetable[today][n-1].location }}
                  </div>
                </div>
              </div>
            </b-col>

        </b-row>
      </div>

    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/cy'


export default {
  props: ['timetable', 'lang', 'starting'],
  data(){
    return {
      today: moment().utc().startOf('day').format('X')
    }
  },
  created() {
    moment.locale(this.lang)
    this.today = moment().utc().startOf('day').format('X')

    this.$bus.$on('language', () => {
      this.lang = this.$store.state.locale;
      moment.locale(this.lang);
    })
  },
  methods: {
    convertTimestampDay(timestamp){
      return moment.unix(timestamp).format('ddd Do MMMM');
    },
    convertTimestampWeek(timestamp){
      return moment.unix(timestamp).format('Do MMMM YYYY');
    },
  },
  //
}
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
}

.card{
  border-radius: 0;
}

.day-header{
  font-family: 'futura-pt-bold', Tahoma, sans-serif;
  color: #242f60;
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
</style>
