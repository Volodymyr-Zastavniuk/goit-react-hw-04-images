import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onClick }) => {
  return (
    <div className="ImageGalleryWarapper">
      <ul className="ImageGallery">
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={onClick}
            ></ImageGalleryItem>
          );
        })}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGallery;
