import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';

import axios from 'axios';

export const App = () => {
  const KEY = '40311007-381e26539f6c0a156243500cd';
  const perPage = 12;
  const page = 1;
  const URL = ` https://pixabay.com/api/?q=cat&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  const getImages = () => {
    const response = axios.get(URL);
    console.log(response.data);
  };

  return (
    <>
      <Searchbar />
      <ImageGallery>
        <ImageGalleryItem items={getImages} />
      </ImageGallery>
      <Loader />
      <Modal />
      <Button />
    </>
  );
};
