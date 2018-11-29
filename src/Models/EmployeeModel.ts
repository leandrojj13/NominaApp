import { BaseModel } from './Generic/BaseModel'
export class EmployeeModel extends BaseModel {
  id:number;
  name:string;
  identification: string;
  department: string;
  jobTitle: string;
  montSalary: number;
  rosterId: number;

  constructor() {

    super()
    this.id = 0;
    this.name = null;
    this.identification = null;
    this.department = null;
    this.jobTitle = null;
    this.montSalary = null;
    this.rosterId = null;
  }

}
