import React, { useState } from 'react';
import { Nav, Placeholder } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BASE_CONTENT_URL } from '../../../config/api';
import { useQuery } from 'react-query';
import getUserProfile from '../../../helpers/api/get-user-profile';

import { ReactComponent as ChevronUp } from '../../SVG/chevron-up.svg';
import { ReactComponent as ChevronDown } from '../../SVG/chevron-down.svg';
import { ReactComponent as UserIcon } from '../../SVG/user.svg';
import { ReactComponent as BagIcon } from '../../SVG/shopping-bag.svg';

import './Sidebar.scss';

const Sidebar = () => {
    const [profileData, setProfileData] = useState('');
    const [pictureLoaded, setPictureLoaded] = useState(false);

    const {isLoading} = useQuery('user-data', async () => {
        const response = await getUserProfile();
        return response.data;
    },{
        onSuccess: (data) => {
            setProfileData(data);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const handleImageLoaded = () => {
        setPictureLoaded(true);
    }

    const [navlist, setNavlist] = useState(false);
    const showNavlist = () => setNavlist(!navlist);
    const location = useLocation();

    return (
        <div className="tab-account">
            <div className="account-header">
                <div className={`header-image ${!pictureLoaded ? 'placeholder-glow' : ''}`}>
                    {!pictureLoaded ? <Placeholder className="image-profile" bg="secondary" /> : ''}
                    <img alt={profileData.name} className={`image-profile ${!pictureLoaded ? 'd-none' : ''}`} onLoad={handleImageLoaded} src={!isLoading ? `${BASE_CONTENT_URL}${profileData.photo_profile_url}` : ``}/>
                </div>     
                <div className={`header-name ${!pictureLoaded ? 'placeholder-glow' : ''}`}>
                    <span className={!pictureLoaded ? 'col-12 placeholder bg-secondary' : ''}>{pictureLoaded && profileData.name}</span>
                </div>
                <div className="d-md-block d-lg-none">
                    <button type="button" className="btn" onClick={showNavlist}>
                        {navlist ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                    </button>
                </div>
            </div>
            <div className={`account-nav d-lg-block ${navlist ? '' : 'd-none'}`}>
                <Nav className="flex-column">
                    {/* <Nav.Link as={Link} to="/user/profile" className={(location.pathname === "/user/profile"? "active" : "")}>
                        <UserIcon className="icon" />
                        <span>User info</span>
                    </Nav.Link> */}
                    <Nav.Link as={Link} to="/user/transaction" className={(location.pathname === "/user/transaction"? "active" : "")}>
                        <BagIcon className="icon" />
                        <span>Pembelian</span>
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;