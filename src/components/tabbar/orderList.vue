<template>
    <div >
        <div class="top-select">
            <div class="allGoods" @click="show = !show" >
                <span>{{ goodsName }}</span>    
                <img src="https://tango.heeyhome.com/images/icon_up2.png" alt="" class="mui-pull-right">
                <ul v-show="show">
                    <li @click="getOrderList">全部订单</li>
                    <li v-for="v in goodsList"  :key="v.id" @click="getGoodsNameOrderList(v.id,v.goodsName)"> {{v.goodsName}}</li>
                </ul>
            </div>
            <mt-button @click.native="open('picker')" size="large" class="date" >{{value | formatDate}}</mt-button>
            <mt-datetime-picker class="picker_show"
                            ref="picker"
                            type="date"
                            v-model="value"
                            :startTime = "startTime"
                            :endTime = "endTime"
                            @confirm ="getDateOrderList(value)"
            ></mt-datetime-picker>
            <!-- <input type="text" class="date" value="日期"> -->
            <div class="status"  @click="isShow = !isShow">
                {{status}}
                <img src="https://tango.heeyhome.com/images/icon_up2.png" alt="" class="mui-pull-right">
                 <ul v-show="isShow">
                    <!-- <li><a href="#">111</a></li> -->
                    <li v-for="(v,i) in statusList" :key="i" @click="getStatusOrderList(v.value,v.label)" >{{v.label}}</li>
                </ul>
            </div>
        </div>
        <div class="total"> 共计{{total}}份</div>
          <ul class="mui-table-view">
            <li class="order-list" v-for="(v,i) in orderList" :key="i" >
                <!-- <a href="javascript:;" class=""> -->
                <div v-if="v.orderStatus == 5">
                    <p><span>商品名：{{v.goods.goodsName}}</span><span class="mui-pull-right colorRed">状态：{{ formatOrderStatus(v.orderStatus)}}</span></p>
                    <p>核销时间：{{v.orderUseTime| format('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
               <div v-if="v.orderStatus == 4">
                     <p><span>商品名：{{v.goods.goodsName}}</span><span class="mui-pull-right colorRed">状态：{{ formatOrderStatus(v.orderStatus)}}</span></p>
                    <p>订单时间：{{v.createdAt| format('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
                <!-- </a> -->
            </li>
         </ul>
        
         <!-- <input type="date" name="" id="" > -->
    </div>
</template>

<script>
import { listOrder, listShopGoods } from "@/api/http";
import layDate from "laydate"
import { formatDate,format } from '../../filters/formatDate'
import moment from "moment";
import refresh from '@/components/common/pullToRefresh.js'
export default {
    data () {
        return {  
          value: new Date(),          //定义显示时间
          visible: false,
          startTime: '',      //设置开始时间
          endTime: '' ,  //设置结束时间
          show:false,
          isShow:false,
          orderList:[],
          goodsList:[],
          shopId:localStorage.getItem('shopId'),
          total:0,
          status: '状态',
          goodsName:'全部订单',
          statusList: [{
          value: 4,
          label: '未核销'
        }, {
          value: 5,
          label: '已核销'
        }],
        }
      },
    created() {
        refresh()
        this.getOrderList(),
        this.getGoodsList()
    },
    methods: {
        formatOrderStatus(status) {
        if (status === 1) {
            return "砍价中"
            }
            else if (status === 2) {  
            return "砍价成功"
            }
            else if(status === 3) { 
            return "砍价失败" 
            }
            else if(status === 4) {
            return "未核销"
            }
            else if(status === 5) {
            return "已核销"
            }
        },
        open(picker) {
          this.$refs[picker].open();    //设置开始
        },
        // 根据订单名称查询
        getGoodsList(){
            listShopGoods({
                shopId:this.shopId
            }).then(res =>{
                console.log(res)
                if(res.data.code == 200){
                    this.goodsList = res.data.dataList
                }
            })
        },
        // 获取全部订单
       getOrderList() {
           this.goodsName = '全部订单'
           this.status = '状态'
           this.value = new Date()
        listOrder({
            shopId:this.shopId
         })
        .then(res => {
            console.log(res)
            this.orderList = []
            if (res.data.code == 200) {
            this.orderList = res.data.dataList;
            this.total = res.data.objectotalNumber
            }
        });
        },
        // 通过商品名称删选
         getGoodsNameOrderList(goodsId,goodsName) {
             console.log(goodsName)
             this.goodsName = goodsName
            listOrder({
                goodsId,
                 shopId:this.shopId
            })
            .then(res => {
                console.log(res.data.dataList)
                this.orderList = []
                if (res.data.code == 200) {
                this.orderList = res.data.dataList;
                this.total = res.data.objectotalNumber
                }
            });
        },
        // 通过时间删选
       getDateOrderList(date) {
           console.log(format( date.getTime() ,'YYYY-MM-DD'))
            listOrder({
                time:format( date.getTime() ,'YYYY-MM-DD'),
                 shopId:this.shopId
            })
            .then(res => {
                console.log(res)
                this.orderList = []
                if (res.data.code == 200) {
                this.orderList = res.data.dataList;
                this.total = res.data.objectotalNumber
                }
            });
        },
        // 通过状态删选
         getStatusOrderList(status,label) {
             this.status = label,
             
            listOrder({
                status,
                 shopId:this.shopId
                })
            .then(res => {
                console.log(res)
                this.orderList = []
                if (res.data.code == 200) {
                this.orderList = res.data.dataList;
                this.total = res.data.objectotalNumber
                
                }
            });
        },
    },
    mounted(){
        this.getRem(750,100)
    },
    filters : {
        format,
        moment,
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
                }
        }
}
</script>

<style rel="stylesheet/scss" lang="scss" scpoed>
$mainColor:#ff3740;
$color:#ecaa00;

.nav-cx{
    background-color: #fff;
    height: .92rem;
    line-height: .92rem;
    font-size: .28rem;
    padding: 0 .24rem;
    display: flex;
    justify-content: space-around;
    a{   
    color: #666;
    &.mui-active{
        border-bottom: .08rem solid $mainColor;
    }
    }
}
input[type='button'], input[type='submit'], input[type='reset'], button, .mui-btn{
    padding: 0;
}
.top-select{
    height: 1.18rem;
    padding: .28rem  .12rem;
    text-align: left;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    .allGoods,
    .date,
    .status{
     display: inline-block;
     background-color: #e5ecff;
     border-radius: 0.05rem;
     height: .72rem;
     line-height: 0.72rem;
     padding-left: .24rem;
     font-size: .28rem;
     position: relative;
     img{
         width: .18rem;
         height: .12rem;
         margin-right: .24rem;
         margin-top: .28rem;
     }
    }
    .allGoods{
         width: 2.4rem;
        ul{
            position: absolute;
            list-style: none;
            background-color: #fff;
            width: 100%;
            left: 0;
            border: 1px solid #ccc;
            top: .7rem;
            z-index: 111;
            li{
                border-bottom: 1px solid #ccc;
            }
        }
     }
     .mint-button-text{
         line-height: .52rem;
     }
     .date{
         width: 2.2rem;
         outline-style: none;
         line-height: .72rem;
         padding-bottom: .6rem;
     }
     .status{
         width: 1.8rem;
          ul{
            position: absolute;
            list-style: none;
            background-color: #fff;
            width: 100%;
            left: 0;
            border: 1px solid #ccc;
            top: .7rem;
              z-index: 111;
            li{
                border-bottom: 1px solid #ccc;
            }
        }
     }
     
}
.total{
    width: 7.02rem;
    height: 0.74rem;
    line-height: .74rem;
    background-color: #fff;
    color: #333;
    font-size: .28rem;
    margin: .2rem auto;
}
.order-list {
  text-align: left;
  padding-top: 0.2rem;
  background-color: #fff;
  margin-top: .22rem;
  padding: 0.3rem .1rem;
  p{
    margin-bottom: 0;
    line-height: .5rem;
    color: #000;
    font-size: .28rem;
    .colorRed{
      color: #ff3740;
    }
  }
}
.mui-table-view{
  margin:0.25rem;
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


img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
