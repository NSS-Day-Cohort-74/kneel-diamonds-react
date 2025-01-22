import { useState, useEffect } from 'react'
import { Orders } from './Orders.jsx'
import { Navbar } from './NavBar.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NewOrder } from './NewOrder.jsx'
import './KneelDiamonds.css'

function KneelDiamonds() {
    const [chosenMetal, setChosenMetal] = useState(0)
    const [chosenSize, setChosenSize] = useState(0)
    const [chosenStyle, setChosenStyle] = useState(0)
    const [orderBeingModified, setModifiedOrder] = useState({})
    const [orders, setOrders] = useState([])

    const retrieveOrdersFromAPI = async () => {
        const request = await fetch("http://localhost:8000/orders?_expand=metal&_expand=size&_expand=style")
        const apiOrders = await request.json()
        setOrders(apiOrders)
    }

    useEffect(() => {
        retrieveOrdersFromAPI()
    }, [])

    const editOrder = () => {
        fetch(`http://localhost:8000/orders/${orderBeingModified.id}`, {
            method: "PUT",
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

    let navigate = useNavigate()


    return (
        <>
            <Navbar />
            <h1>Kneel Diamonds</h1>

            <Routes>
                <Route path="/" element={
                    <button onClick={() => navigate("/orders/form",
                        {
                            state: {
                                type: "create"
                            }
                        }
                    )}>Place New Order</button>
                } />

                <Route path="/orders" element={
                    <Orders orders={orders} retrieveOrdersFromAPI={retrieveOrdersFromAPI} />
                } />

                <Route path="/orders/form" element={
                    <NewOrder setChosenMetal={setChosenMetal}
                        setChosenSize={setChosenSize}
                        setChosenStyle={setChosenStyle}
                        chosenMetal={chosenMetal}
                        chosenSize={chosenSize}
                        chosenStyle={chosenStyle}
                        placeOrder={placeOrder}
                        editOrder={editOrder}
                        setModifiedOrder={setModifiedOrder}
                        type="create" />
                } />
            </Routes>

        </>
    )
}

export default KneelDiamonds
