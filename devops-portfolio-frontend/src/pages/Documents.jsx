import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // ✅ FIXED
import { FaIdCard, FaFilePdf, FaDownload, FaEye, FaLock } from 'react-icons/fa';
import { filesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const defaultDocuments = [
    {
      id: 1,
      name: "Aadhar Card",
      type: "PDF",
      size: "1.2 MB",
      icon: FaIdCard,
      color: "text-red-400"
    },
    {
      id: 2,
      name: "PAN Card",
      type: "PDF",
      size: "0.8 MB",
      icon: FaIdCard,
      color: "text-orange-400"
    }
  ];

  const fetchDocuments = async () => {
    try {
      const response = await filesAPI.getFiles('document');
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setDocuments(defaultDocuments);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    if (!isAuthenticated) {
      toast.error('Admin login required');
      return;
    }

    try {
      const response = await filesAPI.downloadFile(doc.id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${doc.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Download started');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  // 🔒 BLOCK ACCESS (IMPORTANT FEATURE)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-gray-900 p-12 rounded-xl text-center shadow-lg">
          <FaLock className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Private Documents</h2>
          <p className="text-gray-400 mb-4">
            Only admin can access Aadhar / PAN documents
          </p>
          <a
            href="/login"
            className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
          >
            Login as Admin →
          </a>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-red-400">
          🔒 Private Documents
        </h1>
        <p className="text-gray-400 mt-2">
          Admin-only secure document access
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {documents.map((doc, index) => {
          const Icon = doc.icon || FaFilePdf;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">
                  <Icon className={`text-4xl ${doc.color}`} />
                  <div>
                    <h3 className="font-bold">{doc.name}</h3>
                    <p className="text-sm text-gray-400">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">

                  {/* VIEW */}
                  <button
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                    className="p-2 bg-gray-800 rounded hover:text-blue-400"
                  >
                    <FaEye />
                  </button>

                  {/* DOWNLOAD */}
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-2 bg-gray-800 rounded hover:text-green-400"
                  >
                    <FaDownload />
                  </button>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-red-900/20 border border-red-500 p-4 rounded text-center text-sm text-red-400">
        ⚠️ Sensitive documents — access restricted and monitored
      </div>

    </div>
  );
};

export default Documents;