<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle"> 
            <span>time:{{ photoinfo.add_time | dateFormat}}</span>
            <span>view:{{ photoinfo.click}}</span>
        </p>
        <hr>

        <vue-preview :slides="list" @close="handleClose"></vue-preview>

        <div class="content" v-html="photoinfo.content">
        </div>
        <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
  name: 'PhotoInfo',
  data(){
      return{
          id:this.$route.params.id,
          photoinfo:{},
          list:[]
      }
  },
  components:{
      'cmt-box':comment    
    },
  created(){
       this.getPhotoInfo()
       this.getThumbs()
  },
  methods:{
      getPhotoInfo(){
          this.$http.get('api/getimageInfo/'+this.id).then(result=>{
              if(result.body.status===0) {
                  this.photoinfo=result.body.message[0]
              }
          })
      },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then((result,index)=>{
                if(result.body.status===0) {
                    result.body.message.forEach(item=>{
                        item.w=600
                        item.h=400
                        item.msrc=item.src
                        item.alt='picture'+index
                        item.title= 'Image Caption '+index
                    })

                    this.list=result.body.message
                }             
            })
        },
        handleClose () {
      }  
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.photoinfo-container{
    padding:3px;
    h3{
        color:#26a2ff;
        font-size:15px;
        text-align:center;
        margin: 15px 0;
    }

    .subtitle{
        display:flex;
        justify-content:space-between
    }

    .content{
        font-size:13px;
        line-height:30px;
    }
}
</style>
