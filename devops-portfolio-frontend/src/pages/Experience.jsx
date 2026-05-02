import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { profileAPI } from '../services/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await profileAPI.getExperience();
      setExperiences(response.data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
      setExperiences(defaultExperiences);
    } finally {
      setLoading(false);
    }
  };

  const defaultExperiences = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      role: "DevOps Engineer",
      duration: "2023 - Present",
      location: "Bangalore, India",
      description: "Managing cloud infrastructure and CI/CD pipelines for microservices architecture.",
      achievements: [
        "Reduced deployment time by 60% using Jenkins pipeline optimization",
        "Migrated 15+ microservices to Kubernetes cluster on AWS EKS",
        "Implemented Prometheus & Grafana monitoring reducing MTTR by 45%",
        "Automated infrastructure provisioning using Terraform"
      ]
    },
    {
      id: 2,
      company: "CloudNative Systems",
      role: "Cloud Engineer",
      duration: "2022 - 2023",
      location: "Remote",
      description: "Responsible for AWS cloud infrastructure and automation scripts.",
      achievements: [
        "Managed 50+ EC2 instances using Auto Scaling Groups",
        "Implemented CI/CD using GitHub Actions and Docker",
        "Reduced cloud costs by 30% through resource optimization",
        "Created automated backup solutions using AWS Lambda"
      ]
    },
    {
      id: 3,
      company: "StartUp Hub",
      role: "Junior DevOps Engineer",
      duration: "2021 - 2022",
      location: "Mumbai, India",
      description: "Assisted in building and maintaining development infrastructure.",
      achievements: [
        "Set up development environments using Docker Compose",
        "Implemented Git branching strategy and code review process",
        "Automated database backup and recovery procedures",
        "Created documentation for DevOps processes"
      ]
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
          Professional Experience
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          2+ years of DevOps & Cloud Engineering experience
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-devops-accent to-devops-secondary" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-devops-accent z-10 shadow-lg shadow-devops-accent/50" />

            {/* Content */}
            <div className={`flex-1 ml-12 md:ml-0 ${
              index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
            }`}>
              <div className="glass-card p-6 hover-glow">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-devops-accent">{exp.role}</h3>
                    <div className="flex items-center space-x-2 text-gray-400 mt-1">
                      <FaBriefcase className="text-sm" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <FaCalendarAlt />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                      <FaMapMarkerAlt />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{exp.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-devops-accent">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start space-x-2 text-sm text-gray-400"
                      >
                        <span className="text-devops-accent mt-1">▹</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-devops-accent text-center">Technical Environment</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["AWS", "Kubernetes", "Docker", "Jenkins", "Terraform", "Prometheus", "Git", "Linux"].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="text-center p-3 glass-card"
            >
              <span className="text-devops-accent">{tech}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;