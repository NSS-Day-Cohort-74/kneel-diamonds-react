import { useEffect, useState } from "react"

export const JewelryStyles = () => {
    const [jewelryStyles, setJewelryStyles] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveJewelryStylesFromAPI = async () => {
        const request = await fetch("http://localhost:8000/styles")
        const apiJewelryStyles = await request.json()
        setJewelryStyles(apiJewelryStyles)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    const showJewelryStyles = () => {
        if (!loading) {
            return <div>
                {
                    jewelryStyles.map(
                        jewelryStyle => <div key={`jewelryStyle--${jewelryStyle.id}`}>
                            <input
                                name="jewelryStyle"
                                type="radio"
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
