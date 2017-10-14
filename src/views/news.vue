<template>
  <div class="news">
    <el-input placeholder="请输入关键字" v-model="searchStr" style="width:200px;" :icon="searchStr?'circle-cross':''" :on-icon-click="()=>{searchStr='';}"></el-input>
    <el-button @click="search()">查询</el-button>
    <el-button @click="addnews()">新增</el-button>
    <div v-if="list.length<=0" style="text-align:center;font-size:36px;">暂无数据</div>
    <div class="list">
      <el-card class="box-card news-item" v-for="li in list" :body-style="{ padding: '5px' }">
        <h4>{{li.title}}</h4>
        <el-tooltip :content="changeSortObj?(changeSortObj.id==li.id?'已选择了这条':'点击换位'):'调整顺序'">
        <span class="news-btn el-icon-d-caret" :class="{'changesorting':(changeSortObj&&changeSortObj.id!=li.id),'changesortingfrom':(changeSortObj&&changeSortObj.id==li.id)}"  @click="changesort(li)"></span>
        </el-tooltip>
        <el-tooltip content="预览">
        <span class="news-btn el-icon-document"  @click="preview(li)"></span>
        </el-tooltip>
        <el-tooltip content="编辑">
        <span class="news-btn el-icon-edit"  @click="editnews(li)"></span>
        </el-tooltip>
        <el-tooltip content="删除">
        <span class="news-btn el-icon-delete2"  @click="delnews(li.id)"></span>
        </el-tooltip>
      </el-card>

    </div>
    <editnews v-show="editshow" @edited="editshow=false;search()" @cancel="editshow=false;" :newsObj="newsObj" :newsID="newsID" :content="content" :title="newstitle"></editnews>
    <html_preview v-show="htmlshow" :content="newsObj.content" :htmlshow.sync="htmlshow"></html_preview>

  </div>


</template>

<script>
import editnews from './editnews'
import html_preview from '@/components/html_preview'
export default {
  name: 'hello',
  components:{editnews,html_preview},
  mounted(){
    this.search();

  },
  data () {
    return {
      searchStr:"",
      htmlshow:false,
      editshow:false,
      list:[],
      newsObj:{},
      newsID:"",
      newstitle:"",
      content:"",
      msg: 'Welcome to Your Vue.js App',
      changeSortObj:null,
    }
  }
  ,
  methods:{
    delnews(id){
              this.changeSortObj=null;
      axios.delete(`admin/delnews/${id}`).then(m => {
        this.search();



      });

    },
    changesort(li){
      if (this.changeSortObj) {
        this.changenewssort(this.changeSortObj.id,li.id,this.changeSortObj.sort,li.sort);
        this.changeSortObj=null;
        return ;
      }
      this.changeSortObj={id:li.id,sort:li.sort};
    },
    changenewssort(ida,idb,sorta,sortb){
      axios.post('admin/changenewssort',
      {ida,
       idb,
       sorta,
       sortb,}).then(m => {

        this.search();

      });

    },
    editnews(li)
    {
              this.changeSortObj=null;
this.newsObj={newsID:li.id,content:li.html,title:li.title};
      this.editshow=true;

    }
    ,

    addnews(li)
    {
              this.changeSortObj=null;
      this.newsObj={newsID:"",content:"",title:""};
      this.editshow=true;

    }
    ,
    preview(li)
    {
              this.changeSortObj=null;
      this.newsObj={newsID:li.id,content:li.html,newstitle:li.title};
      this.htmlshow=true;

    }
    ,
    search()
    {
        this.changeSortObj=null;
        axios.get('admin/getnews',{params:{keyword:this.searchStr}}).then(m => {
          this.list=m.data.news;



        });



    }
  },
  beforeDestroy(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news{
  position: relative;
  height: 100%;
  text-align: left;
}
.list{
  height: calc(100% - 40px);
  margin-top: 10px;
  padding-right: 5px;
  overflow: scroll;
}
.news-item
{
  margin:5px 0px 5px 0px;
}
.news-item h4
{
  width: calc(100% - 120px);
  display: inline-block;
  margin: 0px;
  text-overflow: ellipsis;
overflow: hidden;
margin-bottom: -6px;
white-space: nowrap;
}
.news-item .news-btn
{
  display: inline-block;
  cursor: pointer;
  font-size: 21px;
  position: relative;
  top: 2px;
  opacity: 0.2;
  transition: opacity 0.5s;
}
.news-item:hover .news-btn
{
  opacity: 1;
}
.news-item .news-btn.changesorting
{
  color: #2bb2ef;
}
.news-item .news-btn.changesortingfrom
{
  color: #81ee2b;
}
</style>
