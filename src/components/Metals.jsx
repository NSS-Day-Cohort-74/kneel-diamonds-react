import { useEffect, useState } from "react"

export const Metals = () => {
    const [metals, setMetals] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveMetalsFromAPI = async () => {
        const request = await fetch("http://localhost:8000/metals")
        const apiMetals = await request.json()
        setMetals(apiMetals)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const showMetals = () => {
        if (!loading) {
            return <div>
                {
                    metals.map(
                        metal => <p key={`metal--${metal.id}`}>{metal.metal}</p>
                    )
                }
            </div>
        }

        return <h3>Loading metals...</h3>
    }

    useEffect(
        () => {
            retrieveMetalsFromAPI()
        },
        [] // If blank, only runs after initial render
    )

    return <>
        {
            showMetals()
        }
    </>
}
