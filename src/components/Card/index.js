

// components/CountryCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ country }) => (
    <Card className='border d-flex justify-content-start p-2 flex-row'>
        <div>
            <Card.Img variant="top" src={country.flag} alt={country.name} className="country-flag" />
        </div>
        <div className='p-3'>
            <Card.Title className='fw-bold '>{country.name}</Card.Title>
            <Card.Text className='text-muted'>{country.region}</Card.Text>
        </div>
    </Card>
);

export default CustomCard;
