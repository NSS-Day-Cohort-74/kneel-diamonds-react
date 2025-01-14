import { useEffect, useState } from "react"

export const Metals = ({ setter, order }) => {
    const [metals, setMetals] = useState([])
    const [loading, setLoading] = useState(true)

    const retrieveMetalsFromAPI = async () => {
        const request = await fetch("http://localhost:8000/metals")
        const apiMetals = await request.json()
        setMetals(apiMetals)
        setLoading(false)
    }

    const showMetals = () => {
        if (!loading) {
            return <div>
                <h2>Choose a Metal</h2>
                {
                    metals.map(
                        metal => <div key={`metal--${metal.id}`}>
                            <input name="metal"
                                   onChange={() => setter(metal.id) }
                                   type="radio"
                                   checked={metal.id === order.metalId}
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

    return <> { showMetals() } </>
}
