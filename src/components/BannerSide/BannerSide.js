import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import './BannerSide.scss';

const BannerSide = ({backgroundImage }) => {
  return (
    <Card variant="top" className="sidebanner-card">
      <Link to="#">
        <Card.Img src={backgroundImage} alt="Card image" />
        <Card.ImgOverlay>
          <Button variant="primary">Belanja Sekarang</Button>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};

export default BannerSide;