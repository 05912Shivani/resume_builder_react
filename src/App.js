import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsFillingPage from './pages/DetailsFillingPage';
import PreviewPage1 from './pages/PreviewPage1';
import PreviewPage2 from './pages/PreviewPage2';
import PreviewPage3 from './pages/PreviewPage3';
import PreviewPage4 from './pages/PreviewPage4';
import AboutUsPage from './pages/AboutUsPage';
import ResumeTemplate from './components/ResumeTemplate/ResumeTemplate';
import LandingPage from './pages/LandingPage';
// Importing layout components
import Header from './components/Header/Header';
import Footer from './components/Footer';


function App() {
  return (
    <Router>{/* Wrapping the application with Router for navigation */}
      <Header />{/* Global header component */}
      <Routes>{/* Defines all routes in the application */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
        <Route path="/details-filling" element={<DetailsFillingPage />} />
        <Route path="/preview1" element={<PreviewPage1 />} />
        <Route path="/preview2" element={<PreviewPage2 />} />
        <Route path="/preview3" element={<PreviewPage3 />} />
        <Route path="/preview4" element={<PreviewPage4 />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/template/:id" element={<ResumeTemplate />} />
     
      </Routes>
      <Footer />{/* Global footer component */}
    </Router>
  );
}

export default App;

