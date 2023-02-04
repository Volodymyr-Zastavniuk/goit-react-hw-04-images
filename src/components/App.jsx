import { useEffect, useState } from 'react';
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

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [status, setStatus] = useState(STATUS.idle);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [idToScroll, setIdToScroll] = useState(null);

  const isLoading = status === STATUS.loading;
  useEffect(() => {
    if (query !== '') {
      setStatus(STATUS.loading);
      setLargeImageURL('');
      async function fetchData() {
        try {
          const { hits, totalHits } = await API.fetchImages(query, page);

          if (hits.length === 0) {
            setLoadMore(false);
            setStatus(STATUS.idle);
            return toast.error(
              'No images found with this name, please try another name'
            );
          } else {
            setImages(images => [...images, ...hits]);
            setStatus(STATUS.success);
            setLoadMore(totalHits / API.PER_PAGE > page);
            setIdToScroll(hits.length ? hits[0].id : null);
          }
        } catch (error) {
          console.log(error);
          setStatus(STATUS.error);
        }
      }
      fetchData();
    }
  }, [page, query]);

  useEffect(() => {
    if (idToScroll) {
      const elem = document.getElementById(idToScroll);
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIdToScroll(null);
  }, [idToScroll]);

  const handleSearchbarSubmit = searchQuery => {
    if (searchQuery === query && images.length) {
      return toast.error(
        'These images are already shown, please enter another image name'
      );
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtnClick = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar
        onSubmit={handleSearchbarSubmit}
        isLoading={isLoading}
      ></Searchbar>

      <ImageGallery images={images} onClick={setLargeImageURL}></ImageGallery>

      {isLoading && <Loader />}

      {loadMore && !isLoading && (
        <Button onClick={handleLoadMoreBtnClick} isLoading={isLoading} />
      )}

      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={setLargeImageURL} />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
}
