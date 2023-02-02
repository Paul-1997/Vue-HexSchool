
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


const base = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'vuepaul7426';


//bootstraps model
let productModal = {};
let deleteProduct = {};
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
          .then(res=>{
            document.querySelector('.userName').textContent = res.data.uid;
            this.getProducts()
          })
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
        },
      //week3
        deleteProduct(id){

        },
        editProduct(id){
          productModal.show();
        },
        addProduct(){
          productModal.show();
        },
        logOut(){

        }
    },
    computed:{
      isDetailShow(){
        return this.temp_product.id ? true : false
      }
    },

    mounted(){
      let cookieValue = document.cookie
        .split('; ')
        .find(x=>x.startsWith('hexToken='))
        ?.split('=')[1];

      axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();

        //bootstrap Modal
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        
    }
}

createApp(app).mount("#app");





//     "category": "衣服3",
//     "content": "這是內容",
//     "description": "Sit down please 名設計師設計",\
//     ingrdent:
//     "id": "-L9tH8jxVb2Ka_DYPwng",
//     "is_enabled": 1,
//     "num": 1,
//     "origin_price": 500,
//     "price": 600,
//     "title": "[賣]動物園造型衣服3",
//     "unit": "個",
//     "imageUrl": "主圖網址",
//     "imagesUrl": [
//       "圖片網址一",
//       "圖片網址二",
//       "圖片網址三",
//       "圖片網址四",
//       "圖片網址五"
//     ]
//   }
// }
// }