import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BASE_CONTENT_URL } from '../../../config/api';

import { ReactComponent as ChevronUp } from '../../SVG/chevron-up.svg';
import { ReactComponent as ChevronDown } from '../../SVG/chevron-down.svg';
import { ReactComponent as UserIcon } from '../../SVG/user.svg';
import { ReactComponent as BagIcon } from '../../SVG/shopping-bag.svg';

import './Sidebar.scss';

const Sidebar = ({ account }) => {
    const [navlist, setNavlist] = useState(false);
    const showNavlist = () => setNavlist(!navlist);
    const location = useLocation();

    return (
        <div className="tab-account">
            <div className="account-header">
                <div className="header-image">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"/>
                </div>
                <div className="header-name">
                    <span>Ahmad Ilham Santosa</span>
                </div>
                <div className="d-xl-block d-xxl-none">
                    <button type="button" className="btn" onClick={showNavlist}>
                        {navlist ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                    </button>
                </div>
            </div>
            <div className={`account-nav d-xxl-block ${navlist ? '' : 'd-none'}`}>
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/user/profile" className={(location.pathname == "/user/profile"? "active" : "")}>
                        <UserIcon className="icon" />
                        <span>User info</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/transaction" className={(location.pathname == "/user/transaction"? "active" : "")}>
                        <BagIcon className="icon" />
                        <span>Pembelian</span>
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;