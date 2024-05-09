import { Paginated } from './paginated-filter.interface';

export interface Project {
  _id: string;
  name: string;
  enabled: boolean;
  tasks: any[];
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
