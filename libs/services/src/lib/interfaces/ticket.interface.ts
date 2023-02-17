import { PriorityEnum } from './../enums/priority.enum';

export interface Ticket {
  ticketDetails: string;
  customerName: string;
  date: string;
  priority: PriorityEnum;
  ticketId?: string;
}
