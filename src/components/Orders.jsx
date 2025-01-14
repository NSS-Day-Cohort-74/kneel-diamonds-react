import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Orders = ({ orders, retrieveOrdersFromAPI }) => {
    let navigate = useNavigate()

    const showOrders = () => {
        return <div>
            {
                orders.map(
                    order => {
                        let totalCost = order.metal.price + order.style.price + order.size.price

                        return <div key={`order--${order.id}`}>Order #{order.id} costs {totalCost.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}
                            <button onClick={() => {
                                fetch(`http://localhost:8000/orders/${order.id}`, { method: "DELETE" })
                                    .then(() => {
                                        retrieveOrdersFromAPI()
                                    })
                            }}>Cancel Order</button>
                            <button onClick={() => navigate("/orders/form",
                                {
                                    state: {
                                        type: "edit",
                                        chosenOrder: order
                                    }
                                })}>Change Order</button>
                        </div>
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

    return <> {showOrders()} </>
}
