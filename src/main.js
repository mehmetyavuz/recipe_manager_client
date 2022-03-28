import {createApp} from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
// .component("font-awesome-icon", FontAwesomeIcon)
getUnits()
function getUnits() {
    try {
        fetch('https://receipe-manager.herokuapp.com/ingredients/units/')
            .then(response => response.json())
            .then(data => {
                app.config.globalProperties.$units = data
                app.mount('#app')
            })
    } catch (error) {
        console.log(error);
    }
}