import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { profileAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await profileAPI.getProfile();
      setProjects(response.data.projects || defaultProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const defaultProjects = [
    {
      id: 1,
      title: "CI/CD Pipeline with Jenkins & Kubernetes",
      description: "Implemented end-to-end CI/CD pipeline using Jenkins, Docker, and Kubernetes. Automated build, test, and deployment processes resulting in 60% faster delivery.",
      techStack: ["Jenkins", "Docker", "Kubernetes", "Helm"],
      githubLink: "https://github.com/manohar/cicd-pipeline",
      image: "https://via.placeholder.com/400x200"
    },
    {
      id: 2,
      title: "AWS Infrastructure as Code with Terraform",
      description: "Provisioned AWS infrastructure using Terraform including VPC, EC2, RDS, and S3. Implemented modular Terraform configuration for reusability.",
      techStack: ["Terraform", "AWS", "GitHub Actions"],
      githubLink: "https://github.com/manohar/terraform-aws",
            image: "https://via.placeholder.com/400x200"
    },
    {
      id: 3,
      title: "Monitoring Stack with Prometheus & Grafana",
      description: "Deployed complete monitoring solution for Kubernetes cluster. Set up metrics collection, visualization, and alerting with Slack integration.",
      techStack: ["Prometheus", "Grafana", "AlertManager", "Kubernetes"],
      githubLink: "https://github.com/manohar/monitoring-stack",
      image: "https://via.placeholder.com/400x200"
    },
    {
      id: 4,
      title: "GitOps with ArgoCD",
      description: "Implemented GitOps methodology using ArgoCD for Kubernetes deployments. Achieved automated sync and rollback capabilities.",
      techStack: ["ArgoCD", "Kubernetes", "Git", "Helm"],
      githubLink: "https://github.com/manohar/gitops-argocd",
      image: "https://via.placeholder.com/400x200"
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
          DevOps Projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real-world projects demonstrating CI/CD, cloud infrastructure, and automation expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden group cursor-pointer"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-devops-card to-transparent opacity-60" />
              
              {/* Tech stack badges overlay */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-xs bg-black/70 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs bg-black/70 px-2 py-1 rounded-full">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-devops-accent group-hover:text-devops-secondary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, i) => (
                  <span 
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-devops-accent/10 text-devops-accent border border-devops-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex space-x-3 pt-4 border-t border-white/10">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-400 hover:text-devops-accent transition-colors"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center space-x-1 text-sm text-gray-400 hover:text-devops-accent transition-colors"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 mt-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-devops-accent text-center">GitHub Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-devops-accent">15+</div>
            <div className="text-sm text-gray-400 mt-1">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-devops-accent">500+</div>
            <div className="text-sm text-gray-400 mt-1">Commits (Year)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-devops-accent">10+</div>
            <div className="text-sm text-gray-400 mt-1">Stars Received</div>
          </div>
        </div>
        
        {/* GitHub Contribution Graph Placeholder */}
        <div className="mt-6 p-4 bg-devops-darker rounded-lg">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Contributions in last year</span>
            <span>1,284 total</span>
          </div>
          <div className="grid grid-cols-52 gap-1">
            {[...Array(52)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {[...Array(7)].map((_, j) => (
                  <div
                    key={j}
                    className="w-2 h-2 rounded-sm bg-devops-accent/20 hover:bg-devops-accent/60 transition-colors"
                    style={{
                      opacity: Math.random() * 0.5 + 0.2
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;