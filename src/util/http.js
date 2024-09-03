import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function NewUser({ name, email, password }) {
  try {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User created:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function fetchUsers(data) { 
  try {
      const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }); 

      const responseData = await response.json(); // Parse the response as JSON

      if (!response.ok) {
          // If the response is not ok, throw an error with the message from the backend
          throw new Error(responseData.error || 'Unknown error');
      }

      return responseData; // Return the successful response data
  } catch (error) {
      console.error('Error:', error.message);
      throw error; // Re-throw the error for further handling
  }
}

export  async  function fetchBooks() {
    const data = await fetch('http://127.0.0.1:5000/shop');
   

    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    return data.json();
}

export async function submitCartData(formData, cartItems) {
  const response = await fetch('httpffffff/checkout.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer: {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        cardNumber: formData.cardNumber,
        cardholderName: formData.cardholderName,
        phone: formData.phone,
        cvv: formData.cvv,
        expiryDate: formData.expiryDate,
      },
      cartItems: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();  
}

export async function infoWishList(productId, action) {
  try {
    // Define the API endpoint
    const apiEndpoint = 'http://your-api-endpoint.com/wishlist'; // Update with your actual endpoint

    // Determine the HTTP method based on the action
    const method = action === 'add' ? 'POST' : action === 'remove' ? 'DELETE' : null;

    if (!method) {
      throw new Error('Invalid action. Use "add" or "remove".');
    }

    // Send the request with the product ID
    const response = await fetch(apiEndpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the ID of the product for further processing
    return data.productId; // Adjust based on your API response
  } catch (error) {
    console.error('Error processing wishlist action:', error);
    throw error;
  }
}
