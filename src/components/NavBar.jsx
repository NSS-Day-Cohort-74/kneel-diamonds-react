import { Link } from "react-router-dom"

export const Navbar = () => {
    return <nav>
        <Link to="/">Place an Order</Link>
        <Link to="/orders">View Past Order</Link>
    </nav>
}