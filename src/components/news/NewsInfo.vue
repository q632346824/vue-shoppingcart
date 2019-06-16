<template>
  <div class="newsInfoContainer">
      <h3 class="title">{{ newsInfo.title }}</h3>
      <p class="subtitle">
          <span>time: {{ newsInfo.add_time | dateFormat }}</span>
          <span>view: {{ newsInfo.click }}</span>
      </p>

      <div class="content" v-html="newsInfo.content"></div>

      <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '@/components/subcomponents/comment.vue'
export default {
  name: 'NewsInfo',
  data(){
      return {
          id:this.$route.params.id,
          newsInfo:{}
      }
  },
  created(){
      this.getNewsInfo()
  },
  methods:{
      getNewsInfo(){
          this.$http.get('api/getnew/'+this.id).then(result=>{
              if(result.body.status===0) {
                  this.newsInfo=result.body.message[0]
              }else{
                  Toast('Fail to load')
              }
          })
      }
  },
  components:{
      'comment-box':comment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">   //把scoped去掉图片才能正常显示，因为指定了类所以不会污染
.newsInfoContainer{
    padding:0px;

    .title{
        font-size:16px;
        text-align:center;
        margin:15px 0;
        color:red;
    }

    .subtitle{
        font-size:13px;
        color:#226aff;
        display:flex;
        justify-content:space-between;
    }

    .content{
        img{
            width:100%;

        }
    }
}

</style>
