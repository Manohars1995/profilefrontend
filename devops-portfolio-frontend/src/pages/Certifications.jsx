import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaDocker, FaLinux, FaCertificate } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins } from 'react-icons/si';
import { filesAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Document, Page, pdfjs } from 'react-pdf';
import toast from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await filesAPI.getFiles('certificate');
      setCertificates(response.data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
      setCertificates(defaultCertificates);
    } finally {
      setLoading(false);
    }
  };

  const defaultCertificates = [
    {
      id: 1,
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: FaAws,
      color: "text-orange-400",
      fileUrl: null
    },
    {
      id: 2,
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "CNCF",
      date: "2023",
      icon: SiKubernetes,
      color: "text-blue-400",
      fileUrl: null
    },
    {
      id: 3,
      name: "Docker Certified Associate",
      issuer: "Docker",
      date: "2023",
      icon: FaDocker,
      color: "text-blue-500",
      fileUrl: null
    },
    {
      id: 4,
      name: "Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
      icon: SiTerraform,
      color: "text-purple-400",
      fileUrl: null
    },
    {
      id: 5,
      name: "Jenkins Certified Engineer",
      issuer: "Jenkins",
      date: "2022",
      icon: SiJenkins,
      color: "text-red-400",
      fileUrl: null
    },
    {
      id: 6,
      name: "Linux Professional Institute Certification",
      issuer: "LPI",
      date: "2022",
      icon: FaLinux,
      color: "text-gray-400",
      fileUrl: null
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
          Certifications
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional certifications demonstrating expertise in DevOps and Cloud technologies
        </p>
      </motion.div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => {
          const IconComponent = cert.icon || FaCertificate;
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 cursor-pointer group"
              onClick={() => cert.fileUrl && setSelectedCert(cert)}
            >
              <div className="flex items-start space-x-4">
                <div className={`text-4xl ${cert.color || 'text-devops-accent'} group-hover:animate-pulse`}>
                  <IconComponent />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-devops-accent transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                  <p className="text-xs text-devops-accent mt-2">{cert.date}</p>
                  
                  {cert.fileUrl && (
                    <button className="mt-3 text-xs text-devops-accent hover:text-devops-secondary transition-colors flex items-center space-x-1">
                      <span>📄</span>
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-devops-card p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold">{selectedCert.name}</h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {selectedCert.fileUrl?.endsWith('.pdf') ? (
                <Document
                  file={selectedCert.fileUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<LoadingSpinner />}
                >
                  {[...Array(numPages)].map((_, i) => (
                    <Page key={i} pageNumber={i + 1} width={800} />
                  ))}
                </Document>
              ) : (
                <img src={selectedCert.fileUrl} alt={selectedCert.name} className="w-full" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Certifications;