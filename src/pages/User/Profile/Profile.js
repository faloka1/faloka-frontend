import React from 'react';
import { Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../../components/User/Sidebar/Sidebar';
import './Profile.scss';

const Profile = () => {
    return (
        <Container>
            <Row className="profile g-4">
                <Col xs={12} lg={3}>
                    <Sidebar />
                </Col>
                <Col xs={12} lg={9}>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;