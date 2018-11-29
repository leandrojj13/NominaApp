import { BaseModel } from './Generic/BaseModel'
import { TrasactionStatus } from './Enums/TrasactionStatus';
import { EmployeeModel } from './EmployeeModel';
import { DeductionTypeModel } from './DeductionTypeModel';
import { EntryTypeModel } from './EntryTypeModel';

export class TransactionModel extends BaseModel {
  
  id:number;
  employeeId: number;
  deductionTypeId: number;
  entryTypeId: number;
  date: Date;
  amount :  number;
  status: TrasactionStatus;


  employeeObj: EmployeeModel;
  deduccionObj: DeductionTypeModel;
  entradaObj: EntryTypeModel;
  constructor() {

    super()
    this.id = 0;
    this.employeeId  = 0;
    this.entryTypeId = null;
    this.deductionTypeId = null;
    this.date = new Date();
    this.amount = 0;
    this.status = TrasactionStatus.Processing;
    this.employeeObj = null;
    this.deduccionObj =null;
    this.entradaObj =null;
  }
}
