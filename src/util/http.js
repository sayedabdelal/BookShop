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
  const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  }); 

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


export  async  function fetchBooks() {
    const data = await fetch('http://127.0.0.1:5000/book');

    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    return data.json();
}
