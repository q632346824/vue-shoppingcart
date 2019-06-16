<template>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
            <router-link :to="'/home/newsinfo/'+item.id">  
              <!-- item为表达式，所以要用属性传值 -->
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h1>{{ item.title }}</h1>
                    <p class='mui-ellipsis'>
                        <span>time:{{ item.add_time | dateFormat}}</span>
                        <span>click:{{ item.click }}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'NewsList',
  data(){
      return {
          newsList:[]
      }
  },

  created(){
      this.getNewsList()
  },

  methods:{
      getNewsList(){
      this.$http.get('api/getnewslist').then(result=>{
          if(result.body.status===0){
              this.newsList=result.body.message
          }else{
              Toast("Fail to load slides")
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.mui-table-view{
    li{
        h1{ font-size:14px}
        .mui-ellipsis{
            font-size:12px;
            color:#226aff;
            display:flex;
            justify-content:space-between;
        }
    }   
}
</style>