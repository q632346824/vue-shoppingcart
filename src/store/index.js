import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var cart=JSON.parse(localStorage.getItem('cart')||'[]')
  
var store=new Vuex.Store({
  state:{
    cart:cart
  },
  mutations:{
    addToCar(state,goodsinfo){

       var flag=false

       state.cart.some(item=>{
         if(item.id==goodsinfo.id){
           item.count+=parseInt(goodsinfo.count)
           flag=true
           return true
         }
       })

       if(!flag){
         state.cart.push(goodsinfo)
       }

       localStorage.setItem('cart', JSON.stringify(state.cart))

    },
    updateGoodsInfo(state,goodsinfo){
     state.cart.some(item=>{
       if(item.id==goodsinfo.id){
         item.count=parseInt(goodsinfo.count)
         return true
       }
     })
     localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    removeFromCar(state,id){
      state.cart.some((item,i)=>{
        if(item.id==id){
          state.cart.splice(i,1)
          return true
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateGoodsSelected(state,info){
     state.cart.some(item=>{
       if(item.id==info.id){
         item.selected=info.selected
       }
     })
     localStorage.setItem('cart', JSON.stringify(state.cart))
   }

  },
  getters:{
    getAllCount(state){
      var c=0;
      state.cart.forEach(item=>{
        c+=item.count
      })
      return c
    },
    getGoodsCount(state){
     var o={}
      state.cart.forEach(item=>{
        o[item.id]=item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o={}
      state.cart.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o={
        count:0,
        amount:0
      }
      state.cart.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price*item.count
        }
      })
      return o
    }

  }
})

export default store