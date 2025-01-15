import { useEffect, useState } from "react"

export const DiamondSizes = ({ setter, order, chosenSize }) => {
    const [diamondSizes, setDiamondSizes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            if ("id" in order) {
                setter(order.sizeId)
            }
        },
        [order]
    )

    const retrieveDiamondSizesFromAPI = async () => {
        const request = await fetch("http://localhost:8000/sizes")
        const apiDiamondSizes = await request.json()
        setDiamondSizes(apiDiamondSizes)
        setLoading(false)
    }

    const showDiamondSizes = () => {
        if (!loading) {
            return <div>
                <h2>Choose a Size</h2>
                {
                    diamondSizes.map(
                        diamondSize => <div key={`diamondSize--${diamondSize.id}`}>
                            <input name="diamondSize"
                                   type="radio"
                                   checked={diamondSize.id === chosenSize}
                                   onChange={() => setter(diamondSize.id) }
                                   value={diamondSize.id}  /> {diamondSize.carets}
                        </div>
                    )
                }
            </div>
        }

        return <h3>Loading diamondSizes...</h3>
    }

    useEffect(
        () => {
            retrieveDiamondSizesFromAPI()
        },
        []
    )

    return <>
        {
            showDiamondSizes()
        }
    </>
}
