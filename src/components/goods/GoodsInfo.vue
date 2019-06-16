<template>
  <div class="goodsinfo-container">
    
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      name="ball">
      <div class="ball" v-show="this.ballFlag" ref="ball"></div>
    </transition>




    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <swiper :slides="lunbotu" :isfull="false"></swiper>
            </div>
        </div>
    </div>
    <div class="mui-card">
        <div class="mui-card-header">{{ goodsinfo.title }}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p class="price">
                    Market price：<del>${{ goodsinfo.market_price }}</del>&nbsp;&nbsp;Selling price<span class="now_price"> {{ goodsinfo.sell_price }}</span>
                </p>
                <p>Number : <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"/></p>
                <p>
                    <mt-button type="primary" size="small" @click="addToShopCar">Buy now</mt-button>
                </p>
            </div>
        </div>
    </div>

    <div class="mui-card">
        <div class="mui-card-header">Info</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>ID: {{ goodsinfo.goods_no}}</p>
                <p>stock: {{ goodsinfo.stock_quantity }}</p>
                <p>Release time: {{ goodsinfo.add_time | dateFormat}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" size="large" plain @click="goDesc(id)">Info with pictures</mt-button>
            <br>
            <mt-button type="danger" size="large" plain @click="goComment(id)">see comments</mt-button>
        </div>
    </div>

  </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from "../subcomponents/goodsinfo_numbox.vue"

export default {
  name: 'GoodsInfo',
  data(){
      return {  
                id:this.$route.params.id,
                lunbotu:[],
                goodsinfo:[],
                ballFlag:false,
                selectedCount:1
            }
  },
  created(){
      this.getLunbotu();
      this.getGoodsInfo();
  },
  components:{
      swiper,
      numbox,
      
  },
  methods:{
      getLunbotu(){
          this.$http.get('api/getthumimages/'+ this.id).then(result=>{
              if(result.body.status===0){
                  result.body.message.forEach(item=>{
                      item.img=item.src;
                  })
                  this.lunbotu=result.body.message
              }
          })
      },
      getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+ this.id).then(result=>{
                if(result.body.status===0){
                
                    this.goodsinfo=result.body.message[0]
                }
         })
        },
      goDesc(id){
          this.$router.push({name: 'goodsdesc', params:{id}})
      },

      goComment(id){
          this.$router.push({ name: 'goodscomment', params:{id}})
      },

      addToShopCar(){
        this.ballFlag=!this.ballFlag
        var goodsinfo= {   
                        id:this.id, 
                        count: this.selectedCount, 
                        price:this.goodsinfo.sell_price, 
                        selected:true 
                       }
        this.$store.commit("addToCar",goodsinfo)

      },

    beforeEnter(el){
          el.style.transform = "translate(0, 0)"
        },
    enter(el, done){
        el.offsetWidth
        const ballPosition=this.$refs.ball.getBoundingClientRect()
        const badgePosition=document.getElementById("badge").getBoundingClientRect()
        const xDist=badgePosition.left-ballPosition.left
        const yDist=badgePosition.top-ballPosition.top

        

        el.style.transform = `translate(${xDist}px,${yDist}px)`
        el.style.transition = 'all 0.5s ease'
        done()
    },  
      afterEnter(){
           this.ballFlag=!this.ballFlag
      },
      getSelectedCount(count){
          this.selectedCount=count
      }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.goodsinfo-container{
    background-color: #eee;
    overflow:hidden;

    .now_price{
        color:red;
        font-size:16px;
        font-weight:bold;
    }

    .mui-card-footer{
        display:block;

    }
    .ball{
        width:15px;
        height:15px;
        border-radius:50%;
        background-color:red;
        position:absolute;
        z-index:99;
        top:406px;
        left:146px;
    }
}
</style>
