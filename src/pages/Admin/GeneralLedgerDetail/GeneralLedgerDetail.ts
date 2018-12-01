import { GenericPage, Component } from '../baseExporter'
import { GeneralLedgerDetailModel } from '../../../Models/GeneralLedgerDetailModel';
import axios from 'axios'

@Component({
    template: require('./GeneralLedgerDetail.html'),
    components: {}
})
export class GeneralLedgerDetail extends GenericPage<GeneralLedgerDetailModel> {

    constructor() {
        super('', {
            name: {
                label: 'Nombre',
                sortable: true
            },

        }, GeneralLedgerDetailModel)
    }
    mounted() {
        this.uri += 'GeneralLedger/GenerateMontNomina/' + this.$route.params.mes;
        this.getData();
    }
    getData(): any {
        axios.get(this.uri).then((response) => {
            this.model = response.data
        }).catch(() => {
            alert("Error")
        })
    }

}
