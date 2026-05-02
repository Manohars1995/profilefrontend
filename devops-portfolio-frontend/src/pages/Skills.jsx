import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ✅ FIXED ICON IMPORTS
import {
  FaAws,
  FaDocker,
  FaJenkins,
  FaGitAlt,
  FaPython,
  FaLinux,
  FaNetworkWired
} from 'react-icons/fa';

import {
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiHelm,
  SiArgocd
} from 'react-icons/si';

import LoadingSpinner from '../components/Common/LoadingSpinner';
import { profileAPI } from '../services/api';

// ✅ FIXED ICON MAP
const iconMap = {
  AWS: { icon: FaAws, color: 'text-orange-400' },
  Docker: { icon: FaDocker, color: 'text-blue-400' },
  Jenkins: { icon: FaJenkins, color: 'text-red-400' },
  Kubernetes: { icon: SiKubernetes, color: 'text-blue-300' },
  Git: { icon: FaGitAlt, color: 'text-orange-500' },
  Terraform: { icon: SiTerraform, color: 'text-purple-400' },
  Ansible: { icon: SiAnsible, color: 'text-gray-400' },
  Python: { icon: FaPython, color: 'text-yellow-400' },
  Linux: { icon: FaLinux, color: 'text-gray-300' },
  Networking: { icon: FaNetworkWired, color: 'text-green-400' },
  Prometheus: { icon: SiPrometheus, color: 'text-red-500' },
  Grafana: { icon: SiGrafana, color: 'text-yellow-500' },
  Helm: { icon: SiHelm, color: 'text-blue-400' },
  ArgoCD: { icon: SiArgocd, color: 'text-red-400' },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await profileAPI.getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const skillCategories = {
    'Cloud & Infrastructure': ['AWS', 'Terraform', 'Linux'],
    'Container & Orchestration': ['Docker', 'Kubernetes', 'Helm'],
    'CI/CD & Automation': ['Jenkins', 'Git', 'ArgoCD', 'Ansible'],
    'Monitoring & Observability': ['Prometheus', 'Grafana', 'Networking'],
    'Programming & Scripting': ['Python'],
  };

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-400">
          Technical Skills
        </h1>
        <p className="text-gray-400">
          DevOps tools and technologies
        </p>
      </motion.div>

      {/* SKILL CARDS */}
      {Object.entries(skillCategories).map(([category, categorySkills], catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
          className="bg-gray-900 p-6 rounded-xl"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-400">{category}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categorySkills.map((skillName, index) => {
              const SkillIcon = iconMap[skillName]?.icon;
              const color = iconMap[skillName]?.color || 'text-gray-400';

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 p-4 rounded-lg text-center"
                >
                  {SkillIcon ? (
                    <SkillIcon className={`text-3xl mx-auto mb-2 ${color}`} />
                  ) : (
                    <div>🔧</div>
                  )}
                  <p>{skillName}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* PROGRESS BAR */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Skill Proficiency</h2>

        {skills.map((skill, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.proficiency || 80}%</span>
            </div>

            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                className="bg-blue-400 h-2 rounded"
                style={{ width: `${skill.proficiency || 80}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Skills;