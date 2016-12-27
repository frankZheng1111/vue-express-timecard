<template lang='jade'>
#wrapper
  nav.navbar.navbar-default
    .container
      a.navbar-brand(href="#")
        i.glyphicon.glyphicon-time
        时间卡
      ul.nav.navbar-nav
        li
          router-link(to="/home") 首页
        li
          router-link(to="/time-cards") 时间轴
  .container
    .col-sm-3
      sidebar(:time="duration")
    .col-sm-9
      router-view(v-on:deleteTime="deleteTime", v-on:timeUpdate="timeUpdate")
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'app',
  components: { sidebar: Sidebar },
  // data () {
  //   return {
  //     duration: 1.5
  //   }
  // },
  data () {
    this.$http.get('http://localhost:8888/time-full-duration')
      .then((ret) => {
        this.duration = ret.data.time
      })
      .then((err) => {
        console.log(err)
      })
  },
  methods: {
    timeUpdate (timeCard) {
      this.duration += parseFloat(timeCard.duration)
    },
    deleteTime (timeCard) {
      this.duration -= parseFloat(timeCard.duration)
    }
  }
}
</script>

<style>
</style>
