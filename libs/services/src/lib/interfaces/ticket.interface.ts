import { PriorityEnum } from './../enums/priority.enum';

export interface Ticket {
  ticketDetails: string;
  customerName: string;
  date: number;
  priority: PriorityEnum;
  ticketId?: string;
}
