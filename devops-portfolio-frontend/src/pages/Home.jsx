import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ✅ FIXED ICON IMPORTS
import {
  FaGithub,
  FaLinkedin,
  FaAws,
  FaDocker,
  FaJenkins,
  FaTerminal,
  FaCloudUploadAlt,
  FaTrash
} from 'react-icons/fa';

import { SiKubernetes, SiTerraform } from 'react-icons/si';

import { profileAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    setUploading(true);

    try {
      const response = await profileAPI.updatePhoto(formData);
      setProfile({ ...profile, photoUrl: response.data.photoUrl });
      toast.success('Profile photo updated!');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoDelete = async () => {
    try {
      await profileAPI.deletePhoto();
      setProfile({ ...profile, photoUrl: null });
      toast.success('Photo deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  // ✅ UPDATED SKILLS WITH CORRECT ICONS
  const skills = [
    { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
    { name: 'Docker', icon: FaDocker, color: 'text-blue-400' },
    { name: 'Jenkins', icon: FaJenkins, color: 'text-red-400' },
    { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-300' },
    { name: 'Terraform', icon: SiTerraform, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8 p-6">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-8 rounded-xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* PROFILE IMAGE */}
          <div className="relative group">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-500">
              {profile?.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                  <FaTerminal className="text-5xl text-white" />
                </div>
              )}
            </div>

            {/* ADMIN OPTIONS */}
            {isAuthenticated && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-full">
                <div className="flex gap-2">

                  <label className="cursor-pointer bg-blue-500 p-2 rounded-full">
                    <FaCloudUploadAlt />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={uploading}
                    />
                  </label>

                  {profile?.photoUrl && (
                    <button
                      onClick={handlePhotoDelete}
                      className="bg-red-500 p-2 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE INFO */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">
              {profile?.name || 'Manohar'}
            </h1>

            <p className="text-blue-400 text-lg">
              {profile?.title || 'DevOps & Cloud Engineer'}
            </p>

            <p className="text-gray-300 mt-3 max-w-xl">
              {profile?.summary || 'DevOps Engineer with experience in CI/CD, cloud, and automation.'}
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-4 mt-5 justify-center md:justify-start">
              <a href={profile?.github || "#"} target="_blank">
                <FaGithub size={24} />
              </a>
              <a href={profile?.linkedin || "#"} target="_blank">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SKILLS SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-blue-400 mb-6">
          Core Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition"
            >
              <skill.icon className={`text-3xl mx-auto mb-2 ${skill.color}`} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default Home;