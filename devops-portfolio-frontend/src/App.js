import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import AdminRoute from './components/Admin/AdminRoute';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Certifications from './pages/Certifications';
import Documents from './pages/Documents';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#11152e',
              color: '#fff',
              border: '1px solid #00d4ff',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/skills" element={
            <Layout>
              <Skills />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout>
              <Projects />
            </Layout>
          } />
          <Route path="/experience" element={
            <Layout>
              <Experience />
            </Layout>
          } />
          <Route path="/certifications" element={
            <Layout>
              <Certifications />
            </Layout>
          } />
          <Route path="/documents" element={
            <Layout>
              <Documents />
            </Layout>
          } />
          <Route path="/resume" element={
            <Layout>
              <Resume />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Layout>
                <AdminPanel />
              </Layout>
            </AdminRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;