<template>
  <div class="hello">
    <div class="top">
      <!-- <router-link to="mp.baibu.com" class="join">进入</router-link> -->
      <span  class="join"  >进入</span>
    </div>
  <div class="butttom">
      <iframe src="https://www.baidu.com/" class="look" width="100%" height="100%">关注</iframe>
    </div>
  </div>
</template>

<script>
import '../assets/vue-href-master/src/vue-href.js'
export default {
  name: 'HelloWorld',
  goBaidu(e){
      window.location.href = e
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  height: 100%;
}
.top{
  height: 50%;
  border-bottom: 1px solid #666;
  position: relative;
}
.butttom{
  height: 50%;
   position: relative;
}
.join{
  bottom: 20px;
   position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 10px;
}
.look{
  top: 50px;
   position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 10px;
}
</style>
