
import './App.css'

function App() {
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
  return (
    <div className="App">
      <h1>TicketHub</h1>
      <form onSubmit={submitForm}>
        <label>
          Concert ID:
          <input type="number" name="concertId" required />
        </label>
        <br />

        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />

        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <br />

        <label>
          Phone:
          <input type="tel" name="phone" required />
        </label>
        <br />

        <label>
          Quantity:
          <input type="number" name="quantity" required />
        </label>
        <br />

        <label>
          Credit Card:
          <input type="text" name="creditCard" required />
        </label>
        <br />

        <label>
          Expiration (MM/YY):
          <input type="text" name="expiration" required />
        </label>
        <br />

        <label>
          Security Code:
          <input type="text" name="securityCode" required />
        </label>
        <br />

        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <br />

        <label>
          City:
          <input type="text" name="city" required />
        </label>
        <br />

        <label>
          Province:
          <input type="text" name="province" required />
        </label>
        <br />

        <label>
          Postal Code:
          <input type="text" name="postalCode" required />
        </label>
        <br />

        <label>
          Country:
          <input type="text" name="country" required />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App
