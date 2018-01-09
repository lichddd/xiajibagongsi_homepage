<template>
<div id="app">
  <h1>非常瞎的鸡巴公司超级首页</h1>


  <news></news>
  <cheat></cheat>
</div>
</template>

<script>
import cheat from '@/views/cheat'
import news from '@/views/news'
export default {
  name: 'app',
  components: {
    cheat,
    news,
  },
}
</script>
<style scoped>
  h1{

    font-size: 36px;

  }

</style>
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
