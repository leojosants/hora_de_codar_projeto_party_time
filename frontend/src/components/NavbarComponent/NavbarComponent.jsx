import {
    NavLink
} from 'react-router-dom';

import './NavbarComponent.css';

const Navbar = () => {
    return (
        <nav id='id-navbar'>
            <h2>
                Party Time!
            </h2>

            <ul>
                <li>
                    <NavLink to='/'>
                        Minhas Festas
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className='class-button'
                        to='/party/new'
                    >
                        Criar Festas
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
    
export default Navbar;