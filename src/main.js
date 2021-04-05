import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import VCharts from 'v-charts';

import {
  Layout,
  Menu,
  Icon,
  Form,
  FormModel,
  Input,
  Checkbox,
  Button,
  Message,
  Tooltip,
  Row,
  Col,
  Spin,
  Breadcrumb,
  Dropdown,
  Card,
  Select,
  Table,
  Modal,
  Steps,
  Upload,


} from 'ant-design-vue';
Vue.use(VCharts)

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Col)
Vue.use(Spin)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(Card)
Vue.use(Select)
Vue.use(Table)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(Modal)















Vue.prototype.$Message = Message
Vue.prototype.$confirm = Modal.confirm





Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')