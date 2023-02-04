import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import './Searchbar.css';

export default function Searchbar({ onSubmit, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedQuery = searchQuery.toLowerCase().trim();

    if (normalizedQuery === '') {
      toast.error('Please enter images to find');
      return;
    }
    onSubmit(normalizedQuery);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="SearchForm-button"
          disabled={isLoading}
        >
          <FcSearch className="SearchForm-icon" />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={event => setSearchQuery(event.currentTarget.value)}
          maxLength={30}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
