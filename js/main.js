
export const App = {
    
    data(){
        return {
            title: 'Приложение для учета личных финансов',
        }
    },
    methods: {
        changeTitle(){
            this.title = 'Названия нет';
        }
    }
}

const app = Vue.createApp(App);
app.mount('#changeTitle');