import { NavLink } from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
    return <div className={'navbar'}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/gameBoard'>Game</NavLink>
    </div>
}