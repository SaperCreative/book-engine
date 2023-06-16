import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Page/Main/Main';
import BookDetails from './Page/BookDetails/BookDetails';
import ER404 from './Page/ER404/ER404';
import SearchResults from './Page/SearchResults/SearchResults';
import Description from './Page/Description/Description';
import { Provider } from 'react-redux';
import { store } from './Utils/Redux/store';
import SelectedBook from './Page/SelectedBook/SelectedBook';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:getValue/:site' element={<SearchResults />} />
          <Route path='/selected' element={<SelectedBook />} />
          <Route path='/:getValue/:site/:id' element={<BookDetails />} />
          <Route path='/:getValue/:site/:id/description' element={<Description />} />
          <Route path='*' element={<ER404 />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
