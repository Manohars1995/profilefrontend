import React from 'react';
import Navbar from './Navbar';
import StatusWidget from '../Common/StatusWidget';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-devops-darker via-devops-dark to-devops-darker">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {children}
      </main>
      <StatusWidget />
    </div>
  );
};

export default Layout;