<template>
    <div class="success">
        <div class="goodsInfo">
            失败原因：{{guoqi}}
        </div>
        <!-- <div class="code-btn">返回核销</div> -->
        <div class="home-btn"  @click="$router.push('/shop/home')">返回主页</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            guoqi:''
        }
    },
    methods:{
        getCode(){
            if(this.$route.params.code == 100017){
                this.guoqi = '二维码已过期'
            } else if (this.$route.params.code == 100016){
                this.guoqi = '已核销，请勿重复操作'
            } else if (this.$route.params.code == 100018){
                this.guoqi = '不是本商店商品，请确认'
            } else if (this.$route.params.code == 10013){
                this.guoqi = '已经不存在，请确认'
            }
        }
    },
    mounted(){
        this.getRem(750,100)
    },
    created(){
        this.getCode()
        // console.log(this.$route.params.code)
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scpoed>
    .success{
        margin-top: .22rem;
        background-color: #fff;
        overflow: hidden;
    }
    .goodsInfo{
        position: relative;
        height: 2.37rem;
        margin-top: 1.6rem;
        color: #333;
        font-size: .32rem;
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
        background-color: #5b79fb;
    }
    .home-btn{
        background-color: #ff7e71;
        margin-top: .26rem;
        margin-bottom: .68rem;
    }
</style>
