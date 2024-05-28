import { Paginated } from './paginated-filter.interface';

export interface Project {
  _id: string;
  name: string;
  enabled: boolean;
  tasks: any[];
  /**
   * @warn used when need register with default indentification
   * @warn used to search by tasks
   */
  hashId: string;
  /**
   * @Warn save always in cents
   */
  hoursPrice: number;
  expectedHoursPerDay: number;
}

export interface Filter extends Paginated {
  status?: boolean[];
  name?: string;
}
