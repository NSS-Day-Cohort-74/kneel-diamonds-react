import { useEffect, useState } from "react"

export const JewelryStyles = ({ setter, order }) => {
    const [jewelryStyles, setJewelryStyles] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveJewelryStylesFromAPI = async () => {
        const request = await fetch("http://localhost:8000/styles")
        const apiJewelryStyles = await request.json()
        setJewelryStyles(apiJewelryStyles)
        setLoading(false)
    }

    const showJewelryStyles = () => {
        if (!loading) {
            return <div>
                <h2>Choose a Style</h2>
                {
                    jewelryStyles.map(
                        jewelryStyle => <div key={`jewelryStyle--${jewelryStyle.id}`}>
                            <input onChange={() => setter(jewelryStyle.id) }
                                name="jewelryStyle"
                                type="radio"
                                checked={jewelryStyle.id === order.styleId}
                                value={jewelryStyle.id} /> {jewelryStyle.style}
                        </div>
                    )
                }
            </div>
        }

        return <h3>Loading jewelryStyles...</h3>
    }

    useEffect(
        () => {
            retrieveJewelryStylesFromAPI()
        },
        []
    )

    return <>
        {
            showJewelryStyles()
        }
    </>
}
