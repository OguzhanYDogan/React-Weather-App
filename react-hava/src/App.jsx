import { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [bilgi, setBilgi] = useState(null);
  const refYer = useRef(null);

  const ara = function (yer) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${yer}&appid=56e3cd18c561ac2ed2b45e4a1712a7e4&units=metric&lang=tr`)
      .then(response => {
        setBilgi({
          name: response.data.name,
          country: response.data.sys.country,
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        })

      })
      .catch(error => {
        toast.error("Aradığınız şehir bulunamadı!")
      });
  }

  useEffect(() => {
    ara("Ankara")
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ara(refYer.current.value);
  }

  return (
    <>
      <Container style={{ maxWidth: 500 }}>
        <h1 className='mb-4 text-white fw-bold'>Hava Durumu</h1>
        <Form className='mb-4' onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control ref={refYer} placeholder='Hava Durumunu öğrenmek istediğin şehir adını yazınız... ' required className='fw-bold' />
            <button type='submit' className='ara'>Ara</button>
          </InputGroup>
        </Form>
        <ToastContainer />
        {bilgi &&
          <div className='kart mt-5'>
            <div className='icon'>
              <img variant="top" className='resim' src={`https://openweathermap.org/img/wn/${bilgi.icon}@2x.png`} />

            </div>

            <div className='info d-flex'>
              <span className='sicaklik'>{Math.round(bilgi.temp)}&deg;</span>
              <span className='bilgi'>{bilgi.description} <br /> {bilgi.name}, {bilgi.country}</span>
              <span className='tarih'>{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', weekday: 'long' })}</span>
            </div>

          </div>
        }
      </Container>
    </>
  );
};

export default App;
