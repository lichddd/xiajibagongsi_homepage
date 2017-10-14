<template>
  <div class="pre-html" :class="{'show':htmlshow}">
    <div class="html-show-btn" @click="htmlshow=!htmlshow">

      <span class="btn-icon" :class="{'el-icon-arrow-left':!htmlshow,'el-icon-arrow-right':htmlshow,'show':htmlshow}"></span>
      <span class="btn-text" :class="{'show':htmlshow}">{{(htmlshow?'返回':'预览')}}</span>
    </div>

    <div class="content" v-html="content"></div>
  </div>

</template>

<script>
export default {
  mounted(){ },
  props:{
    content:{
      type:String,
      default:"",
    }
    ,
    htmlshow:{
      type:Boolean,
      default:false,
    }
  },
  data () {
    return {
    }
  }
  ,
  methods:{

  },
  watch:{
    htmlshow(newValue){
      this.$emit('update:htmlshow', newValue);


    }
  }
  ,
  beforeDestroy(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pre-html
  {
    text-align: left;
    width: 0px;
    background-color: #fefefe;
    position: fixed;
    top: 0;
    bottom:0;
    right: 0px;
    z-index: 20000;

    overflow: scroll;
  }
  .pre-html.show
  {
    width: 100%;
padding: 10px;
  }
  .pre-html > .content
  {
    display:none;

  }
  .pre-html.show > .content
  {
    display:block;

  }
  .pre-html .html-show-btn
  {
    cursor: pointer;
    position: fixed;
    top: 50%;
    right:-1px;
    border: solid 1px #cccccc;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .pre-html.show .html-show-btn
  {
    right: auto;
    left:-1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  .pre-html .html-show-btn .btn-text
  {
    width: 15px;
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    font-size: 10px;
  }
  .pre-html .html-show-btn .btn-icon
  {
    width: 20px;
    display: inline-block;
    font-size: 21px;
    position: relative;
    top: -5px;

  }
  .pre-html.show .html-show-btn .btn-text
  {
    float: left;

  }
  .pre-html.show .html-show-btn .btn-icon
  {
    top: 5px;

  }
</style>
