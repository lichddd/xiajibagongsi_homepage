<template>
  <div class="cheat"  :class="{'show':show,'hide':(!show)}" @click="hasnew=false;">
      <h2 v-if="list&&!list.length>0">没有消息</h2>
      <div class="el-tabs-margin-right">
        <div
          v-for="(l, index) in list"
          :key="l.source"
          :label="l.source"
          :name="l.source"
          @click.native="l.hasnew=0;"
          >
          <span slot="label">
            <!-- <el-badge class="tab-title-badge" :value="l.hasnew" :max="9" @click.native="l.hasnew=0;"> -->
              <span>{{l.source}}</span>
            <!-- </el-badge> -->
          </span>
          <div class="msgcontiner">
          <div class="msgcontinerinner">
          <div v-for="(m,inx) in l.msg" class="msg" :class="{'mymsg':m.my}">
            <span v-if="m.time&&(!l.msg[inx-1]||(l.msg[inx-1]&&(l.msg[inx].time!=l.msg[inx-1].time)))" class="time">
              <span>
              {{m.time}}
            </span>
            </span>
            <div>
              <span>{{m.text}}</span>
            </div>
          </div>

        </div>
        </div>
          <input v-model="l.str" style="width:calc(100% - 65px);display:inline-block;" @keydown.native.enter="sendMsg(l)"></input>
          <button @click="sendMsg(l)" style="width:60px;display:inline-block;">发送</button>
        </div>
      </div>
      <div :is-dot="hasnew&&!show" class="iconpic icon" :class="{'el-icon-message':(!show),'el-icon-close':show}" @click="show=!show"></div>
  </div>
</template>
<script>
import crypto from 'crypto'
export default {
  name: 'login',
  components:{},
  mounted(){
    this.username=crypto.createHash('md5').update((new Date()).getTime().toString()).digest('hex');
    this.getMsg();
  },
  data () {
    return {
      hasnew:false,
      show:false,
      username:"",
      list:[{source:"admin",hasnew:0,msg:[],str:""}],
    }
  }
  ,
  methods:{
    getMsg(lastID){
      axios.get('homepage/getMsg',{params:{name:this.username,lastID:lastID||''}}).then(m => {
        console.log(m.data);
        if(m.data.msg&&m.data.msg.list)
        {
          m.data.msg.list.forEach((l)=>{
            let arr=this.list.filter((m)=>{
              return m.source==l.source;
            });
            if (arr&&arr.length>0) {
              arr[0].msg.push(l.data);
              arr[0].hasnew+=1;
              this.hasnew=true;
              this.setScroll();
            }
            else
            {
              this.list.push({source:l.source,hasnew:1,msg:[l.data],str:""});
              this.hasnew=true;
              this.setScroll();
            }
          });
          console.log(this.list);
          this.getMsg(m.data.msg.lastID);

        }
      })
      .catch(m=>{
        this.$nextTick(()=>{
          // this.$message({showClose:true,message:"消息服务连接失败,5秒后重连",type:"error"});
        })
        setTimeout(()=>{
          this.getMsg();
        },5000);
      });

    }
    ,
    sendMsg(data){
      if (!data.str) {
        return;
      }
      let str=data.str;
      data.str="";
      axios.post('homepage/sendMsg',{
        body:str,
        target:data.source,
        source:this.username
      }).then(m => {
        let arr=this.list.filter((m)=>{
          return m.source==data.source;
        });
        if (arr&&arr.length>0) {
          arr[0].msg.push({text:str,my:true});
          this.setScroll();
        }
        else
        {
          this.list.push({source:data.source,msg:[{text:str,my:true}],str:""});
          this.setScroll();
        }
      })
      .catch(m=>{
      });

    },
    removeMsg(source){
      this.list=this.list.filter((m)=>{
        return m.source!=source;
      });

    },
    setScroll()
    {
      this.$nextTick(()=>{

        let arr=this.$el.getElementsByClassName("msgcontiner");
        for (var i = 0; i < arr.length; i++) {
          arr[i].scrollTop=arr[i].getElementsByClassName("msgcontinerinner")[0].clientHeight;
        }


      });



    }

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
.cheat{
  position: absolute;
  right: 0px;
  top: 0px;
  border: solid 1px #888888;
  transition: width 0.5s,height 0.5s,border-radius 0.5s;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
}
.cheat.hide{
  width: 42px;
  height: 42px;
  border-radius: 20px;
}
.cheat.show{
  width: 640px;
  height: 360px;
  border-radius: 5px;
}
.cheat.hide .el-tabs
{
  display: none;
}
.cheat.hide h2
{
  display: none;
}
.iconpic
{
  width: 35px;
  height: 35px;
  color: #22b2ef;
  font-size: 24px;
  line-height: 1.5;
  position: absolute;
  top: -7px;
  right: -5px;
}
.icon
{
  position: absolute;
  top: 10px;
  right: 7px;
  cursor: pointer;
}
.msgcontiner
{
  width: 100%;
  height: 280px;
  margin-top: -15px;
  overflow-y: scroll;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.msgcontiner .msg
{
  text-align: left;
  margin-top: 10px;
}
.msgcontiner .msg .time
{
  width: 100%;
display: inline-block;
text-align: center;
}
.msgcontiner .msg .time span
{
  font-size: 8px;
border-radius: 20px;
background: #eaeaea;
padding-left: 5px;
padding-right: 5px;
}
.msgcontiner .msg>div
{
  background: rgba(82, 145, 255, 0.2);
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  max-width: 100%;
  position: relative;
}
.msgcontiner .msg>div::before
{
  content: '';
  border-left:solid 0px rgba(82, 145, 255, 0.2);
  border-top:solid 5px rgba(82, 145, 255, 0);
  border-bottom:solid 5px rgba(82, 145, 255, 0);
  border-right:solid 5px rgba(82, 145, 255, 0.2);
  width: 0px;
  height: 0px;
  display: inline-block;
  position: absolute;
  top: 4px;
  left:-5px;
}
.msgcontiner .msg>div>span
{
  word-wrap: break-word;
}
.msgcontiner .msg.mymsg
{
  text-align: right;
}
.msgcontiner .msg.mymsg>div
{
  background: rgba(116, 255, 82, 0.2);
}
.msgcontiner .msg.mymsg>div::before
{
  border-left:solid 5px rgba(116, 255, 82, 0.2);
  border-top:solid 5px rgba(116, 255, 82, 0);
  border-bottom:solid 5px rgba(116, 255, 82, 0);
  border-right:solid 0px rgba(116, 255, 82, 0.2);
  right:-5px;
  left:inherit;
}
</style>
