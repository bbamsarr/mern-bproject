import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Footer from './components/Footer';
import Information from './pages/Information';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/information" element={<Information />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />

        <Route element={<PrivateRoute/>} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>

        <Route element={<AdminPrivateRoute/>}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
