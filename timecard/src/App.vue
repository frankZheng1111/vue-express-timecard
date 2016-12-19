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
          router-link(to="/timecards") 时间轴
  .container
    .col-sm-3
    .col-sm-9
      router-view
</template>

<script>
</script>

<style>
</style>
