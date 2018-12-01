import { GenericPage, Component } from '../baseExporter'
import { GeneralLedgerDetailModel } from '../../../Models/GeneralLedgerDetailModel';
import axios from 'axios'

@Component({
    template: require('./GeneralLedgerDetail.html'),
    components: {}
})
export class GeneralLedgerDetail extends GenericPage<GeneralLedgerDetailModel> {

    verButton = true;

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

        if( this.$route.params.view){
            this.verButton = false;
        }

        this.getData();
    }
    getData(): any {
        axios.get(this.uri).then((response) => {
            this.model = response.data
        }).catch(() => {
            alert("Error")
        })
    }

    procesar() {

        var process = {
            "month":  Number.parseInt(this.$route.params.mes),
            "amount": Number.parseFloat(this.model.totalRosterAmount.toString().replace("$", "").replace(",", "")) ,
            "date": new Date()
        };

        axios.post(this.baseUrl + "Accounting", process).then((response) => {
            alert('Procesado.');
            this.$router.push({ name: 'gld' } as any)

        }).catch(() => {
            alert("Error")
        })
    }

}
