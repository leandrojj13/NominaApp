import Vue from 'vue'
import { makeHot, reload } from './util/hot-reload'
import { createRouter } from './router'
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VeeValidate, { Validator } from 'vee-validate';
import VeeValidateEs from 'vee-validate/dist/locale/es';

const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent)
const sideBarComponent = () => import('./components/sideBar').then(({ SideBarComponent }) => SideBarComponent)
const footerTemplateComponent = () => import('./components/footerTemplate').then(({ FooterTemplateComponent }) => FooterTemplateComponent)
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar').then(({ NavbarComponent }) => NavbarComponent)

import './sass/main.scss'

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar'
  const sideBarModuleId = './components/sideBar'
  const footerModuleId = './components/footer'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (require('./components/navbar') as any).NavbarComponent)))

  makeHot(sideBarModuleId, sideBarComponent,
    module.hot.accept('./components/sideBar', () => reload(sideBarModuleId, (require('./components/sideBar') as any).SideBarComponent)))

  makeHot(footerModuleId, footerTemplateComponent,
    module.hot.accept('./components/footerTemplate', () => reload(footerModuleId, (require('./components/footerTemplate') as any).FooterTemplateComponent)))

}

Vue.use(BootstrapVue)
Vue.component('multiselect', Multiselect)

Validator.localize('es', VeeValidateEs);

Vue.use(VeeValidate, {
  locale: 'es',
});

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    'navbar': navbarComponent,
    'sidebar': sideBarComponent,
    'footertemplate': footerTemplateComponent
  }
})
