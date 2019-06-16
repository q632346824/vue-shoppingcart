<template>
  <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
          <img v-lazy="item.img_url" alt="">
          <h1 class="title">{{ item.title }}</h1>
          <div class="info">
              <p class="price">
                  <span class="now">${{ item.sell_price }}</span>
                  <span class="old">${{ item.market_price }}</span>
              </p>
              <p class="sell">
                  <span>On selling</span>
                  <span>Remaining:{{ item.stock_quantity }}</span>
              </p>
          </div>
      </div>
      <mt-button v-show="showLoader" type="danger" size="large">load more</mt-button>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data(){
      return {
          pageindex:1,
          goodslist:[],
          showLoader:false
      }
  },
  created(){
      this.getGoodsList()
  },
  methods:{
      getGoodsList(){
          this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
              if(result.body.status===0){
                  this.goodslist=this.goodslist.concat(result.body.message)
              }
              this.showLoader=true
          })
      },

      getMore(){
          this.pageindex++;
          this.getGoodsList();
      },

      goDetail(id) {
        //   this.$router.push('/home/goodsinfo/'+id)
        this.$router.push({ name: 'goodsinfo', params: { id }})
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.goods-list{
    display:flex;
    flex-wrap:wrap;  // 换行
    padding:7px;
    justify-content: space-between;

    .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:3px 0;
        padding:2px;
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        min-height:293px;


        img{
            width:100%


        }

        img[lazy=loading]{
            width:100%
        }

        .title{
        font-size:14px;
        }

        .info{
            background-color:#eee;
            p{
                margin:0;
                padding:5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight:bold;
                    font-size:16px;
                }

                .old{
                    text-decoration: line-through;
                    font-size:12px;
                    margin-left:10px;
                }
            }

            .sell{
                display:flex;
                justify-content: space-between;
                font-size:12px;
            }
        }

    }


}
</style>
