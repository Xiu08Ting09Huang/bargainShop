<template>
  <div id="app">
     <!-- <mt-header fixed :title="title" >
            <mt-button @click="$router.go(-1)" slot="left" icon="back" v-if="$route.path == '/shop/home' ? false : true "></mt-button>
     </mt-header> -->
    <router-view/>
  </div>
</template>

<script>
import slide from "@/components/common/slide.js"
export default {
  name: 'App',
  data(){
    return {
      title:'',
      show:false
    }
  },
  methods: {
    getToken(){
      
    }
  },
  watch: {
    $route() {
      if(this.$route.path=='/shop/home'){
      this.title = '商家名称'
      document.title = '商家名称'
      this.show = true
    } else if (this.$route.path == "/shop/orderList"){
      this.title = '订单列表'
      document.title = '订单列表'
      this.show = true
    }  else if (this.$route.path == '/shop/goodsList' ){
      this.title = '商品列表'
      document.title = '商品列表'
      this.show = true
    } else if (this.$route.path == '/shop/successCode'){
      document.title = '核销完成'
    }else if (this.$route.path == '/shop/failCode'){
      document.title = '核销失败'
    }
    }
  },
  created(){
    // console.log(this.$route.path.slice(1,8))
    if(this.$route.path=='/shop/home'){
      this.title = '商家名称'
      document.title = '商家名称'
      this.show = true
    }  else if (this.$route.path == "/shop/orderList"){
      this.title = '订单列表'
      document.title = '订单列表'
      this.show = true
    } else if (this.$route.path == '/shop/goodsList' ){
      this.title = '商品列表'
      document.title = '商品列表'
      this.show = true
    } else if (this.$route.path == '/shop/successCode'){
      document.title = '核销完成'
    }else if (this.$route.path == '/shop/failCode'){
      document.title = '核销失败'
    }
  },
   mounted(){
    this.getRem(750, 100)
  },
  created(){
     slide()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* max-width: 750px; */
  background-color: #f4f4f4;
  height: 100%;
  margin: 0 auto;
}

*{
  margin: 0;
  padding: 0;
}
body,html{
  height: 100%;
}

body{
  line-height: normal;
}
.mui-bar-tab .mui-tab-item-cx.mui-active {
  color: #ff3740;
}
.mint-header{
  background-color: #fff;
  color: #333;
  font-size: .5rem;
  height: 1.4rem;
  line-height: 1.4rem;
}
.mint-header.is-fixed{
  z-index: 666;
}
.mintui{
  font-size: .32rem;
}
.mui-bar-tab .mui-tab-item-cx .mui-icon{
  top: .14rem;
  width: .44rem;
  height: .44rem;
  padding-top: 0;
  padding-bottom: 0;
}
.mint-header-button.is-left{
  line-height: 1.4rem;
}
.mint-header .mint-button{
  height: 1.4rem;
  line-height: 1.4rem;
}
.mui-bar-tab .mui-tab-item-cx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: .98rem;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}


.mui-bar-tab .mui-tab-item-cx .mui-icon ~ .mui-tab-label {
    font-size: .22rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-tab-label{
  margin-top: .12rem;
}
.mui-bar .mui-icon{
  font-size: .48rem
}
</style>
