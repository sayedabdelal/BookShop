
import { NavLink } from 'react-router-dom';


const LI = ({ to , iconClass, text}) => {
    return (
        <li className="nav__item">
            <NavLink
                to={to}
                className={({ isActive }) => `nav__link ${isActive ? 'active-link' : ''}`}
            >
                <i className={iconClass} />
                <span>{text}</span>
            </NavLink>
        </li>
    );
};

export default LI;
