import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'vant';
import 'vant/lib/index.css';

import Vant from 'vant';
import "amfe-flexible";
import { Tabbar, TabbarItem } from 'vant';
import { Search } from 'vant';

import { Grid, GridItem } from 'vant';
import { TreeSelect } from 'vant';

import { Sidebar, SidebarItem } from 'vant';
import { NavBar } from 'vant';
import { ShareSheet } from 'vant';

import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { SubmitBar } from 'vant';

import { Checkbox, CheckboxGroup } from 'vant';
import { Dialog } from 'vant';


import { AddressList } from 'vant';

import { Field } from 'vant';

import { AddressEdit } from 'vant';

import { Area } from 'vant';

import { Popup } from 'vant';

Vue.use(Popup);
Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(Field);
Vue.use(AddressList);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ShareSheet);

Vue.use(NavBar);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(TreeSelect);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
