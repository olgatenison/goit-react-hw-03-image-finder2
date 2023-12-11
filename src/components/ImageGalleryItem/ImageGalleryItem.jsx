import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => {
  console.log(images);

  return (
    <>
      {images.map(img => (
        <li key={img.id} className={css.galleryItem}>
          <img
            src={img.webformatURL}
            alt={img.id}
            data-large={img.largeImageURL}
            className={css.galleryImage}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGalleryItem;
