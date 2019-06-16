<template>
  <div>

      <swiper :slides="slides" :isfull="true"></swiper>


    <ul class="mui-table-view mui-grid-view mui-grid-9" >
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">News</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">Picture</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">Shop</div></router-link></li>
    </ul> 

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'

export default {
  name: 'HomeContainer',
  data(){
      return{
          slides:[]
      }
  },
  created(){
      this.getSlides()
  },
  components:{
      swiper
  },
  methods:{
      getSlides(){
          this.$http.get('api/getlunbo').then(result=>{
              if(result.body.status===0) {
                  this.slides=result.body.message
                  
              }else{
                  Toast("Fail to load slides")
              }

          })
      },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



    .mui-grid-view.mui-grid-9{
        background-color: white;
        border:none;

        img{
            width:60px;
            height:60px;
        }

    }


    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0;

        .mui-media-body{
            font-size:13px;
        }
    }

    .mui-grid-view.mui-grid-9:hover{
        color: red;
    }

    // .mui-table-view.mui-grid-view .mui-table-view-cell:hover{
    //     background-color: grey;
    // }
</style>
