import { GenericPage, Component, Vue } from '../baseExporter'
import { EmployeeModel } from '../../../Models/EmployeeModel'
import axios from 'axios'

@Component({
  template: require('./Employee.html'),
  components: {}
})
export class Employee extends GenericPage<EmployeeModel> {

  employees: Array<EmployeeModel> = [];
  constructor() {
    super('', {
      name: {
        label: 'Nombre',
        sortable: true
      },
     
    }, EmployeeModel)
  }

  mounted() {
    this.uri += 'Employee';
    this.getData();
  }

  getData() {
    axios.get(this.uri).then((response) => {
      this.employees = response.data
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
        this.model = new EmployeeModel();
        this.getData();
        alert("Editado Correctamente")
      }).catch(() => {
        alert("Error")
      })

    } else {

      axios.post(this.uri, this.model).then((response) => {
        alert('Guardaddo Correctamente');
        this.getData();
        this.model = new EmployeeModel();

      }).catch(() => {
        alert("Error")
      })
    }

  }

  mapEmployee(entryType: EmployeeModel) {
    this.model = JSON.parse(JSON.stringify(entryType));

  }

  cleanModel(){
    this.model = new EmployeeModel();
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
