(function(Vue){
    // 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
    const httpServer = 'http://127.0.0.1:2080/api'
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
    function loadTemplate(name){
        let template = document.getElementById(name+'_tmpl');
        let tempHtml = template.innerHTML;
        return tempHtml;

    }

    const pad = (num, n) => (Array(n).join(0) + num).slice(-n)
    const convertDuration = duration => {
        const h = Math.floor(duration / 3600)
        const m = Math.floor(duration % 3600 / 60)
        const s = Math.floor(duration % 60)
        return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
    }
//es6箭头函数
//id代表参数,=>后面的代表返回值
// const loadTemplate = id => document.getElementById(id+'_tmpl').innerHTML
//     const Home = {template: '<div>Home</div>'}
//     const List = {
//         template: loadTemplate('list'),
//         data (){
//             return {
//                 list:songs
//             }
//         }
//     }
//
//     const Item = {template: loadTemplate('item')}
    // noinspection JSAnnotator
    const Home = Vue.extend({
        template: loadTemplate('home')
    })

    const List = Vue.extend({
        template:loadTemplate('list'),
        data(){
            this.$http.jsonp(`${httpServer}/music`)
                .then(res=>{
                    console.log(res.data)
                    this.list = res.data
                })
            return {
                list:[]
            }
        },
        methods:{
            convert:convertDuration
        }
    })

    const Item = Vue.extend({
        template:loadTemplate('item'),
        data(){
            return{
                item:{}
            }
        },
        route:{
            data(transition){
                const id = parseInt(transition.to.params.id);
                this.$http.jsonp(`${httpServer}/music/${id}`)
                    .then(res=>{
                        this.item = res.data
                    })
            }
        }
    })


    const App = Vue.extend({})

    const router = new VueRouter()

    router.map({
        '/home':{
            name:'home',
            component:Home
        },
        '/songs':{
            name:'list',
            component:List
        },
        '/songs/:id':{
            name:'item',
            component:Item
        }
    })
        // {
        //     name: 'home',
        //     path: '/home',
        //     component: Home
        // },
        // {name: 'list', path: '/songs', component: List},
        // {name: 'item', path: '/songs/:id', component: Item}

    router.start(App,'#app')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
//     const routes = [
//         {
//             name: 'home',
//             path: '/home',
//             component: Home
//         },
//         {name: 'list', path: '/songs', component: List},
//         {name: 'item', path: '/songs/:id', component: Item}
//     ]
//
// // 3. 创建 router 实例，然后传 `routes` 配置
// // 你还可以传别的配置参数, 不过先这么简单着吧。
//     const router = new VueRouter({
//         routes // （缩写）相当于 routes: routes
//     })
//
// // 4. 创建和挂载根实例。
// // 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
//     const app = new Vue({
//         router
//     }).$mount('#app')

})(Vue)



