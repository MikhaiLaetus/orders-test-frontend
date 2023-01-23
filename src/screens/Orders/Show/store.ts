import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  initialized = false;
  loading = false;

  constructor(id: string) {
    makeAutoObservable(this);
    this.id = id;
  }

  async loadOrder() {
    this.loading = true;
    this.order = (
      await client
        .query(ORDER_QUERY, {
          number: this.id,
        })
        .toPromise()
    ).data.order;
    this.loading = false;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    if (this.id) {
      this.loadOrder();
    }
  }
}
