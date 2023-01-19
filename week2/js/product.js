
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


const base = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'vuepaul7426';

const app = {
    data(){
        return {
            products: "",
            temp_product:{},
        }
    },
    methods:{
      //week1
        isEnabled(item){
            let res = item===1 ? "enable" : "disable";
            return `isEnabled ${res}`
        },
        removeCard(){
            this.temp_product = {}
        },
        changeImg(img){

          const imgGroup =  this.temp_product.imagesUrl;

          imgGroup.push(this.temp_product.imageUrl);

          this.temp_product.imageUrl = img;

          imgGroup.splice(imgGroup.indexOf(img),1);
          
        },
      //week2
        checkLogin(){
          const url = `${base}api/user/check`;

          axios.post(url)
          .then(res=>this.getProducts())
          .catch(err=>{
            Swal.fire({  
              title: 'error',
              text: err.response.data.message,
              icon: 'error',
            })
            .then(()=>window.location='./login.html')
            //When the user clicks a button, the Promise returned by Swal.fire() <= 是promise 用then去接
          });
        },
        getProducts(){
          const url = `${base}/api/${path}/admin/products`;
          axios.get(url)
          .then(res=>this.products = res.data.products)
          .catch(err=>{
            Swal.fire({  
              title: 'error',
              text: err.response.data.message,
              icon: 'error',
            })
          })
        }
    },
    computed:{
      isDetailShow(){
        return this.temp_product.id ? true : false
      }
    },

    mounted(){
      let cookieValue = document.cookie
        .split('; ') //cookie拆分
        .find(x=>x.startsWith('hexToken=')) //找到開頭為hexToken的字串
        ?.split('=')[1]; // [name,content<=取這個]

      axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();
    }
}

createApp(app).mount("#app");
