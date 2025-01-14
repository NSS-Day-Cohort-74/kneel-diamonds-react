import { Link } from "react-router-dom"

export const Navbar = () => {
    return <nav className="navbar" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        columnGap: "5rem",
        backgroundColor: "fuchsia",
        color: "limegreen",
        padding: "1rem"
    }}>
        <Link to="/">Home</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/orders/form" state={{ type: "create" }}>New Order</Link>
    </nav>
}