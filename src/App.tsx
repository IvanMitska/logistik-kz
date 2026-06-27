import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import SmoothScroll from './components/SmoothScroll';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import { I18nProvider } from './i18n/I18nContext';

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <I18nProvider>
      <BrowserRouter>
        <GlobalStyles />
        <SmoothScroll />
        <Preloader onDone={() => setReady(true)} />
        <NavBar />
        <main aria-hidden={!ready}>
          <Home />
        </main>
        <Footer />
      </BrowserRouter>
    </I18nProvider>
  );
};

export default App;
