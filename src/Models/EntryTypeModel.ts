import { BaseModel } from './Generic/BaseModel'
export class EntryTypeModel extends BaseModel {
  id:number;
  name:string;
  salaryDepend: boolean;

  constructor() {

    super()
    this.id = 0;
    this.name = null;
    this.salaryDepend = false;
  }

}
