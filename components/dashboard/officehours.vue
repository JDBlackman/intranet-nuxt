<template lang="html">
  <transition name="fade">
    <div>
      <div class="mt-4">
        <h3 class="cards-title">Office Hours</h3>
        <b-card title="Stewart Powell" sub-title="Computational Foundary 415">
          <b-card-text>Monday 16:00 - 17:00</b-card-text>
          <b-card-text>Friday 11:00 - 12:00</b-card-text>
        </b-card>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
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
