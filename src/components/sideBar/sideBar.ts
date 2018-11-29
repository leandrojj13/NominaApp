import { Component, Vue, Watch } from 'vue-property-decorator'
import { Link } from '../navbar/link';

@Component({
  template: require('./sideBar.html')
})
export class SideBarComponent extends Vue {

  constructor() {
    super ()
  }

  links: Link[] = [
    // new Link('Inicio', '/','icon-home'),
    new Link('Tipos de entradas', '/entryTpe','fa fa-university'),
    new Link('Tipos de deducciones', '/deductionType','fa fa-money'),
    new Link('Empleados', '/employee','fa fa-user'),
    new Link('Transacciones', '/transactions','fa fa-mobile'),
    
    //new Link('Tipo Identificaciones', '/tipoIdentificaciones','fa fa-id-card-o'),
    //new Link('Posiciones de trabajo', '/posicionesTrabajo','fa fa-flag-checkered'),
    //new Link('Departamentos', '/departamentos','fa fa-industry'),
    //new Link('competencias', '/competencias', 'fa fa-bolt'),
    //new Link('Idiomas', '/idiomas', 'fa fa-language'),
  ]



  currentPage: string = null;

  @Watch('$route.path')
  pathChanged() {
    this.currentPage = this.$route.path;
    //this.logger.info('Changed current path to: ' + this.$route.path)
  }
}
