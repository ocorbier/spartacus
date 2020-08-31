import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { UserReplenishmentOrderAdapter } from './user-replenishment-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserReplenishmentOrderConnector {
  constructor(protected adapter: UserReplenishmentOrderAdapter) {}

  // public get(userId: string,orderCode: string): Observable<ReplenishmentOrder> {
  //   return this.adapter.get(userId, orderCode);
  // }

  public getHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReplenishmentOrderList> {
    return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
  }
}
