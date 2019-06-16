<template>
  <div class="shopcar-container">
    <div class="goods-list">

      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
            </mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">${{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a @click="remove(item.id,i)">remove</a>
              </p>
            </div>
					</div>
				</div>
			</div>  

    </div>

      <div class="mui-card" v-show="redirection">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            Your cart is empty now. Go to
            <router-link to="/home/goodslist">
            shopping
            </router-link>
					</div>
				</div>
			</div>

      <div class="mui-card" v-show="showSummary">
				<div class="mui-card-header">Summary</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>
                <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>&nbsp;items selected  
                 Total: <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
            <mt-button type="danger">checkout</mt-button>
					</div>
				</div>
			</div>
    
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  name: 'ShopcarContainer',
  data(){
    return {
            goodslist:[],
            showSummary:false,
            redirection:false
          } 
  },
  components:{ numbox },
  created(){
    this.getGoodsList()
  },
  mounted(){
    this.$store.watch(
      state=>state.cart,
      (newVal)=>{
        newVal.length===0?this.redirection=true:this.redirection=false
      }
    )

  },
  methods:{
    getGoodsList(){
      var idArr=[]
      this.$store.state.cart.forEach(item=>idArr.push(item.id))
      if(idArr.length<=0) {
        this.showSummary=true
        this.redirection=true
        return
      }
      this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
        if(result.body.status===0){
          this.goodslist=result.body.message
          this.showSummary=true
        }
      })
    },
    remove(id,index){
      this.goodslist.splice(index,1)
      this.$store.commit('removeFromCar',id)
    },
    selectedChanged(id,val){
    this.$store.commit('updateGoodsSelected',{ id, selected:val})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shopcar-container{
  background-color:#eee;
  overflow:hidden;

  .goods-list{
    .mui-card-content-inner{
      display:flex;
      
      justify-content: space-between;
      align-items:center;
    }
    img{
      width:60px;
      height:60px;
    }

    h1{
      font-size:14px;
    }

    .info{
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      p{
        display:flex;
        justify-content: space-between;
        align-items:center;
        .price{ 
          color:red;
          font-weight: bold
          }
      }
    }

  }

  .jiesuan {
    display:flex;
    justify-content:space-between;
    align-items:center;
    .red{
      color:red;
      font-weight:bold;
      font-size:16px;
    }
  }
}
</style>