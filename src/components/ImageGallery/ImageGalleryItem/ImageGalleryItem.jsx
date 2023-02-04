import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  const { id, webformatURL, largeImageURL } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
