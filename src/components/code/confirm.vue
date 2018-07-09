<template>
    <div class="success">
        <div class="code-btn" @click="getConfirm" >确认核销</div>
      
  <div class="home-btn" @click="$router.push('/shop/home')">返回主页</div>
    </div>
</template>
<script>
import { verificationCode } from 'api/http'
export default {
    methods:{
        getConfirm(){
            verificationCode({
              orderNo:window.location.hash.split('=')[1],
              shopId:localStorage.getItem('shopId')
            // orderNo : '324896f1536c4c0e1530158621',
            // shopId:1
            }).then(res =>{
            //   alert(res)
              console.log(res)
              if(res.data.code == 200){
                  sessionStorage.setItem('goodsImg',JSON.stringify(res.data.data.goodsImage))
                  sessionStorage.setItem('createdAt',res.data.data.createdAt)
                  sessionStorage.setItem('goodsName',res.data.data.goodsName)
                this.$router.push('/shop/successCode')
              } else  {
                this.$router.push('/shop/failCode/' + res.data.code)
              }
            })
        }
    },
    mounted(){
        this.getRem(750,100)
    },
    created(){
        // console.log(window.location.hash.split('=')[1])
    }   
}
</script>

<style rel="stylesheet/scss" lang="scss" scpoed>
    .success{
        background-color: #fff;
        overflow: hidden;
        padding-top: 2rem;
        height: 100%;
    }
   
    .code-btn,
    .home-btn{
        width: 5rem;
        height: .88rem;
        border-radius: .1rem;
        color: #fff;
        margin: 0 auto;
        line-height: .88rem;
        font-size: .3rem;
    }
    .code-btn{
        // padding-top: 2rem;
        background-color: #5b79fb;
    }
    .home-btn{
        background-color: #ff7e71;
        margin-top: .26rem;
        margin-bottom: 2rem;
    }
</style>
