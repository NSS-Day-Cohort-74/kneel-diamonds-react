import { useLocation } from "react-router-dom"
import { DiamondSizes } from "./DiamondSizes.jsx"
import { JewelryStyles } from "./JewelryStyles.jsx"
import { Metals } from "./Metals.jsx"
import { OrderButton } from "./NewOrderButton.jsx"
import { EditOrderButton } from "./EditOrderButton.jsx"
import { useEffect, useState } from "react"

export const NewOrder = ({
    placeOrder, chosenMetal, chosenSize, setModifiedOrder,
    chosenStyle, setChosenMetal, setChosenSize,
    setChosenStyle, editOrder }) => {

    const [apiOrder, setAPIOrder] = useState({ id: 0 })
    const location = useLocation();

    setModifiedOrder(location.state.chosenOrder)

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
        <Metals setter={setChosenMetal} chosenMetal={chosenMetal} order={apiOrder} />
        <JewelryStyles setter={setChosenStyle} order={apiOrder} chosenStyle={chosenStyle} />
        <DiamondSizes setter={setChosenSize} order={apiOrder} chosenSize={chosenSize} />

        {
            location?.state?.type === "create"
                ? <OrderButton orderPlacer={placeOrder} />
                : <EditOrderButton orderPlacer={editOrder} />
        }

    </article>
}
