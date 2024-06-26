import { useState } from 'react';
import TopNavbarAdmin from './Partials/TopNavbarAdmin';
import SideBarAdmin from './Partials/SideBarAdmin';
// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="wrapper">
            <SideBarAdmin auth={user}></SideBarAdmin>
            
            <div className="main">
                <TopNavbarAdmin auth={user}></TopNavbarAdmin>
                
                <main className='content'>{children}</main>
            </div>
        </div>
    );
}
