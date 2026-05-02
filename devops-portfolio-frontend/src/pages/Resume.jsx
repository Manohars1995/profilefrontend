import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFilePdf, FaPrint } from 'react-icons/fa';
import { filesAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Document, Page, pdfjs } from 'react-pdf';
import toast from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showViewer, setShowViewer] = useState(false);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await filesAPI.getFiles('resume');
      setResume(response.data[0]);
    } catch (error) {
      console.error('Failed to fetch resume:', error);
      setResume({
        id: 1,
        name: "Manohar_Resume_2024.pdf",
        size: "1.5 MB",
        uploadDate: "2024-01-01"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await filesAPI.downloadFile(resume.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resume.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Resume downloaded successfully');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handlePrint = () => {
    if (resume?.fileUrl) {
      const printWindow = window.open(resume.fileUrl, '_blank');
      printWindow?.print();
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
          Resume
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Download or view my professional resume
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center space-x-6 mb-6">
          <div className="text-6xl text-devops-accent">
            <FaFilePdf />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{resume?.name}</h2>
            <p className="text-gray-400 text-sm">Size: {resume?.size}</p>
            <p className="text-gray-400 text-sm">Updated: {resume?.uploadDate}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowViewer(true)}
            className="glass-card px-6 py-3 flex items-center space-x-2 hover:text-devops-accent transition-colors"
          >
            <FaEye />
            <span>View Online</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="glass-card px-6 py-3 flex items-center space-x-2 hover:text-green-400 transition-colors"
          >
            <FaDownload />
            <span>Download PDF</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            className="glass-card px-6 py-3 flex items-center space-x-2 hover:text-devops-secondary transition-colors"
          >
            <FaPrint />
            <span>Print</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Resume Viewer Modal */}
      {showViewer && resume?.fileUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowViewer(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-card max-w-5xl w-full max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-devops-card p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold">Resume - {resume?.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 glass-card text-sm hover:text-green-400"
                >
                  Download
                </button>
                <button
                  onClick={() => setShowViewer(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              <Document
                file={resume.fileUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={<LoadingSpinner />}
              >
                {[...Array(numPages)].map((_, i) => (
                  <Page key={i} pageNumber={i + 1} width={800} />
                ))}
              </Document>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Resume;