
<template>
    <div >
      <div class="model" v-show="show">
        <div class="text"><img src="https://tango.heeyhome.com/images/text.png" alt=""> </div>
      </div>
       <div class="navlist">
          <span @click="$router.push('/shop/orderList')"><img src="https://tango.heeyhome.com/images/icon_dingdan1.png" alt=""> <p>我的订单</p> </span>
          <span @click="scanQRCode"  ><img class="code" src="https://tango.heeyhome.com/images/icon_dingdan2.png" alt=""><p>点击核销</p></span>
          <span @click="$router.push('/shop/goodsList')"><img src="https://tango.heeyhome.com/images/icon_dingdan3.png" alt=""><p>我的商品</p></span>
       </div>
        <ul class="mui-table-view"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
          <li class="order-list" v-for="(v,i) in orderList" :key="i">
             <div v-if="v.orderStatus == 5">
                    <p><span>商品名：{{v.goods.goodsName}}</span><span class="mui-pull-right colorRed">状态：{{ formatOrderStatus(v.orderStatus)}}</span></p>
                    <p>核销时间：{{v.orderUseTime| format('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
               <div v-if="v.orderStatus == 4">
                     <p><span>商品名：{{v.goods.goodsName}}</span><span class="mui-pull-right colorRed">状态：{{ formatOrderStatus(v.orderStatus)}}</span></p>
                    <p>订单时间：{{v.createdAt| format('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
          </li>
        </ul>
         <p v-if='loadingDom' class='loading'>
        没有更多数据
        </p>
    </div>
</template>

<script>
import {
  listOrder,
  userLogin,
  getTicket,
  getConfig,
  verificationCode
} from "@/api/http";
import CountDown from "@/components/common/initTime.vue";
import { format } from "../../filters/formatDate";
import wx from "weixin-js-sdk";
import refresh from '@/components/common/pullToRefresh.js'
export default {
  data() {
    return {
      orderList: [],
      shopOpenId: localStorage.getItem("shopOpenId"),
      shopId: localStorage.getItem("shopId"),
      shopName: localStorage.getItem("shopName"),
      show: false,
      flagShop: localStorage.getItem("flagShop"),
      pageIndex:1,
      pageSize:10,
      loading:true,
      loadingDom : false
    };
  },
  methods: {
    // 获取code
    getCode() {
      if (this.shopOpenId == null || this.shopOpenId == "" ) {
        if (this.flagShop != 0) {
          localStorage.setItem("flagShop", 0);
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2fdist1%2f%23%2fshop%2fhome&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
        userLogin({
          jsCode: window.location.search
            .slice(1)
            .split("&")[0]
            .split("=")[1]
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            // 获取shopOpenId
            this.shopOpenId = res.data.data.openId;
            this.shopId = res.data.data.user.shopId;
            this.shopName = res.data.data.user.shopName;
            localStorage.setItem("shopOpenId", res.data.data.openId);
            localStorage.setItem("shopId", res.data.data.user.shopId);
            localStorage.setItem("shopName", res.data.data.user.shopName);
            if(this.shopId == null || this.shopId == ''){
               this.show = true;
               this.shopName = "吃相商铺";
               document.title = '吃相商铺'
            }else {
              this.show = false
              document.title = this.shopName || '吃相商铺';
            }
          }
        });
      } else {
        userLogin({
          userOpenId: this.shopOpenId
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            // 获取shopOpenId
            this.shopOpenId = res.data.data.openId;
            this.shopId = res.data.data.user.shopId;
            this.shopName = res.data.data.user.shopName;
            localStorage.setItem("shopOpenId", res.data.data.openId);
            localStorage.setItem("shopId", res.data.data.user.shopId);
            localStorage.setItem("shopName", res.data.data.user.shopName);
             if(this.shopId == null || this.shopId == ''){
               this.show = true;
               this.shopName = "吃相商铺";
               document.title = '吃相商铺'
            }else {
              this.show = false
              document.title = this.shopName || '吃相商铺';
            }
          } else {
            // localStorage.setItem("flag", 1);
            if (this.flagShop != 1) {
              localStorage.setItem("flagShop", 1);
              window.location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2fdist1%2f%23%2fshop%2fhome&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            }
            userLogin({
              jsCode: window.location.search
                .slice(1)
                .split("&")[0]
                .split("=")[1]
            }).then(res => {
              console.log(res)
              if (res.data.code == 200) {
                // 获取shopOpenId
                this.shopOpenId = res.data.data.openId;
                this.shopId = res.data.data.user.shopId;
                this.shopName = res.data.data.user.shopName;
                localStorage.setItem("shopOpenId",res.data.data.openId);
                localStorage.setItem("shopId", res.data.data.user.shopId);
                localStorage.setItem("shopName", res.data.data.user.shopName);
                 if(this.shopId == null || this.shopId == ''){
                    this.show = true;
                    this.shopName = "吃相商铺";
                    document.title = '吃相商铺'
                  }else {
                    this.show = false
                    document.title = this.shopName || '吃相商铺';
                  }
              }
            });
          }
        });
      }
    },
    // 获取token和Ticket
    getTicket() {
      getTicket({}).then(res => {
        console.log(res);
        this.accessToken = res.data.data.accessToken;
        this.ticket = res.data.data.ticket;
      });
    },
    //  扫一扫
    scanQRCode() {
      getConfig({
        accessToken: this.accessToke,
        ticket: this.ticket,
        url: location.href.split("#")[0]
      }).then(res => {
        // alert(location.href.split('#')[0])
        console.log(res);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxd8e37fb96f38f963", // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone",
            "scanQRCode"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        //处理验证失败的信息
        wx.error(function(res) {
          // alert(res.errMsg);
        });
        wx.ready(() => {
          //分享给好友
          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              // alert(res)
              // var res = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
          });
        });
      });
    },
    formatOrderStatus(status) {
      if (status === 1) {
        return "砍价中";
      } else if (status === 2) {
        return "砍价成功";
      } else if (status === 3) {
        return "砍价失败";
      } else if (status === 4) {
        return "未核销";
      } else if (status === 5) {
        return "已核销";
      }
    },
     // 上拉加载
    loadMore() {
      this.loading = true;
      this.pageIndex++ 
      console.log(this.pageIndex)
      this.getData(this.pageIndex,this.pageSize)
    },
    getData(pageIndex,pageSize) {
      listOrder({
        pageIndex,
        pageSize,
        shopId: this.shopId
      }).then(res => {
        console.log(res.data.dataList);
        if (res.data.code == 200) {
           if(res.data.dataList == [] && this.orderList.length == 0){
            this.loading = true;
          }else{
            if(res.data.dataList.length === this.pageSize){
              res.data.dataList.forEach(v => {
                this.orderList.push(v)
              })
              this.loading = false;
            }else{
              this.loading = true;
              this.loadingDom = true
              res.data.dataList.forEach( v => {
                this.orderList.push(v)
              })
            }
          };
          if(res.data.dataList == []){
            this.loading = true;
            this.loadingDom = true;
          }
          // this.orderList = res.data.dataList;
          // res.data.dataList.forEach(v => {
          //   v.nowTime = new Date().getTime();
          // });
        }
      });
    }
  },
  filters: {
    format
  },
  mounted() {
    if (
      this.shopOpenId == "" ||
      this.shopOpenId == null ||
      this.shopId == "" ||
      this.shopId == null
    ) {
      this.show = true;
      document.title = "吃相商铺";
    } else {
      this.show = false;
       document.title = this.shopName || '吃相商铺';
    }
    this.getRem(750, 100);
  },
  created() {
    // 下拉刷新
    refresh()
    // 获取code
    this.getCode();
    // 根据code获取用户详情
    // this.getInfo();
    // 获取订单列表
    this.getData(this.pageIndex,this.pageSize);
    // 获取token
    this.getTicket();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
$mainColor: #ff3740;
$color: #ecaa00;
.model {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 666;
  background-color: #f4f4f4;
  .text {
    width: 5.1rem;
    height: 2.54rem;
    background-color: #fff;
    margin: 3.3rem auto;
    border-radius: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.navlist {
  span {
    display: inline-block;
    width: 2.2rem;
    height: 2.2rem;
    background-color: #fff;
    margin: 0 0.05rem;
    margin-top: 0.22rem;
    img {
      width: 0.66rem;
      height: 0.76rem;
      margin-top: 0.55rem;
    }
    .code {
      width: 0.5rem;
      height: 0.76rem;
    }
    p {
      margin-top: 0.2rem;
      color: #333;
      font-size: 0.26rem;
    }
  }
}

.order-list {
  text-align: left;
  padding-top: 0.2rem;
  background-color: #fff;
  margin-top: 0.22rem;
  padding: 0.3rem 0.1rem;
  p {
    margin-bottom: 0;
    line-height: 0.5rem;
    color: #000;
    font-size: 0.28rem;
    .colorRed {
      color: #ff3740;
    }
  }
}
.mui-table-view {
  margin: 0.25rem;
}
.title {
  color: #000;
  font-size: 0.28rem;
}

.mui-table-view:before,
.mui-table-view-cell:after,
.mui-table-view,
.mui-table-view:after {
  background-color: rgba(0, 0, 0, 0);
}
</style>
