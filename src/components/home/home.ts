import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'

import './home.scss'

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class HomeComponent extends Vue {

  package: string = 'vue-webpack-typescript'
  repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript'
  mode: string = process.env.ENV

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  currentMonth = this.monthNames[new Date().getMonth()]

  goToGenerar(){
    this.$router.push({ name: 'gldDetail', params: { mes: new Date().getMonth() + 1}} as any)
  }
}
