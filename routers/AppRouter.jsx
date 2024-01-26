// AppRouter

// Development Components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Movie from '../components/Movie'
// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Favourite from '../pages/Favourite';
import Individual from '../pages/Individual';
import PageNotFound from '../pages/PageNotFound';

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/individuals" element={<Individual />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </div>
        <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
