import { BaseModel } from './Generic/BaseModel'
import { MovementType } from './Enums/MovementType';
import { TrasactionStatus } from './Enums/TrasactionStatus';

export class GeneralLedgerModel extends BaseModel {
 
  id:number;
  description:string;
  employeeId: number;
  account: number;
  movementType: MovementType;
  amount: number;
  status: TrasactionStatus;
  
  constructor() {

    super()
    this.id = 0;
    this.description = null;
    this.employeeId = 0;
    this.account = null;
    this.movementType = null;
    this.amount = null;
    this.status = null;

  }

}
