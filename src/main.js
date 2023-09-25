import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
// import "primevue/resources/themes/bootstrap4-light-blue/theme.css"
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";
import Checkbox from 'primevue/checkbox';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import InputMask from 'primevue/inputmask';
import InputSwitch from 'primevue/inputswitch';
import VueSidebarMenu from 'vue-sidebar-menu'
import Sidebar from 'primevue/sidebar';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
/*eslint-disable*/
const app = createApp(App)
app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(VueSidebarMenu)
app.component('Sidebar', Sidebar);

app.component('Divider', Divider);
app.component('Password', Password);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('TabView', TabView);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('TabPanel', TabPanel);
app.component('Dialog', Dialog);
app.component('RadioButton', RadioButton);
app.component('InputMask', InputMask);
app.mount('#app');
