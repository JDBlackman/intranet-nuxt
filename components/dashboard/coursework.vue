<template lang="html">
  <div v-if="coursework != null">
      <h3 class="cards-title">{{ $t('dashboard.upcoming') }}</h3>
      <b-card class="mt-3" :title="title(cw.module, cw.title)" :sub-title="cw.deadline" v-for="cw in coursework"  v-bind:key="cw.key">
        <b-card-text>{{ cw.feedback }}</b-card-text>
      </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['coursework'],
  methods:{
    title(moduleCode, title){
      if(title == ""){
        return moduleCode
      } else {
        return moduleCode + ' - ' + title;
      }
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
}

.card{
  border-radius: 0;
}
</style>
