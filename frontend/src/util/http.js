import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
import { setUserId } from '../store/userSlice';
import { useDispatch } from 'react-redux';



export async function NewUser({ name, email, password }) {

  
  try {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'  // Ensure cookies are included in requests
    });
     

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || 'Unknown error');
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
 
export async function fetchUsers(data, dispatch) {
  
  try {
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'  // Ensure cookies are included in requests
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || 'Unknown error');
    }
     
    
    const responseData = await response.json();
    
    // Store user_id in local storage
    if (responseData.user_id) {
     
      // localStorage.setItem('user_id', responseData.user_id);
      dispatch(setUserId(responseData.user_id));
    }
    
    // Return the relevant data (excluding user_id if needed)
    return responseData;

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function fetchBooks() {
  try {
    const response = await fetch('http://127.0.0.1:5000/shop', {
      credentials: 'include'  // Ensure cookies are included in requests
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        info: errorInfo.message || 'No additional error information provided.'
      }));
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch books. ${error.message}`);
  }
}
export async function addRemoveCart({ action, productId, quantity, cartItemId }) {
  const isAddAction = action === 'add';
  const url = isAddAction 
    ? 'http://127.0.0.1:5000/api/add_cart_item' 
    : `http://127.0.0.1:5000/api/delete_cart_item`;

  const options = {
    method: isAddAction ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: isAddAction ? JSON.stringify({ productId, quantity }): JSON.stringify({ cartItemId })
  };

  try {
   
    const response = await fetch(url, options);
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (isAddAction) {
      
      return data; // Return the response data after adding to the cart
    } else {
      
      return 'Item removed from cart successfully';
    }
  } catch (error) {
    console.error('Error in addRemoveCart:', error.message || 'Something went wrong');
    throw new Error(error.message || 'Something went wrong');
  }
}


export async function addRemoveWishlist({ action, productId, wishlistId }) {
  const url = action === 'add'
    ? 'http://127.0.0.1:5000/wishlist/add'
    : 'http://127.0.0.1:5000/wishlist/remove';

  const options = {
    method: action === 'add' ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Ensure cookies are included in requests
    body: JSON.stringify(action === 'add' ? { productId } : { wishlistId })
  };
  

  try {
    
    const response = await fetch(url, options);
    
    

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   

    if (action === 'add') {
       
      return data;  // Return the wishlist item ID after adding to the wishlist
     
    } else {
     
      return 'Item removed from wishlist successfully';  // Return a success message after removing from the wishlist
    }
  } catch (error) {
    console.error('Error in addRemoveWishlist:', error);
    throw new Error(error.message || 'Something went wrong');
  }
}

export async function submitCheckout(formData, cartItems) {
  try {
    const response = await fetch('http://127.0.0.1:5000/checkout', {
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
      credentials: 'include'  // Ensure cookies are included in requests
    });
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during checkout:', error);
    throw new Error(error.message || 'Something went wrong during checkout');
  }
}

export async function fetchCarts() {
  // Get user ID from localStorage
  const userId = useSelector((state) => state.user.user_id);

  // const userId = localStorage.getItem('user_id');
  

  if (!userId) {
    throw new Error('User ID not found in localStorage.');
  }

  const response = await fetch(`http://127.0.0.1:5000/api/cart_items?user_id=${userId}`);
   
  if (!response.ok) {
    throw new Error(`HTTP error! Fetch cart status: ${response.status}`);
  }

  return await response.json();
}


export async function fetchWishList() {
  const data = await fetch('http://127.0.0.1:5000/wishlist');
  if (!data.ok) {
    throw new Error(`HTTP error! feth cart status: ${data.status}`);
  }
  return  data.json();
}



export async function logoutUser() {
  const response = await fetch('http://127.0.0.1:5000/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Ensure cookies are sent with the request
  });
 

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}


// export async function resetEmail(email, password) {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/reset_password_request', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     console.log('response:', response);

//     if (!response.ok) {
//       throw new Error(`${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log('data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }


// util/http.js
export const requestResetToken = async (email) => {
  const response = await fetch('http://127.0.0.1:5000/reset_password_request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  console.log('response:', response);
  const data = await response.json();
  
  if (!response.ok) throw new Error(data.error || 'Failed to request reset token');
  return data;
};

export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/reset_password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    

    // Parse the response JSON
    const data = await response.json();

    if (!response.ok) {
      
      data.error = data.error || 'Failed to reset password';
      throw new Error(data.error || 'Failed to reset password');
    }
   
    return data;
    
  } catch (error) {
    console.error('Error:', error.message);
    throw error;  // You can handle the error on the frontend here (e.g., show an alert)
  }
};

/* ********************************************/

export  async function getEmails() {
  const response = await fetch('http://127.0.0.1:5000/admin_get_users');

  if (!response.ok) {
    throw new Error('Failed to fetch email');
  }
  
  const data = await response.json();

  console.log("all emails",data)
  return  data.users;
}


export  async function getProducts() {
  const response = await fetch('http://127.0.0.1:5000/admin_getsers');

  if (!response.ok) {
    throw new Error('Failed to fetch email');
  }
  
  const data = await response.json();

  console.log("all emails",data)
  return  data.users;
}

