import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL }) => {
  const instance = basicLightbox.create(
    `<img src=${largeImageURL}> width="800" height="600"`,
    {
      onShow: () => {
        document.addEventListener('keydown', closeOnEscape);
      },
      onClose: () => {
        document.removeEventListener('keydown', closeOnEscape);
      },
    }
  );

  instance.show();

  function closeOnEscape(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
};
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
export default Modal;
