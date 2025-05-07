import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, setRegion } from '../redux/features/countriesSlice';
import Card from '../components/Card';
import CustomCarousel from '../components/Carousel';
import noimg from '../assets/images/noimg.png'
import { TbBrandGoogle } from 'react-icons/tb';
import { FiFacebook, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
const Home = () => {
  const dispatch = useDispatch();
  const { filteredCountries, status, region } = useSelector((state) => state.countries);

  const [visibleCount, setVisibleCount] = useState(10);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(fetchCountries());

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleFilterChange = (regionName) => {
    dispatch(setRegion(regionName));
    setVisibleCount(10);
  };

  return (
    <Container fluid className="px-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Countries</h5>

        {!isMobile && (
          <div className="d-flex justify-content-center mb-3">
            <ButtonGroup>
              {['All', 'Asia', 'Europe'].map((regionName) => (
                <button
                  key={regionName}
                  className={region === regionName ? 'fw-bold px-4 filter-btn uline' : 'px-4 filter-btn'}
                  onClick={() => handleFilterChange(regionName)}
                >
                  {regionName}
                </button>
              ))}
            </ButtonGroup>
          </div>
        )}

        {isMobile && (
          <div
            className="fs-4"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            style={{ cursor: 'pointer' }}
          >
            {showMobileFilter ? '✖' : '☰'}
          </div>
        )}

      </div>

      {isMobile && showMobileFilter && (
        <div className="d-flex justify-content-center mb-3">
          <ButtonGroup>
            {['All', 'Asia', 'Europe'].map((regionName) => (
              <button
                key={regionName}
                className={region === regionName ? 'fw-bold filter-btn uline' : 'filter-btn'}
                onClick={() => handleFilterChange(regionName)}
              >
                {regionName}
              </button>
            ))}
          </ButtonGroup>
        </div>
      )}

      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center">
          <div className="flex-grow-1 border-top me-3" />
          <h2 className="fw-bold mb-0">WELCOME</h2>
          <div className="flex-grow-1 border-top ms-3" />
        </div>
      </div>

      <Row className="align-items-stretch mb-4">
        <Col xs={12} md={9} className="mb-4 mb-md-0">
          <div className="p-2 border h-100 d-flex justify-content-center align-items-center gray-bg">
            <CustomCarousel />
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div className="p-2 border h-100 d-flex justify-content-center align-items-center gray-bg">
            <span className="text-muted">
              <img  className = "img" src={noimg}  />
            </span>
          </div>
        </Col>
      </Row>

      {/* Cards Section */}
      <Row>
        {status === 'loading' ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          filteredCountries.slice(0, visibleCount).map((country, idx) => (
            <Col key={idx} xs={12} md={6} className="mb-4">
              <Card country={country} />
            </Col>
          ))
        )}
      </Row>

      {/* Load More */}
      {visibleCount < filteredCountries.length && (
        <div className="text-center mb-5 mt-4">
          <Button variant="outline-dark" onClick={() => setVisibleCount((prev) => prev + 10)}>
            Load More
          </Button>
        </div>
      )}
      <div className="d-flex justify-content-center gap-3 icon-container mb-3">
        <FiFacebook />
        <FiTwitter />
        <FiLinkedin />
        <FiYoutube />
      </div>
      <div className='mb-3 mt-3'>
        <h5 className='fw-bold mt-3 mb-3 text-center'>Example@email.com</h5>
        <h5 className='fw-bold mb-3 text-center'>Copyright &copy;
          2020 Name. All rights reserved.</h5>
      </div>
    </Container>
  );
};

export default Home;
