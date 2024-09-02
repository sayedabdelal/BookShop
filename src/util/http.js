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
