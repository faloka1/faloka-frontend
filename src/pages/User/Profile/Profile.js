import React from 'react';
import { Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../../components/User/Sidebar/Sidebar';
import './Profile.scss';

const Profile = () => {
    return (
        <Container>
            <Row className="profile g-4">
                <Col xs={12} md={2}>
                    <Sidebar />
                </Col>
                <Col xs={12} md={10}>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;