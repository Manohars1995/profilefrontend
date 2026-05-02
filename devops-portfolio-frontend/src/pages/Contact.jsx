import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual email API endpoint
      await axios.post('/api/contact', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "manohar@devops.com",
      link: "mailto:manohar@devops.com",
      color: "text-red-400"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/manohar",
      link: "https://github.com/manohar",
      color: "text-gray-400"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/manohar",
      link: "https://linkedin.com/in/manohar",
      color: "text-blue-400"
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      value: "@manohar_devops",
      link: "https://twitter.com/manohar_devops",
      color: "text-blue-300"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Bangalore, India",
      link: null,
      color: "text-green-400"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-devops-accent to-devops-secondary bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let's connect! I'm always open to discussing DevOps projects, cloud architecture, or potential opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6 text-devops-accent">Contact Information</h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 glass-card hover:bg-devops-accent/10 transition-colors"
                >
                  <div className={`text-2xl ${info.color}`}>
                    <info.icon />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">{info.label}</p>
                    {info.link ? (
                      <a 
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-devops-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-3">Current Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Available for freelance & full-time opportunities</span>
            </div>
            <div className="mt-4 p-3 bg-devops-accent/10 rounded-lg">
              <p className="text-sm text-gray-300">
                ⚡ Typical response time: &lt; 24 hours
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-devops-accent">Send a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject *</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors"
                placeholder="Message subject"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="5"
                className="w-full px-4 py-2 bg-devops-darker border border-white/10 rounded-lg focus:border-devops-accent focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-devops-accent to-devops-secondary rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;