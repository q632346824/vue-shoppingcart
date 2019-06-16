<template>
  <div class="cmt-container">
      <h3>Comment</h3>
      <hr>
      <textarea placeholder="At most 120 characters" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">Post</mt-button>


      <div class="cmt-list">
          <div class="cmt-item" v-for="(item,i) in comments" :key="i">
              <div class="cmt-title">
                  第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}};&nbsp;发表时间：{{item.add_time | dateFormat }}
              </div>
              <div class="cmt-body">
                {{ item.content === ('undefined'||"") ? 'nothing here' :item.content }}
              </div>
          </div>
      </div>
      <mt-button type="danger" size="large" plain @click="getMore">Load more</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
  name: 'comment',
  data(){
      return {
          pageIndex:1,
          comments:[],
          msg:''
      }
  },
  created(){
      this.getComments()
  },
  methods:{
      getComments(){
          this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(
              result=>{
                  if(result.body.status===0){
                    this.comments=this.comments.concat( result.body.message )
                    // console.log(result.body.message)
                  }else{
                    Toast('评论失败')
                  }
              }
          )
      },
      getMore(){
          this.pageIndex++
          this.getComments()
      },
      postComment(){

          this.$http.post('api/postcomment/'+this.id, {content:this.msg.trim()})
          .then( function(result){
                if(result.body.status===0){
                    var cmt= { user_name:'匿名',
                               add_time:Date.now(),
                               content:this.msg.trim()              
                    }

                    this.comments.unshift(cmt)
                    this.msg=''

                }
              }
          )
      }
  },
  props:["id"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cmt-container{
    h3{
        font-size:16px;
    }

    textarea{
        font-size:14px;
        height:85px;
        margin:0;
    }

    .cmt-list{
        margin:10px 0;
        .cmt-item{
            font-size:13px;
            .cmt-title{
                line-height:30px;
                background-color: #ccc;

            }
            .cmt-body{
                line-height:35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
