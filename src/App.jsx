import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import your custom styles
import gorillazHeader from '/kinggizzard-header.jpg';
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await fetch('https://w0483925-tickethub-api-ehddawaqa0e0dzca.canadacentral-01.azurewebsites.net/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
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
    <div className="page-container">
      <div className="App">
        <header className="header text-center">
          <div className="header-content">
            <h1 className="text-center">TicketHub</h1>

            <img src={gorillazHeader} alt="Gorillaz Header" className="header-image" />
            <h2 className="band-name">King Gizzard & The Lizard Wizard</h2> {/* Added band name */}
          </div>
        </header>
        <div className="container mt-4">
          <h2>You're almost there!</h2>

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
          </div>
        </div>
        <footer className="footer bg-dark text-white text-center py-3 mt-4">
          <div className="container">
            <p className="mb-0">© 2025 TicketHub. All rights reserved.</p>
            <p className="mb-0">
              <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a> |
              <a href="/terms" className="text-white text-decoration-none"> Terms of Service</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;