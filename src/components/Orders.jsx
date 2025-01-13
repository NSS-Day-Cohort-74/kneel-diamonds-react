import { useEffect, useState } from "react"

export const Orders = ({ orders, retrieveOrdersFromAPI }) => {

    const showOrders = () => {
            return <div>
                {
                    orders.map(
                        order => {
                            let totalCost = order.metal.price + order.style.price + order.size.price

                            return <div key={`order--${order.id}`}>Order #${order.id} costs ${totalCost.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}</div>
                        }
                    )
                }
            </div>

    }

    useEffect(
        () => {
            retrieveOrdersFromAPI()
        },
        []
    )

    return <> { showOrders() } </>
}
