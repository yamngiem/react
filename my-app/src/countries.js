import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'; // Lisää tämä rivi
import Col from 'react-bootstrap/Col'; // Lisää tämä rivi
import 'bootstrap/dist/css/bootstrap.min.css';
import './countries.css';



function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
            if (!response.ok) {
                throw new Error('Virhe haettaessa tietoja');
            }
            const data = await response.json();

            // Järjestä maat aakkosjärjestykseen
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            setCountries(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };


    const fetchCountryDetails = async (countryName) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            if (!response.ok) {
                throw new Error('Virhe haettaessa maan tietoja');
            }
            const data = await response.json();
            setSelectedCountry(data[0]);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <Container
    style={{ Height: '100vh' }} // Muutetaan maxHeight -> minHeight
    className="d-flex flex-column justify-content-start align-items-center"
>
    <div>
        {loading && <p>Ladataan tietoja...</p>}
        {error && <p>{error}</p>}

        <Dropdown>
            <Dropdown.Toggle
                id="dropdown-basic-button"
                className="custom-toggle"
            >
                Valitse maa
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{ maxHeight: '200px', overflowY: 'auto', margin: 0, padding: 0 }}
                className="custom-dropdown"
            >
                {countries.map((country, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => fetchCountryDetails(country.name.common)}
                    >
                        <img src={country.flags.svg} alt={`${country.name.common} lippu`} style={{ width: '20px', marginRight: '10px' }} />
                        {country.name.common}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>

        {selectedCountry && (
            <Card className='countrycard' style={{ width: '100%', marginTop: '20px', padding: '20px' }}>
                <Row>
                    <Col xs={4}>
                        <Card.Img
                            variant="top"
                            src={selectedCountry.flags.svg}
                            alt={`${selectedCountry.name.common} lippu`}
                            style={{ width: '100%', height: 'auto', maxWidth: '150px' }}
                        />
                    </Col>
                    <Col xs={8}>
                        <Card.Body>
                            <Card.Title>{selectedCountry.name.common}</Card.Title>
                            <Card.Text>
                                Pääkaupunki: {selectedCountry.capital ? selectedCountry.capital[0] : 'Ei pääkaupunkia'}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Väkiluku: {selectedCountry.population}</ListGroup.Item>
                            <ListGroup.Item>Alue: {selectedCountry.area} km²</ListGroup.Item>
                            <ListGroup.Item>Kielet: {Object.values(selectedCountry.languages).join(', ')}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card>
        )}
    </div>
</Container>

    );
}

export default Countries;
