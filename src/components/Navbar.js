import { NavLink } from 'react-router-dom/dist';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between gap-2 p-[20px] text-white bg-gradient-to-r from-transparentBlack to-transparentBlack">
            <label>LOGO</label>
            <ul className="flex items-center justify-end gap-4">
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/add-product'>Add Product</NavLink>
                </li>
                <li>
                    <NavLink to='/customer-purchases'>Customer purchases</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar