import { GenericPage, Component, Vue } from '../baseExporter'
import { DeductionTypeModel } from '../../../Models/DeductionTypeModel'
import axios from 'axios'

@Component({
  template: require('./DeductionType.html'),
  components: {}
})
export class DeductionType extends GenericPage<DeductionTypeModel> {

  deductionTypes: Array<DeductionTypeModel> = [];
  constructor() {
    super('', {
      name: {
        label: 'Nombre',
        sortable: true
      },
     
    }, DeductionTypeModel)
  }

  mounted() {
    this.uri += 'DeductionType';
    this.getData();
  }

  getData() {
    axios.get(this.uri).then((response) => {
      this.deductionTypes = response.data
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
        this.model = new DeductionTypeModel();
        this.getData();
        alert("Editado Correctamente")
      }).catch(() => {
        alert("Error")
      })

    } else {

      axios.post(this.uri, this.model).then((response) => {
        alert('Guardaddo Correctamente');
        this.getData();
        this.model = new DeductionTypeModel();

      }).catch(() => {
        alert("Error")
      })
    }

  }

  mapDeductionType(entryType: DeductionTypeModel) {
    this.model = JSON.parse(JSON.stringify(entryType));

  }

  cleanModel(){
    this.model = new DeductionTypeModel();
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
