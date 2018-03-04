import Vue from 'vue'

new Vue({
    el:'#app',
    template:'<p>hello {{message}}</p>',
    data:{
        message:'world'
    }
})