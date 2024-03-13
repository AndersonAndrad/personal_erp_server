export interface Project {
  _id: string;
  name: string;
  enabled: boolean;
  tasks: any[];
  /**
   * @Warn save always in cents
   */
  hoursPrice: number;
}
