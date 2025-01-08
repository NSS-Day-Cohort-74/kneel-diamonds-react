import { useEffect, useState } from "react"

export const DiamondSizes = () => {
    const [diamondSizes, setDiamondSizes] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveDiamondSizesFromAPI = async () => {
        const request = await fetch("http://localhost:8000/sizes")
        const apiDiamondSizes = await request.json()
        setDiamondSizes(apiDiamondSizes)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const showDiamondSizes = () => {
        if (!loading) {
            return <div>
                {
                    diamondSizes.map(
                        diamondSize => <div key={`diamondSize--${diamondSize.id}`}>
                            <input name="diamondSize"
                                   type="radio"
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
