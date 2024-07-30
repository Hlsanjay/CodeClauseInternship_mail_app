import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ComposeDialog from './ComposeDialog';

import './App.css';

const Dashboard= () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

  return (
    <div className="app">
      <Sidebar onComposeClick={handleComposeClick} />
      <ComposeDialog isOpen={isComposeOpen} onClose={handleCloseCompose} />
    </div>
  );
};

export default Dashboard;
