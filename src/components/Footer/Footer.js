import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer w-100">
      <Container className="py-5">
        <Row>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0">
            <p className="footer__brand h3 mb-3">FALOKA</p>
            <Link to="#" className="me-4"><FontAwesomeIcon icon={faInstagram} size="lg" /></Link>
            <Link to="#" className="me-4"><FontAwesomeIcon icon={faTwitter} size="lg" /></Link>
            <Link to="#"><FontAwesomeIcon icon={faFacebookSquare} size="lg" /></Link>
            <Link to="/privacy-policy" className="d-block mt-2">Privacy & Policy</Link>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0">
            <p className="h5">Customer Support</p>
            <Link to="#" className="d-block">Info pengiriman</Link>
            <Link to="#" className="d-block">Metode pembayaran</Link>
            <Link to="#" className="d-block">Detail fit dan ukuran</Link>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0">
            <p className="h5">Tentang Faloka</p>
            <Link to="#" className="d-block">Program influencer</Link>
            <Link to="#" className="d-block">Join komunitas kami</Link>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0">
            <Link
              to={{
                pathname: "https://play.google.com/store/apps/details?id=com.faloka.faloka_mobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
              }}
              target="_blank"
            >
              <img className="google-play-logo" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;