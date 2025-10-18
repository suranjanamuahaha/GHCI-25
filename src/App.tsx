import React, { useState } from 'react'
import Navbar from './components/Navbar'

import Auth from './components/Auth'
import Landingpage from './components/Landingpage'

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  return (
    <div>
      <Navbar onSignUpClick={openAuthModal} />
      <Landingpage />
      {isAuthModalOpen && <Auth onClose={closeAuthModal} />}
      
    </div>
  );
};

export default App
