import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import * as API from '../services/ImageApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loadMore: false,
    status: STATUS.idle,
    largeImageURL: '',
    idToScroll: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images, idToScroll } = this.state;

    if (images.length > API.PER_PAGE && idToScroll) {
      const elem = document.getElementById(idToScroll);
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.setState({ idToScroll: null });
    }

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: STATUS.loading });

      try {
        const { hits, totalHits } = await API.fetchImages(query, page);
        if (hits.length === 0) {
          toast.error(
            'No images found with this name, please try another name'
          );
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          loadMore: totalHits / API.PER_PAGE > page,
          status: STATUS.success,
          idToScroll: hits.length ? hits[0].id : null,
        }));
      } catch (error) {
        console.log(error);
        this.setState({ status: STATUS.error });
      }
    }
  }

  handleSearchbarSubmit = searchQuery => {
    const { query, images } = this.state;
    if (searchQuery === query && images.length === 0) {
      toast.error('No images found with this name, please try another name');
    }

    if (searchQuery === query && images.length) {
      return toast.error(
        'These images are already shown, please enter another image name'
      );
    }

    this.setState({
      query: searchQuery,
      page: 1,
      images: [],
      largeImageURL: '',
    });
  };

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      largeImageURL: '',
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { status, images, loadMore, largeImageURL } = this.state;
    const isLoading = status === STATUS.loading;
    return (
      <>
        <Searchbar
          onSubmit={this.handleSearchbarSubmit}
          isLoading={isLoading}
        ></Searchbar>

        <ImageGallery
          images={images}
          onClick={this.handleImageClick}
        ></ImageGallery>

        {isLoading && <Loader />}

        {loadMore && !isLoading && (
          <Button onClick={this.handleLoadMoreBtnClick} isLoading={isLoading} />
        )}

        {largeImageURL && <Modal largeImageURL={largeImageURL} />}

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
