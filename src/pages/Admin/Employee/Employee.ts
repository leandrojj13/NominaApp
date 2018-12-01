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

  validIdentification() {
    var cad = this.model.identification;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
      for (var i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

    }
    
    return cad.charAt(longitud - 1) == total;
  }

  saveData() {
    if(!this.validIdentification()) {
      alert('Porfavor introduzca una cedula valida');
      return false;
    }

    this.$validator.validateAll().then(isValid => {
      if (isValid) {
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
    });

  }

  mapEmployee(entryType: EmployeeModel) {
    this.model = JSON.parse(JSON.stringify(entryType));

  }

  cleanModel() {
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
