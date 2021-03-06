import {createApp} from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'


const rootUrl = 'https://receipe-manager.herokuapp.com'
const app = createApp(App)

try {
    fetch(`${rootUrl}/ingredients/units/`)
    .then(response => response.json())
    .then(data => {
            app.config.globalProperties.$rootUrl = rootUrl
            app.config.globalProperties.$units = data
            app.mount('#app')
        })
} catch (error) {
    console.log(error);
}