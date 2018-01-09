<template>
  <div class="news">
    <div v-for="l in list" class="new">
      <h1>{{l.title}}</h1>
      <div v-html="l.img" class="img" @click="getHtml(l.id)"></div>

    </div>
    <div class="continer" v-html="html" @click="html=''" v-show="html"></div>
  </div>
</template>
<script>
export default {
  name: 'news',
  components:{},
  mounted(){

    this.getNews();
  },
  data () {
    return {
      searchStr:"",
      list:[],
      html:'',
    }
  }
  ,
  methods:{
    getNews(lastID){

      axios.get('homepage/getTitle',{params:{keyword:this.searchStr}}).then(m => {
        this.list=m.data.news;



      });



    }
    ,
    getHtml(id){

      axios.get('homepage/getHtml',{params:{id:id}}).then(m => {
        this.html=m.data.news.html;



      });



    }
    ,
  },
  beforeDestroy(){




  }
  ,
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img{
    /*width: 120px;
    height: 60px;*/
  }
  .news{
    margin: 20px auto;
    min-width: 400px;
    width: 60%;
    position: relative;
  }
  .continer
  {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  .news .new{
    margin-bottom: 20px;

  }
</style>
