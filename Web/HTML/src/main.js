import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options = {
  position: "bottom-right",
  timeout: 10000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showProgressBar: true,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
}
app.use(Toast, options)
app.use(router)

app.mount('#app')
