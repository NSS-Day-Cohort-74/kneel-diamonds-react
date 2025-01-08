export const OrderButton = ({ orderPlacer }) => {

    return <article>
        <button onClick={orderPlacer} id="orderButton">Create Custom Order</button>
    </article>
}