import { useState } from 'react';

import { NavLink } from 'react-router-dom/dist';
import { FaBars } from 'react-icons/fa6';

const Navbar = () => {
    const [showMobileNav, setShowMobileNav] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between gap-2 p-[20px] text-white bg-gradient-to-r from-transparentBlack to-transparentBlack">
                <label>LOGO</label>
                <ul className="sm:flex items-center justify-end gap-4 hidden">
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add-product'>Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink to='/customer-purchases'>Customer purchases</NavLink>
                    </li>
                    <li>
                        <NavLink to='/create-purchase'>Create purchase</NavLink>
                    </li>
                </ul>
                <FaBars className='text-[25px] cursor-pointer block sm:hidden' onClick={() => setShowMobileNav(prev => !prev)} />
            </nav>

            <ul className={`absolute flex flex-col items-start justify-start gap-4 p-[20px] bg-white transform duration-300 shadow-md rounded-md ${showMobileNav ? 'left-[20px]' : 'left-[-100%]'}`}>
                <li>
                    <NavLink to='/' onClick={() => setShowMobileNav(false)}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/add-product' onClick={() => setShowMobileNav(false)}>Add Product</NavLink>
                </li>
                <li>
                    <NavLink to='/customer-purchases' onClick={() => setShowMobileNav(false)}>Customer purchases</NavLink>
                </li>
                <li>
                    <NavLink to='/create-purchase' onClick={() => setShowMobileNav(false)}>Create purchase</NavLink>
                </li>
            </ul>
        </>
    );
}

export default Navbar