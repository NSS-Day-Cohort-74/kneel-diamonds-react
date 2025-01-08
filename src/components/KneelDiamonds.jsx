import { useState } from 'react'
import { Orders } from './Orders.jsx'
import { Metals } from './Metals.jsx'
import { DiamondSizes } from './DiamondSizes.jsx'
import { JewelryStyles } from './JewelryStyles.jsx'
import { OrderButton } from './NewOrderButton.jsx'
import './KneelDiamonds.css'

function KneelDiamonds() {
  const [chosenMetal, setChosenMetal] = useState(0)
  const [chosenSize, setChosenSize] = useState(0)
  const [chosenStyle, setChosenStyle] = useState(0)

  const placeOrder = () => {
    fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        metal: chosenMetal,
        style: chosenStyle,
        size: chosenSize
      })
    })
  }


  return (
    <>
      <h1>Kneel Diamonds</h1>

      <Metals setter={setChosenMetal} />
      <JewelryStyles />
      <DiamondSizes />
      <OrderButton orderPlacer={placeOrder} />
      <Orders />
    </>
  )
}

export default KneelDiamonds
