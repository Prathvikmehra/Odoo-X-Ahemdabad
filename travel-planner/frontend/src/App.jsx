import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { TravelProvider } from './context/TravelContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  // Paths that do not have navigation header and footer
  const noLayoutPaths = ['/login', '/signup'];
  const isSharedPath = path.startsWith('/shared/');
  const hideLayout = noLayoutPaths.includes(path) || isSharedPath;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TravelProvider>
  );
}

export default App;