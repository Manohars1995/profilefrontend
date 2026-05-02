import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { profileAPI, filesAPI } from '../../services/api';
import FileUpload from './FileUpload';
import LoadingSpinner from '../Common/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaEdit, FaSave, FaTimes, FaTrash, FaPlus, FaUpload } from 'react-icons/fa';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSummary, setEditingSummary] = useState(false);
  const [summaryText, setSummaryText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, skillsRes, expRes] = await Promise.all([
        profileAPI.getProfile(),
        profileAPI.getSkills(),
        profileAPI.getExperience()
      ]);
      setProfile(profileRes.data);
      setSkills(skillsRes.data);
      setExperience(expRes.data);
      setSummaryText(profileRes.data.summary || '');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileSummary = async () => {
    try {
      await profileAPI.updateProfileSummary({ summary: summaryText });
      setProfile({ ...profile, summary: summaryText });
      setEditingSummary(false);
      toast.success('Profile summary updated!');
    } catch (error) {
      toast.error('Failed to update summary');
    }
  };

  const addNewSkill = async () => {
    const skillName = prompt('Enter skill name:');
    if (!skillName) return;
    
    try {
      await profileAPI.addSkill({ name: skillName, proficiency: 80 });
      fetchData();
      toast.success('Skill added!');
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const deleteSkill = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await profileAPI.deleteSkill(id);
        fetchData();
        toast.success('Skill deleted');
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: '📝 Profile Summary', icon: '✏️' },
    { id: 'skills', label: '⚡ Skills Management', icon: '🎯' },
    { id: 'experience', label: '💼 Experience', icon: '📊' },
    { id: 'uploads', label: '📤 File Uploads', icon: '📁' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.username || 'Admin'}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 glass-card hover:text-red-400 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 glass-card transition-all ${
              activeTab === tab.id 
                ? 'bg-devops-accent text-devops-darker font-semibold shadow-lg shadow-devops-accent/30' 
                : 'hover:text-devops-accent'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-devops-accent">Edit Profile Summary</h2>
            {editingSummary ? (
              <div>
                <textarea
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none mb-4"
                  placeholder="Write your professional summary..."
                />
                <div className="flex space-x-3">
                  <button
                    onClick={updateProfileSummary}
                    className="px-4 py-2 bg-green-500 rounded-lg flex items-center space-x-2 hover:bg-green-600"
                  >
                    <FaSave /> <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setEditingSummary(false)}
                    className="px-4 py-2 bg-red-500 rounded-lg flex items-center space-x-2 hover:bg-red-600"
                  >
                    <FaTimes /> <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-devops-darker p-4 rounded-lg mb-4">
                  <p className="text-gray-300">{profile?.summary || 'No summary added yet'}</p>
                </div>
                <button
                  onClick={() => setEditingSummary(true)}
                  className="px-4 py-2 bg-devops-accent rounded-lg flex items-center space-x-2 hover:bg-devops-accent/80"
                >
                  <FaEdit /> <span>Edit Summary</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-devops-accent">Skills Management</h2>
              <button
                onClick={addNewSkill}
                className="px-4 py-2 bg-green-500 rounded-lg flex items-center space-x-2 hover:bg-green-600"
              >
                <FaPlus /> <span>Add Skill</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-devops-darker rounded-lg">
                  <div>
                    <span className="font-semibold">{skill.name}</span>
                    <div className="w-32 bg-white/10 rounded-full h-1 mt-1">
                      <div className="bg-devops-accent h-full rounded-full" style={{ width: `${skill.proficiency || 80}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-devops-accent">Experience Management</h2>
            <p className="text-gray-400 mb-4">Experience items are managed through backend API</p>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 bg-devops-darker rounded-lg">
                  <h3 className="font-bold text-devops-accent">{exp.role}</h3>
                  <p className="text-sm text-gray-400">{exp.company} • {exp.duration}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'uploads' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-devops-accent">File Management</h2>
            <FileUpload onUploadComplete={fetchData} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;