import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


//baseURL
const base = 'https://vue3-course-api.hexschool.io/v2/'


const app = {
    data(){
        return{
            userEmail : "",
            userPassword: ""
        }
    },
    methods:{
        login(){
            const url  = `${base}admin/signin`;

            axios({
                method: 'post',
                url,
                data: {
                    "username": this.userEmail,
                    "password": this.userPassword
                  }
              }) 
              .then(res=>{
                const {token,expired} = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                window.location = './products.html';
              })
              .catch(err=>{
                const {error,message} = err.response.data;

                //sweetAlert2 起手式
                Swal.fire({
                    title: "error",
                    text: error ? error.message:message,
                    icon: 'error'
                  })
              })
        }



    }
}



createApp(app).mount("#app")


