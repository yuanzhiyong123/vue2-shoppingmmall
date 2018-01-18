import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        orderList:localStorage.getItem('orderList')?JSON.parse(localStorage.getItem('orderList')):[],
        userInfo:{}
    },
    mutations:{
        login(state,json){
            state.userInfo=json;
            localStorage.userInfo=JSON.stringify(state.userInfo);
        },
        add(state,json){
            state.orderList.push(json);
            localStorage.orderList=JSON.stringify(state.orderList);
        },
        toggleSelect(state,id){
            let list=state.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].id===id){
                    list[i].select=!list[i].select;
                    //一下代码无用，用来强制更新state状态
                    list.push({});
                    list.pop();
                }
            }
            localStorage.orderList=JSON.stringify(state.orderList);
        },
        toggleSelectAll(state,select){
            let list=state.orderList;
            for(let i=0; i<list.length; i++){
                list[i].select=select;
                list.push({});
                list.pop();
            }
            localStorage.orderList=JSON.stringify(state.orderList);
        },
        deleteOrder(state,id){
            let list=state.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].id===id){
                    list.splice(i,1);
                }
            }
            localStorage.orderList=JSON.stringify(state.orderList);
        },
        plus(state,id){
            let list=state.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].id===id){
                    list[i].count++;
                    list.push({});
                    list.pop();
                }
            }
            localStorage.orderList=JSON.stringify(state.orderList);
        },
        minus(state,id){
            let list=state.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].id===id){
                    if(list[i].count===1){
                        return;
                    }
                    list[i].count--;
                    list.push({});
                    list.pop();
                }
            }
            localStorage.orderList=JSON.stringify(state.orderList);
        }
    }
});
export default store;