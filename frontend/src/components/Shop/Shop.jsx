import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../util/http.js';
import LoadingIndicator from '../../UI/LoadingIndicator.jsx';
import ErrorPage from '../../UI/ErrorPage.jsx';
import BookCard from './BookCard.jsx';
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../../store/cartSlice.js';
import { fetchWishlist } from '../../store/wishlistSlice.js';
import './Shop.css';
import './Pagination.css';
import { ToastContainer } from 'react-toastify';
import './Search.css';

const fetchBooksWithDelay = async () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const result = await fetchBooks(); 
      resolve(result);
    }, 10);  
  });
};

function Shop() {
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20; // Set the number of books per page

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch books
  const { data: books, isError: isBooksError, isLoading: isBooksLoading,isPending, error: booksError, isFetched } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooksWithDelay,
  });
  
   

 
  const { items: cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { items: wishlistItems, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlist);

  // Show loading state if any fetch request is loading
  if (isBooksLoading || cartLoading || wishlistLoading || isPending) {
    return <LoadingIndicator />;
  }

  // Handle errors for books, cart, or wishlist
  if (isBooksError || cartError || wishlistError) {
    const errorMessage = booksError?.message || cartError || wishlistError || "Failed to load data. Please try again later.";
    const errorTitle = "Failed to Load Shop Data";

    return <ErrorPage title={errorTitle} message={errorMessage} />;
  }

  // Map cart and wishlist items
  const cartItemsMap = new Map(cartItems.map(item => [item.book_id, item]));
  const wishlistItemsMap = new Map(wishlistItems.map(item => [item.book_id, item]));

  // Combine books with cart and wishlist status
  const booksStatus = books.map(book => {
    const cartItem = cartItemsMap.get(book.id);
    const isInWishList = wishlistItemsMap.has(book.id);

    return {
      ...book,
      isInCart: !!cartItem,
      quantityInCart: cartItem?.quantity || 0,
      cartItemId: cartItem?.id || null,
      isInWishList,
      wishListId: isInWishList ? wishlistItemsMap.get(book.id).id : null,
    };
  });

  // Filter books based on the search query
  const filteredBooks = booksStatus.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination on new search
  };

  return (
    <section className="new section" id="new">
      <h2 className="section__title">New Books</h2>
      <ToastContainer />

      {/* Search input */}
      <form action="" className="search__form">
        <input
          type="search"
          className="search__input"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </form>

      <div className="new__container container">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <BookCard
              key={book.id}
              imgSrc={book.image}
              title={book.title}
              discountPrice={book.discountPrice}
              originalPrice={book.price}
              rating={book.rating}
              shopId={book.id}
              shopDes={book.description}
              isInCart={book.isInCart}
              cart_item_id={book.cartItemId}
              isInWishList={book.isInWishList}
              wishListId={book.wishListId}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination__info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination__next"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Shop;
