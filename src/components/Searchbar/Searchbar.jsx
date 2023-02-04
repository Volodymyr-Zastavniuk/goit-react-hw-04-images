import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import './Searchbar.css';

export default class Searchbar extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSearchChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
    const normalizedQuery = searchQuery.toLowerCase().trim();

    if (normalizedQuery === '') {
      toast.error('Please enter images to find');
      return;
    }
    onSubmit(normalizedQuery);
    // this.setState({ searchQuery: '' });
  };

  render() {
    const { isLoading } = this.props;
    const { searchQuery } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
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
            onChange={this.handleSearchChange}
            maxLength={30}
          />
        </form>
      </header>
    );
  }
}
