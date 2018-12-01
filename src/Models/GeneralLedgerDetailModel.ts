import { BaseModel } from './Generic/BaseModel'
export class GeneralLedgerDetailModel extends BaseModel {

  employeeTotalAfected :number;
  rosterMonthMonth: string;
  totalRosterAmount: number;
  employees: Array<any>;

  constructor() {

    super()
  
        this.employeeTotalAfected = null;
        this.rosterMonthMonth = null;
        this.totalRosterAmount = null;
        this.employees = [];
  }

}
