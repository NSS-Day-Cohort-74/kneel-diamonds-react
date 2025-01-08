import { useEffect, useState } from "react"

export const Metals = ({ setter }) => {
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
                        metal => <div key={`metal--${metal.id}`}>
                            <input name="metal"
                                   onChange={() => setter(metal.id) }
                                   type="radio"
                                   value={metal.id} /> {metal.metal}
                        </div>
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
        []
    )

    return <>
        {
            showMetals()
        }
    </>
}
