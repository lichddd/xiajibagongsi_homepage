<template>
<div class="upload">

<el-upload
action="admin/upload"
ref="upload"
:on-preview="handlePreview"
:on-remove="handleRemove"
:file-list="fileList"
:auto-upload="false"
:on-success="()=>{this.search();}"
:on-change="handleChange"
drag
multiple
list-type="text"
class="uploader"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text" v-html="language.uploads.upload_text"></div>
  <el-button style="margin-left: 10px;" size="small" type="success" @click.stop="$refs.upload.submit();">上传到服务器</el-button>
  <div class="el-upload__tip" slot="tip">
    {{language.getLanguage(language.uploads.upload_hint,[$disksize(maxSize),$disksize(allSize)])}}
  </div>
</el-upload>

<!-- <ul>
  <img v-for="img in uploadedlist" @click="del(img)" :src="`http://localhost:8081/${img.name}`"></img>
</ul> -->
<div class="images">

<el-card class="card" v-for="(o, index) in uploadedlist" :body-style="{ padding: '0px' ,width:'100%',height:'100%'}">
      <el-tooltip content="使用图片请右键复制图片地址">
      <a target="_blank" :href="`${$config.host_pre_url+o.name}`"><img :src="`${$config.host_pre_url+o.name}`" class="image"></a>
      </el-tooltip>
      <el-tooltip content="删除">
      <i class="el-icon-delete delete"  @click="del(o)"></i>
      </el-tooltip>
</el-card>

</div>
</div>
</template>
<style scoped>
.upload{
  min-height: 100%;

}
.uploader
{
  width: 400px;
  display: inline-block;
  float: left;
}
.delete
{
  color: #8492a6;
  font-size: 1.5em;
  text-shadow: #fff 0px 0px 2px;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover .delete
{
  opacity: 1;
}
.delete:hover
{
  color: #aaaaaa;


}
.images
{
  width: calc(100% - 410px);
      display: inline-block;
  text-align: left;
  min-height: 100%;
  border-left: solid 1px #dddddd;
}
.card
{
  width: 200px;
  height: 200px;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
    position: relative;
}
.image
{
  width: 100%;
  height:  100%;

}
</style>
<script>
  export default {
    mounted(){
      this.search();


    }
    ,
    data() {
      return {
        uploadedlist:[],
        fileList: [],
        maxSize:0,
        allSize:0,
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      search(){
        axios.get('admin/uploads').then(m => {
          this.uploadedlist=m.data.list;
          this.allSize=m.data.allsize;
          this.maxSize=m.data.maxsize;
        });
      }
      ,
      del(f){
        axios.delete(`admin/deluploaded/${f.name}`).then(m => {
          this.search();
        });
      },
      handleChange(file, fileList) {
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].status=="ready"&&(this.checkType(fileList[i].name)||fileList[i].size>5*1024*1024)) {
            this.$message({type:"error",message:`选择的文件${fileList[i].name}不符，已从队列中移除`});
            fileList.splice(i,1);
            i--;
          }
        }

      },
      checkType(name){
        if (name.split(".").length<=1) {
          return true;
        }
        else
        {
          let type=name.split(".")[name.split(".").length-1].toLocaleLowerCase();
          if (type!="png"&&type!="jpeg"&&type!="jpg"&&type!="bmp") {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>
