import React, { useState, useEffect } from 'react';
import { systemAPI } from '../../services/api';
import { FaServer, FaDatabase, FaGithub, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const StatusWidget = () => {
  const [systemStatus, setSystemStatus] = useState({
    server: 'checking',
    api: 'checking',
    uptime: 0,
  });
  const [githubStats, setGithubStats] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    checkSystemHealth();
    fetchGitHubStats();
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkSystemHealth = async () => {
    try {
      const response = await systemAPI.healthCheck();
      setSystemStatus({
        server: 'online',
        api: 'online',
        uptime: response.data.uptime,
      });
    } catch (error) {
      setSystemStatus({
        server: 'offline',
        api: 'offline',
        uptime: 0,
      });
    }
  };

  const fetchGitHubStats = async () => {
    try {
      const response = await systemAPI.getGitHubStats();
      setGithubStats(response.data);
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card p-4 mb-2 w-80"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">System Status</span>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-1">
                    <FaServer className="text-xs" />
                    <span className="text-xs">
                      {systemStatus.server === 'online' ? '🟢' : '🔴'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaDatabase className="text-xs" />
                    <span className="text-xs">
                      {systemStatus.api === 'online' ? '🟢' : '🔴'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Uptime</span>
                  <span className="font-mono">
                    {Math.floor(systemStatus.uptime / 3600)}h {(systemStatus.uptime % 3600) / 60}m
                  </span>
                </div>
              </div>

              {githubStats && (
                <div className="border-t border-white/10 pt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaGithub className="text-devops-accent" />
                    <span className="text-xs font-semibold">GitHub Stats</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Contributions (Year)</span>
                      <span className="text-devops-accent">{githubStats.contributions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repositories</span>
                      <span>{githubStats.publicRepos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Followers</span>
                      <span>{githubStats.followers}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-card p-3 hover-glow"
      >
        <div className="flex items-center space-x-2">
          <FaChartLine className="text-devops-accent" />
          <div className="flex space-x-1">
            <div className={`status-dot ${systemStatus.server === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <div className={`status-dot ${systemStatus.api === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default StatusWidget;