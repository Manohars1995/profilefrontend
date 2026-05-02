import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { filesAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaUpload, FaFilePdf, FaImage, FaFile } from 'react-icons/fa';

const FileUpload = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('certificate');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', fileType);

    setUploading(true);
    try {
      await filesAPI.uploadFile(formData);
      toast.success('File uploaded successfully!');
      setSelectedFile(null);
      onUploadComplete();
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return <FaUpload className="text-4xl text-gray-400" />;
    if (selectedFile.type === 'application/pdf') return <FaFilePdf className="text-4xl text-red-400" />;
    if (selectedFile.type.includes('image')) return <FaImage className="text-4xl text-green-400" />;
    return <FaFile className="text-4xl text-blue-400" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">File Type</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none"
          >
            <option value="certificate">📜 Certificate (Public View)</option>
            <option value="document">🔒 Document (Admin Only)</option>
            <option value="resume">📄 Resume (Public Download)</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select File</label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-devops-accent file:text-devops-darker hover:file:bg-devops-accent/80"
          />
        </div>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-devops-darker rounded-lg"
        >
          <div className="flex items-center space-x-4">
            {getFileIcon()}
            <div className="flex-1">
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-sm text-gray-400">
                {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        </motion.div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full py-3 bg-gradient-to-r from-devops-accent to-devops-secondary rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50"
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <FaUpload />
            <span>Upload File</span>
          </>
        )}
      </button>

      <div className="p-4 bg-devops-accent/10 rounded-lg">
        <p className="text-sm text-gray-300">
          📌 <strong>File Guidelines:</strong><br />
          • Certificates: PDF or Images (Max 5MB) - Public view only, no download<br />
          • Documents: PDF only (Max 10MB) - Admin only, download allowed<br />
          • Resume: PDF only (Max 5MB) - Public view and download allowed
        </p>
      </div>
    </div>
  );
};

export default FileUpload;