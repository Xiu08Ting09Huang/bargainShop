<template>
    <div class="success">
        <div class="goodsInfo">
            <img class="goodsImg" :src="goodsImg" alt="">
            <div class="text">
                <p>商品名称：{{goodsName}}</p>
                <p>商品数量：1</p>
                <p>核销时间：{{createdAt | format('YYYY-MM-DD')}}</p>
            </div>
        </div>
        <!-- <div class="code-btn">返回核销</div> -->
        <div class="home-btn" @click="$router.push('/shop/home')">返回主页</div>
    </div>
</template>

<script>
import { format } from '../../filters/formatDate'
export default {
    data(){
        return {
            goodsImg:JSON.parse(sessionStorage.getItem('goodsImg')),
            createdAt:+sessionStorage.getItem('createdAt'),
            goodsName:sessionStorage.getItem('goodsName')
        }
    },
    mounted(){
        this.getRem(750,100)
    },
    filters:{
        format
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
        margin: .68rem .24rem .86rem;
        background-color: #f4f4f4;
        padding: .24rem;
        .goodsImg{
            position: absolute;
            left: .24rem;
            width: 2.3rem;
            height: 1.78rem;
        }
        .text{
            margin-left: 2.54rem;
            text-align: left;
            margin-top: .15rem;
            p{
                margin-bottom: .2rem;
                color: #000;
            }
        }
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
