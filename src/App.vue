<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    var ww = document.documentElement.clientWidth || document.body.clientWidth;
    var hh = document.documentElement.clientHeight || document.body.clientHeight;
    console.log('ww: ' + ww + '; hh:' + hh)
    $("#app").css({
      width: ww,
      height: hh
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
