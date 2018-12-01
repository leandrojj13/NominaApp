import { GenericPage, Component } from '../baseExporter'
import axios from 'axios'
import { GeneralLedgerModel } from '../../../Models/GeneralLedgerModel';

@Component({
    template: require('./GeneralLedger.html'),
    components: {}
})
export class GeneralLedger extends GenericPage<GeneralLedgerModel> {

    monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    currentMonth = this.monthNames[new Date().getMonth()]

    generalLedgers = [];
    constructor() {
        super('', {
            name: {
                label: 'Nombre',
                sortable: true
            },

        }, GeneralLedgerModel)
    }
    mounted() {
        this.uri += 'GeneralLedger';
        this.getData();
    }
    getData(): any {
        axios.get(this.uri).then((response) => {
            this.generalLedgers = response.data
        }).catch(() => {
            alert("Error")
        })
    }

    goToGenerar() {
        this.$router.push({ name: 'gldDetail', params: { mes: new Date().getMonth() + 1 } } as any)
    }
    goToDetail(generalLedger) {
        this.$router.push({ name: 'gldDetailView', params: { mes: new Date(generalLedger.date).getMonth() + 1, view: true} } as any)
    }
}
