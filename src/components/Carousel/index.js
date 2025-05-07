
// components/CustomCarousel.js
import React from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import noimg from '../../assets/images/noimg.png';
const CustomCarousel = () => {
    return (
        
<Carousel fade interval={null} className="custom-carousel" indicators={true}>
  <Carousel.Item>
    <div style={{ background: '#ccc' }}>
      <img src={noimg} className="d-block w-100" alt="slide" />
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div style={{ background: '#aaa' }}>
      <img src={noimg} className="d-block w-100" alt="slide" />
    </div>
  </Carousel.Item>
</Carousel>

    );
};

export default CustomCarousel;