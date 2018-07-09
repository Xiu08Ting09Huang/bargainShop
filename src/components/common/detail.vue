<template>
    <div class="detail">
        <img src="../../assets/images/img_detail_left.png" alt="">
        <span>商品详情</span> 
        <img src="../../assets/images/img_detail_right.png" alt="">
        <div class="prcInfo">

        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.getRem(750,100)
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .detail{
        background-color: #fff;
        
        padding-top: .3rem;
        padding-bottom: .24rem;
        img{
            width: .5rem;
            height: .28rem;
            vertical-align: middle;
        }
        span{
            font-size: .28rem;
            vertical-align: middle; 
            margin: 0 .3rem;
            color: #333;
        }
        .prcInfo{
            margin: .24rem;
            background-color: #eee;
            height: 8rem;
        }
    }
</style>
