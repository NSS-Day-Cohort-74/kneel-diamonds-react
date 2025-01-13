import { useState } from 'react'
import { Orders } from './Orders.jsx'
import { Metals } from './Metals.jsx'
import { DiamondSizes } from './DiamondSizes.jsx'
import { JewelryStyles } from './JewelryStyles.jsx'
import { OrderButton } from './NewOrderButton.jsx'
import './KneelDiamonds.css'
import { Navbar } from './NavBar.jsx'
import { Route, Routes } from 'react-router-dom'

function KneelDiamonds() {
  const [chosenMetal, setChosenMetal] = useState(0)
  const [chosenSize, setChosenSize] = useState(0)
  const [chosenStyle, setChosenStyle] = useState(0)




  const [orders, setOrders] = useState([])

  const retrieveOrdersFromAPI = async () => {
    const request = await fetch("http://localhost:8000/orders?_expand=metal&_expand=size&_expand=style")
    const apiOrders = await request.json()
    setOrders(apiOrders)
  }






  const placeOrder = () => {
    if (chosenMetal > 0 && chosenSize > 0 && chosenStyle > 0) {
      fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          metalId: chosenMetal,
          styleId: chosenStyle,
          sizeId: chosenSize
        })
      })
        .then(() => retrieveOrdersFromAPI())
    }
    else {
      window.alert("Please choose all three options - metal, size, and style")
    }
  }


  return (
    <>
      <Navbar />
      <h1>Kneel Diamonds</h1>

      <Routes>
        <Route path="/" element={
          <article style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            columnGap: "5rem"
          }}>
            <Metals setter={setChosenMetal} />
            <JewelryStyles setter={setChosenStyle} />
            <DiamondSizes setter={setChosenSize} />
            <OrderButton orderPlacer={placeOrder} />
          </article>

        } />

        <Route path="/orders" element={
          <Orders orders={orders} retrieveOrdersFromAPI={retrieveOrdersFromAPI} />
        } />
      </Routes>

    </>
  )
}

export default KneelDiamonds
