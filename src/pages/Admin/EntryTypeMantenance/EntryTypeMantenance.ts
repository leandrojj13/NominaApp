import { GenericPage, Component, Vue } from '../baseExporter'
import { EntryTypeModel } from '../../../Models/EntryTypeModel'
import axios from 'axios'

@Component({
  template: require('./EntryTypeMantenance.html'),
  components: {}
})
export class EntryTypeMantenance extends GenericPage<EntryTypeModel> {

  entryTypes: Array<EntryTypeModel> = [];
  constructor() {
    super('', {
      name: {
        label: 'Nombre',
        sortable: true
      },
     
    }, EntryTypeModel)
  }

  mounted() {
    this.uri += 'EntryType';
    this.getData();
  }

  getData() {
    axios.get(this.uri).then((response) => {
      this.entryTypes = response.data
    }).catch(() => {
      alert("Error")
    })
  }

  saveData() {
    if (!this.model.name) {
      alert("Favor completar el nombre")

      return false;
    }
    if (this.model.id) {
      axios.put(this.uri + '/' + this.model.id, this.model).then(() => {
        this.model = new EntryTypeModel();
        this.getData();
        alert("Editado Correctamente")
      }).catch(() => {
        alert("Error")
      })

    } else {

      axios.post(this.uri, this.model).then((response) => {
        alert('Guardado Correctamente');
        this.getData();
        this.model = new EntryTypeModel();

      }).catch(() => {
        alert("Error")
      })
    }

  }

  mapEntryType(entryType: EntryTypeModel) {
    this.model = JSON.parse(JSON.stringify(entryType));

  }

  cleanModel(){
    this.model = new EntryTypeModel();
  }

  deleteData(entryType) {

    var result = confirm("Esta seguro que desea borrar " + entryType.name)
    if (result) {
      axios.delete(this.uri + '/' + entryType.id).then(() => {
        alert(" Borrado Correctamente")
        this.getData();

      }).catch(() => {
        alert("Error")
      })

    }


  }
}
