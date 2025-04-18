import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import your custom styles
import kingGizzardHeader from '/kinggizzard-header.jpg';
import ticketLogo from "/ticket.png";
import scotiabank from "/scotiabank.jpg";
import scotiamap from "/scotia-map.png";
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    concertId: '',
    email: '',
    name: '',
    phone: '',
    quantity: '',
    creditCard: '',
    expiration: '',
    securityCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Retrieve the concertId from the hidden input field
    const concertId = document.querySelector('input[name="concertId"]').value;

    // Combine all form data into a single object
    const jsonData = { ...formData, concertId }; // Add concertId manually

    try {
      console.log(jsonData);
      const response = await fetch('https://w0483925-tickethub-api-ehddawaqa0e0dzca.canadacentral-01.azurewebsites.net/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');

        setFormData({
          concertId: '',
          email: '',
          name: '',
          phone: '',
          quantity: '',
          creditCard: '',
          expiration: '',
          securityCode: '',
          address: '',
          city: '',
          province: '',
          postalCode: '',
          country: '',
        });

        setStep(1);
         
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleNextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  return (

    <>
      <div className="page-container">
        <div className="App">
          <header className="header text-center">
            <div className="header-content">

              <div className='logo-container'>
                <img src={ticketLogo} alt="TicketHub Logo" className="ticket-logo" />
                <h1 className="text-center tickethub">TicketHub</h1>
              </div>

              <img src={kingGizzardHeader} alt="King Gizzard Header" className="header-image" />
              <h2 className="band-name">King Gizzard & The Lizard Wizard</h2> {/* Added band name */}
            </div>
          </header>

          <div className="container mt-4">
            <div>
              <h2 className='text-center mb-4'>You're almost there!</h2>

              <div className="card mx-auto" style={{ maxWidth: '600px' }}> {/* Bootstrap card */}
                <div className="card-body">
                  <form className="form" onSubmit={step === 3 ? submitForm : handleNextStep}>
                    <input type="hidden" name="concertId" value="12345" />
                    {step === 1 && (
                      <fieldset className="mb-4">
                        <legend>Personal Information</legend>
                        <div className="mb-3">
                          <label>Email:</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Phone:</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Next
                        </button>
                      </fieldset>
                    )}

                    {step === 2 && (
                      <fieldset className="mb-4">
                        <legend>Payment Information</legend>
                        <div className="mb-3">
                          <label>Quantity:</label>
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Number of tickets"
                            min="1"
                            max="6"
                            value={formData.quantity || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Credit Card:</label>
                          <input
                            type="text"
                            name="creditCard"
                            className="form-control"
                            placeholder="Credit card number"
                            value={formData.creditCard || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Expiration (MM/YY):</label>
                          <input
                            type="text"
                            name="expiration"
                            className="form-control"
                            placeholder="MM/YY"
                            value={formData.expiration || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Security Code:</label>
                          <input
                            type="text"
                            name="securityCode"
                            className="form-control"
                            placeholder="CVV"
                            value={formData.securityCode || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Next
                        </button>
                      </fieldset>
                    )}

                    {step === 3 && (
                      <fieldset className="mb-4">
                        <legend>Billing Address</legend>
                        <div className="mb-3">
                          <label>Address:</label>
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Street address"
                            value={formData.address || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>City:</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Province:</label>
                          <input
                            type="text"
                            name="province"
                            className="form-control"
                            placeholder="Province/State"
                            value={formData.province || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Postal Code:</label>
                          <input
                            type="text"
                            name="postalCode"
                            className="form-control"
                            placeholder="Postal/ZIP code"
                            value={formData.postalCode || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Country:</label>
                          <input
                            type="text"
                            name="country"
                            className="form-control"
                            placeholder="Country"
                            value={formData.country || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <button className="btn btn-success" type="submit">
                          Submit
                        </button>
                      </fieldset>
                    )}
                  </form>
                </div>
                <div className="vr">
                </div>
              </div>
            </div>

            <div className="vr"></div>

            <div className='venue-container'>
              <h2 className='text-center mb-4'>Your Ticket</h2>
              <hr />
              <h3 className='text-center'>King Gizzard & The Lizard Wizard</h3>
              <h4 className='text-center'>Scotiabank Centre</h4>
              <h5 className='text-center'>Halifax, NS</h5>
              <h5 className='text-center'>October 25, 2025</h5>
              <h5 className='text-center'>7:00 PM</h5>
              <h5 className='text-center'>Section 112, Row 10, Seat 15</h5>
              <hr />
              <h3 className='text-center'>Ticket Price: $129.65</h3>

              <img src={scotiabank} className='venue' alt='Venue image'></img>
              <h3 className='text-center venue-text'>Scotiabank Centre - Halifax</h3>
            </div>
            
          </div>


        </div>

      </div >
      <footer className="bottom bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">© 2025 TicketHub. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a> |
          <a href="/terms" className="text-white text-decoration-none"> Terms of Service</a>
        </p>
      </footer>
    </>
  );
}

export default App;