import {GenericPage, Component, Vue} from '../baseExporter'
import {EmployeeModel} from '../../../Models/EmployeeModel'
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
    var ced = this.model.identification;
    var c = ced.replace(/-/g, '');
    var cedula = c.substr(0, c.length - 1);
    var verificador = c.substr(c.length - 1, 1);
    var suma = 0;
    var cedulaValida = 0;
    if (ced.length < 11) {
      return false;
    }
    for (var i = 0; i < cedula.length; i++) {
      var mod = "";
      if ((i % 2) == 0) {
        mod = 1
      } else {
        mod = 2
      }
      var res = cedula.substr(i, 1) * mod;
      if (res > 9) {
        res = res.toString();
        var uno = res.substr(0, 1);
        var dos = res.substr(1, 1);
        res = eval(uno) + eval(dos);
      }
      suma += eval(res);
    }
    var el_numero = (10 - (suma % 10)) % 10;

    return el_numero == verificador && cedula.substr(0, 3) != "000";
  }

  saveData() {
    if (!this.validIdentification()) {
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
