import { GenericPage, Component, Vue } from '../baseExporter'
import axios from 'axios'
import { TransactionModel } from '../../../Models/TransactionModel';
import { EmployeeModel } from '../../../Models/EmployeeModel';
import { DeductionTypeModel } from '../../../Models/DeductionTypeModel';
import { EntryTypeModel } from '../../../Models/EntryTypeModel';

@Component({
    template: require('./Transaction.html'),
    components: {}
})
export class Transaction extends GenericPage<TransactionModel> {

    transactions: Array<TransactionModel> = [];
    employees: Array<EmployeeModel> = [];
    deducciones: Array<DeductionTypeModel> = [];
    entradas: Array<EntryTypeModel> = [];
    valueTipoTransaccion = null;
    optionsTipoTransaccion = [
        { name: 'Deducción', id: 1 },
        { name: 'Entrada', id: 2 }
    ];
    constructor() {
        super('', {
            name: {
                label: 'Nombre',
                sortable: true
            },

        }, TransactionModel)
    }

    mounted() {
        this.uri += 'Transaction';
        this.getData();
        this.getEmpleados();
        this.getDeducciones();
        this.getEntradas();
    }

    getEntradas() {
        axios.get(this.baseUrl + "EntryType").then((response) => {
            this.entradas = response.data
        }).catch(() => {
            alert("Error")
        })
    }

    getEmpleados() {
        axios.get(this.baseUrl + "Employee").then((response) => {
            this.employees = response.data
        }).catch(() => {
            alert("Error")
        })
    }

    getDeducciones() {
        axios.get(this.baseUrl + "DeductionType").then((response) => {
            this.deducciones = response.data
        }).catch(() => {
            alert("Error")
        })

    }

    getData() {
        axios.get(this.uri).then((response) => {
            this.transactions = response.data
        }).catch(() => {
            alert("Error")
        })
    }

    saveData() {

        this.$validator.validateAll().then(isValid => {
            if (isValid) {

                this.model.employeeId = this.model.employeeObj.id;

                if (this.valueTipoTransaccion && this.valueTipoTransaccion.id == 1) {
                    this.model.deductionTypeId = this.model.deduccionObj ? this.model.deduccionObj.id : null;
                } else {
                    this.model.entryTypeId = this.model.entradaObj ? this.model.entradaObj.id : null;
                }

                if (this.model.id) {
                    axios.put(this.uri + '/' + this.model.id, this.model).then(() => {
                        this.model = new TransactionModel();
                        this.getData();
                        alert("Editado Correctamente")
                    }).catch(() => {
                        alert("Error")
                    })

                } else {

                    axios.post(this.uri, this.model).then((response) => {
                        alert('Guardado Correctamente');
                        this.getData();
                        this.model = new TransactionModel();

                    }).catch(() => {
                        alert("Error")
                    })
                }
            }
        });
    }

    mapTransaction(transaction: TransactionModel) {
        this.model = JSON.parse(JSON.stringify(transaction));
        this.model.employeeObj = this.employees.filter(x => x.id == transaction.employeeId)[0];
        if (this.model.deductionTypeId) {
            this.model.deduccionObj = this.deducciones.filter(x => x.id == transaction.deductionTypeId)[0];
            this.valueTipoTransaccion = this.optionsTipoTransaccion.filter(x => x.id == 1)[0];
        } else {
            this.model.entradaObj = this.entradas.filter(x => x.id == transaction.entryTypeId)[0];
            this.valueTipoTransaccion = this.optionsTipoTransaccion.filter(x => x.id == 2)[0];
        }

    }

    cleanModel() {
        this.valueTipoTransaccion = null;
        this.model = new TransactionModel();
    }

    deleteData(transaction) {

        var result = confirm("Esta seguro que desea borrar " + transaction.name)
        if (result) {
            axios.delete(this.uri + '/' + transaction.id).then(() => {
                alert(" Borrado Correctamente")
                this.getData();

            }).catch(() => {
                alert("Error")
            })

        }


    }
}
