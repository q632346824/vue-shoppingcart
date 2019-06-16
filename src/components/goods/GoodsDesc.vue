<template>
  <div class="goodsdesc-container">
      <h3>{{ info.title }}</h3>
      <hr>
      <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  name: 'GoodsDesc',
  data(){
      return {
          info:{}
      }
  },
  created(){
      this.getGoodsDesc()
  },
  methods:{
      getGoodsDesc(){
          this.$http.get("api/goods/getdesc/"+ this.$route.params.id).then(result=>{
              if(result.body.status===0){
                  this.info=result.body.message[0]
              }
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style  lang="scss">
 // 把scoped去掉才能正确显示img
.goodsdesc-container{
    padding:4px;
    h3{
        font-size:16px;
        color:#226aff;
        text-align:center;
        margin:15px 0;
    }
    .content{
    img{
        width:100%
      }

    }
}
</style>
