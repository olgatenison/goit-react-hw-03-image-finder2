import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import axios from 'axios';

const KEY = '40311007-381e26539f6c0a156243500cd';
const perPage = 12;
const page = 1;

class App extends Component {
  // вихідне положення
  state = {
    search: '', // пошук
    images: [], // картинки що прийшли
    currentPage: 1, // поточний номер сторінки
    // error: null, // повідомлення про помилку
    // isLoading: false, // прапорець завантаження
    // totalPages: 0, // загальна кількість сторінок
  };

  fetchData = async () => {
    try {
      const URL = `https://pixabay.com/api/?q=${this.state.search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      console.log(this.state.search);

      const response = await axios.get(URL);
      const data = response.data;
      const images = data.hits;
      this.setState({ images });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Error fetching data', isLoading: false });
    }
  };

  handleSubmit = searchQuery => {
    this.setState(
      {
        search: searchQuery,
        images: [],
        currentPage: 1,
      },
      this.fetchData
    );
  };

  render() {
    const { images } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        <Loader />
        <Modal />
        <Button />
      </>
    );
  }
}
export default App;
