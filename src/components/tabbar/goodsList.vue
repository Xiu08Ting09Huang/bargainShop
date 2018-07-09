<template>
    <div >
      <ul class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
          <li v-for="(v,i) in goodsList" :key="i">
              <div class="imgBox">
                  <img :src="v.goodsImage" alt="">
              </div>
              <div class="textBox">
                  <p>商品名称：{{v.goodsName}}</p>
                  <p>商品原价：{{v.goodsPrice}}</p>
                  <p>商品有效期：{{v.createdAt | format('YYYY.MM.DD')}}-{{v.goodsBargainEndTime | format('YYYY.MM.DD')}} </p>
                  <p>剩余库存：{{v.goodsNumber}}</p>
              </div>
          </li>
      </ul>
      <p v-if='loadingDom' class='loading'>
        没有更多数据
      </p>
    </div>
</template>

<script>
import { format } from "../../filters/formatDate";
import { listShopGoods } from "@/api/http";
export default {
  data() {
    return {
      goodsList: [],
      shopId: localStorage.getItem("shopId"),
      pageIndex: 1,
      pageSize: 10,
      loading: true,
      loadingDom: false
    };
  },
  methods: {
    // getGoodsList(){
    //     listShopGoods({
    //         shopId: this.shopId
    //     }).then(res =>{
    //         console.log(res.data.dataList)
    //         if(res.data.code == 200){
    //             this.goodsList = res.data.dataList
    //         }
    //     })
    // },
     // 上拉加载
    loadMore() {
      this.loading = true;
      this.pageIndex++ 
      console.log(this.pageIndex)
      this.getGoodsList(this.pageIndex,this.pageSize)
    },
    getGoodsList(pageIndex, pageSize) {
      listShopGoods({
        pageIndex,
        pageSize,
        shopId: this.shopId
      }).then(res => {
        console.log(res.data.dataList);
        if (res.data.code == 200) {
          if (res.data.dataList == [] && this.goodsList.length == 0) {
            this.loading = true;
          } else {
            if (res.data.dataList.length === this.pageSize) {
              res.data.dataList.forEach(v => {
                this.goodsList.push(v);
              });
              this.loading = false;
            } else {
              this.loading = true;
              this.loadingDom = true;
              res.data.dataList.forEach(v => {
                this.goodsList.push(v);
              });
            }
          }
          if (res.data.dataList == []) {
            this.loading = true;
            this.loadingDom = true;
          }
          // this.goodsList = res.data.dataList
        }
      });
    }
  },
  mounted() {
    this.getRem(750, 100);
  },
  filters: {
    format
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scpoed>
$mainColor: #ff3740;
$color: #ecaa00;

.goods-list {
  list-style: none;
  li {
    margin-top: 0.22rem;
    background-color: #fff;
    text-align: left;
    padding: 0.3rem;
    position: relative;
    .imgBox {
      position: absolute;

      img {
        width: 2.08rem;
        height: 2.08rem;
      }
    }

    .textBox {
      padding-left: 2.24rem;
      padding-top: 0.2rem;
      p {
        color: #333;
        font-size: 0.26rem;
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>
