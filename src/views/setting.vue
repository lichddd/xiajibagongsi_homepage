<template>
<div class="login">
  <el-form class="form" label-width="100px">
    <el-form-item label="管理中心语言" prop="user">
      <el-select v-model="selectLanguage">
        <el-option v-for="item in [{value:'zh-CN',label:'简体中文'},{value:'en',label:'Englist'}]" :key="item.value" :value="item.value" :label="item.label">
        </el-option>


      </el-select>
    </el-form-item>

  </el-form>
  <el-button @click="msgTest()">测试消息系统</el-button>

</div>
</template>

<script>
import cookie from '@/util/cookie'
import crypto from 'crypto'
export default {
  name: 'login',
  components: {},
  mounted() {



  },
  data() {
    return {
      selectLanguage: cookie.getCookie('language'),
    }
  },
  methods: {
    msgTest() {
      for (var i = 0; i < 9; i++) {
        let name = "用户"+i;
        setTimeout(()=>{
          for (var j = 0; j < 9; j++) {

            axios.post('admin/sendMsg', {
                body: "消息"+j,
                target: "admin",
                source: name
              }).then(m => {

              }).catch(m => {});

          }

        },100);

      }
    }
  },
  beforeDestroy() {},
  watch: {
    selectLanguage() {
      cookie.setCookie('language', this.selectLanguage);
      window.location.reload();


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  width: 400px;
  margin: 12% auto;
}

.el-select {

  width: 100%;
}
</style>
