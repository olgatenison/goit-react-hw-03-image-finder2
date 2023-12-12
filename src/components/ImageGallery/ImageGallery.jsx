import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, tags }) => {
  return (
    <>
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            smallImage={image.webformatURL}
            largeImage={image.largeImageURL}
            alt={tags}
          />
        ))}
      </ul>
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
