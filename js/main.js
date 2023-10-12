export const store = Vue.reactive({
    count: 0
})

const App = {
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

const message = {
    data(){
        return{
            message: 'Hello, User!',
            users: [
                {id: 1, name: 'Tom', age: 20},
                {id: 2, name: 'Den', age: 25},
                {id: 3, name: 'Oleg', age: 30}
            ],
            filteredUsers: [],
            filteredText: '',
            localPosts: [
                {
                    "userId": 7,
                    "id": 62,
                    "title": "beatae enim quia vel",
                    "body": "enim aspernatur illo distinctio quae praesentium\nbeatae alias amet delectus qui voluptate distinctio\nodit sint accusantium autem omnis\nquo molestiae omnis ea eveniet optio"
                },
                {
                    "userId": 7,
                    "id": 63,
                    "title": "voluptas blanditiis repellendus animi ducimus error sapiente et suscipit",
                    "body": "enim adipisci aspernatur nemo\nnumquam omnis facere dolorem dolor ex quis temporibus incidunt\nab delectus culpa quo reprehenderit blanditiis asperiores\naccusantium ut quam in voluptatibus voluptas ipsam dicta"
                },
                {
                    "userId": 7,
                    "id": 64,
                    "title": "et fugit quas eum in in aperiam quod",
                    "body": "id velit blanditiis\neum ea voluptatem\nmolestiae sint occaecati est eos perspiciatis\nincidunt a error provident eaque aut aut qui"
                },
                {
                    "userId": 7,
                    "id": 65,
                    "title": "consequatur id enim sunt et et",
                    "body": "voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur"
                },
            ],
            apiPosts: [],
            car: {
                color: 'красный',
                name: 'Ferrari',
                price: 500000
            },
            numberValue: 3,
            changeObject: 'Изменений в объекте нет',
            changeColor: 'Цвет стандартный',
            userId: 1,
            userData: null,
        }
    },
    methods: {
        changeMessage() {
            this.message = 'Bye,user!';
        },
        sayHi(message){
            this.message = message;
        },
        filterUsers(key, value) {
            this.filteredUsers = this.users.filter(item => item[key] === value);
            //для фильтрации нужно вызвать этот метод и указать ему,ключ и значение,по которому должен быть отфильтрован массив
            // пример есть в HTML 
            //По этой же системе, все задания дальше
        },

        async getPosts() {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
            const response = await data.json();
            this.apiPosts = response;
        },

        updatedUsers(){
            this.users[0].name = 'Taras';
        },

        updateCarColor() {
            this.car.color = 'черный';
        },

        updateUserId() {
            this.userId += 1;
        },

        async getUsers() {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}`);
            const response = await data.json();
            this.userData = response;
        },

        updateBaseValue() {
            this.numberValue += 1;
          },
    },

    
    computed:{
        // Створіть computed property для фільтрації списку об'єктів.
        filteredList() {
            const filteredText = this.filteredText.toLowerCase();
            return this.users.filter(item => item.name.toLowerCase().includes(filteredText));
        },

        // Створіть computed property, яке комбінує дані відповіді від HTTP запиту та з рекативною змінною.
        combinedData() {
            return [...this.localPosts, ...this.apiPosts];
        },

        // Створіть кілька computed properties, які залежать одне від одного.
        doubledNumValue() {
            return this.numberValue * 2;
        },
        minValue(){
            return this.doubledNumValue - 3;
        },
        plusValue(){
            return this.minValue + 7;
        }
    },

    watch: {
        // Використовуйте watcher для відстеження змін у реактивному об’єкті та виведення повідомлення про це.
        users: {
            handler(newName) {
                this.changeObject = 'Объект был изменен!';
                console.log('Значение изменено на:', newName);
            },
            deep: true, //Використовуйте deep опцію для відстеження властивостей внутрішніх об’єктів.
        },
        
        //   Використовуйте watcher для відстеження змін однієї властивості у реактивному об’єкті та виведення повідомлення про це.
        'car.color':{
            handler(newColor, oldColor) {
                this.changeColor = `Цвет изменен с ${oldColor} на ${newColor}`;
                console.log('Цвет изменен на:', newColor);
            }
        },

        // Використовуйте watcher для відправлення API запитів при зміні реактивних даних.
        userId: {
            handler(newUserId, oldUserId) {
                console.log(`Идентификатор пользователя изменен с ${oldUserId} на ${newUserId}`);
                this.getUsers();
            },
        },
        
        // Створіть watcher, який реагує на зміни в computed property.
        numberValue: {
            handler(newNumber, oldNumber) {
                console.log(`Базовое число изменено с ${oldNumber} на ${newNumber}`);
            },
        immediate: true,   // Використовуйте опцію immediate для виклику watcher при ініціалізації компонента.
        },
    },
    mounted() {
        this.getPosts();
      }
};

const userMessage = Vue.createApp(message);
userMessage.mount('#userHello');