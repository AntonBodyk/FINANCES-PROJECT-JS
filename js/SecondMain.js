import { store } from "./main.js";

const secondVueObj = {
    data(){
        return{
            store: store.count
        }
    },
    methods: {
        plus() {
            this.store += 1;
        },
        minus() {
            this.store -= 1;
        }
    }
}

const secondObj = Vue.createApp(secondVueObj);
secondObj.mount('#counter');