import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, smallImage, largeImage, tags }) => {
  return (
    <>
      <li key={id} className={css.galleryItem}>
        <img
          src={smallImage}
          alt={tags}
          data-large={largeImage}
          className={css.galleryImage}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGalleryItem;
