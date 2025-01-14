import { useLocation } from "react-router-dom"
import { DiamondSizes } from "./DiamondSizes.jsx"
import { JewelryStyles } from "./JewelryStyles.jsx"
import { Metals } from "./Metals.jsx"
import { OrderButton } from "./NewOrderButton.jsx"
import { EditOrderButton } from "./EditOrderButton.jsx"
import { useEffect, useState } from "react"

export const NewOrder = ({ placeOrder, setChosenMetal, setChosenSize, setChosenStyle}) => {

    const [apiOrder, setAPIOrder] = useState({id: 0})
    const location = useLocation();

    useEffect(
        () => {
            if (location?.state?.chosenOrder) {
                fetch(`http://localhost:8000/orders/${location.state.chosenOrder.id}`)
                    .then(response => response.json())
                    .then(order => {
                        setAPIOrder(order)
                    })
            }
        },
        []
    )

    return <article style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        columnGap: "5rem"
      }}>
        Type of operation: { location?.state?.type }

        <Metals setter={setChosenMetal} order={apiOrder} />
        <JewelryStyles setter={setChosenStyle} order={apiOrder} />
        <DiamondSizes setter={setChosenSize} order={apiOrder} />

        {
            location?.state?.type === "create"
                ? <OrderButton orderPlacer={placeOrder}  />
                : <EditOrderButton  orderPlacer={placeOrder} />
        }

      </article>
}
