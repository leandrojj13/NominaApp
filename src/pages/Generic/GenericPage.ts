import { Vue }  from 'vue-property-decorator'

export class  GenericPage<T> extends Vue {

  baseUrl = "https://integracion-opensource.azurewebsites.net/api/";
  uri= this.baseUrl;
  fields: Object = {};
  items: Array<Object> = [];
  model: T 
  constructor(stringEndPoint, columnsDef, private modelType) {
    super()
    columnsDef.acciones = {};
    this.fields = columnsDef
    this.model = new modelType();
  }


  editar(item: any) {

  }
  borrar(item: any) {

  }

  limpiarModelo() {
    this.model = new this.modelType();
  }

  getTableInformation(ctx, callback) {
    // Do AJax Call

    var items: Array<Object> = [
      { Id: 40, Nombre: 'Dickerson', Codigo: 'Macdonald', Adicional: { Numeracion: 5 } },
      { Id: 21, Nombre: 'Larsen', Codigo: 'Shaw' },
      { Id: 89, Nombre: 'Geneva', Codigo: 'Wilson' },
      { Id: 38, Nombre: 'Jami', Codigo: 'Carney' }
    ]
    setTimeout(() => callback(items), 2000)

    return null;
  }

}
