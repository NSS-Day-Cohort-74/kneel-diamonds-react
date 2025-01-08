import { useEffect, useState } from "react"

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveOrdersFromAPI = async () => {
        const request = await fetch("http://localhost:8000/orders?_expand=metal&_expand=size&_expand=style")
        const apiOrders = await request.json()
        setOrders(apiOrders)

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const showOrders = () => {
        if (!loading) {
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

        return <h3>Loading orders...</h3>
    }

    useEffect(
        () => {
            retrieveOrdersFromAPI()
        },
        []
    )

    return <>
        {
            showOrders()
        }
    </>
}
