<template>
<div id="app">
  瞎鸡巴公司首页
  <cheat></cheat>
</div>
</template>

<script>
import cheat from '@/views/cheat'
export default {
  name: 'app',
  components: {
    cheat
  },
}
</script>

<style>



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  /*min-width: 1000px;*/
  font-size: 16px;
}

</style>
