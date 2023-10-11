<template>
  <div>
    <form action="#" @submit.prevent>
      <input v-model="message" placeholder="Напишите отзыв" class="input-review form-control"/>
      <form-input></form-input>
      <button @click="addMessage()" class="add-message btn-primary mb-5">Добавить</button>
      
    </form>
    <h3>Ваши коментарии:</h3>
    <ol>
      <li v-for="message of messages" :key="message.id">
        <div>
          {{ message }}
        </div>
          
      </li>
    </ol>
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
export default {
  components:{
    FormInput
  },
  data(){
    return{
      messages: [],
      message: ''
    }
  },
  methods: {
    addMessage(){
      if(this.message !== '' && Array.isArray(this.messages)){
        this.messages.push(this.message);
        this.message = '';
      }else{
        alert('Введите данные');
      }
    }
  }
}
</script>

<style>
  .input-review{
    font-style: italic;
    display:block;
    margin:50px auto 20px auto;
    width:280px;
    height:50px;
    background:#fff;
    box-shadow:0 4px 15px rgba(0,0,0,.2);
    border:none;
    font-size:18px;
    text-align:center;
    padding:0 20px;
    outline:0;
  }
  .add-message{
    margin-left: 46%;
    width: 130px;
    height: 45px;
    border-radius: 10px;
    color: aliceblue;
    border: none;
    cursor: pointer;
    box-shadow:0 4px 15px rgba(0,0,0,.2);
  }
</style>
