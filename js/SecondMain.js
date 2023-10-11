import { store } from "./main.js";

const secondVueObj = {
    data(){
        return{
            store: store.count
        }
    }
}

const secondObj = Vue.createApp(secondVueObj);
secondObj.mount('#counter');