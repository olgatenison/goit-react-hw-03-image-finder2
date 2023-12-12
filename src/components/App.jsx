import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

import Loader from './Loader/Loader';
import Button from './Button/Button';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KEY = '40311007-381e26539f6c0a156243500cd';
const perPage = 12;

class App extends Component {
  // вихідне положення
  state = {
    search: '', // пошук
    images: [], // картинки що прийшли
    currentPage: 1, // поточний номер сторінки
    error: null, // повідомлення про помилку
    loading: false, // прапорець завантаження
    totalPages: 0, // загальна кількість сторінок
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const URL = `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      this.setState({ loading: true }); // вмикаємо лоудер

      const response = await axios.get(URL); // робимо запит
      const data = response.data;
      const newImages = data.hits;

      if (newImages.length === 0 || !this.state.search) {
        // якщо немає картинки то виводимо помилку
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalPages: Math.ceil(data.totalHits / 12),
        error: '',
        loading: false, // знімаємо лоудер
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false }); // в будь-якому вимкнути лоудер
    }
  };

  handleSubmit = searchQuery => {
    this.setState({
      search: searchQuery,
      images: [],
      currentPage: 1,
    });
  };

  onLoadMoreButton = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, totalPages, currentPage, loading } = this.state;

    return (
      <>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images}></ImageGallery>
        {images.length > 0 && totalPages !== currentPage && (
          <Button onLoadMoreButton={this.onLoadMoreButton} />
        )}
        {loading && <Loader />}
      </>
    );
  }
}
export default App;
