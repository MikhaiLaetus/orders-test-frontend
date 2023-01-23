import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import OrderStatus from "~/components/OrderStatus";
import DeliveryType from "~/components/DeliveryType";
import Item from "./components/Item";
import { SingleOrderItem } from "./types";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const params: ShowParams = useParams()
    const [state] = React.useState(new OrdersShowStore(params.id));
    
    useEffect(() => {
      if (state.initialized) return;
      state.initialize();
    });
    
    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
          {state.loading && <span>Loading...</span>}
            {!state.loading && (
              <div>
                <div className={styles.head}>
                  <div className={styles.tableRow}>
                    <div>Номер</div>
                    <div>Статус</div>
                    <div>Id</div>
                    <div>Доставка</div>
                    <div>Заказ</div>
                  </div>
                </div>
                {state.order && (
                  <div>
                    <div className={styles.row}>
                      <div className={styles.orderNumber}>{state.order.number}</div>
                      <div>
                        <OrderStatus code={state.order.status} />
                      </div>
                      <div>{state.order.id}</div>
                      <div>
                        <DeliveryType code={state.order.delivery.code} />
                      </div>
                      <div>
                        {state.order.items.map((item: SingleOrderItem) => (
                          <Item key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default OrdersShow;
