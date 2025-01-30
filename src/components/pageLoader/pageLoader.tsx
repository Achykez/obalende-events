"use client"
import React from 'react';
import { motion } from 'framer-motion';
import styles from './pageLoader.module.css'; // Import the CSS module

export const PageLoader = () => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const letterVariants = {
    initial: { y: 0, opacity: 0 },
    animate: (i) => ({
      y: [0, -12, 0],
      opacity: 1,
      transition: {
        y: {
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: [0.33, 1, 0.68, 1],
          delay: i * 0.08
        },
        opacity: {
          duration: 0.3,
          ease: 'easeOut'
        }
      }
    })
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      aria-label="Page loading"
      role="progressbar"
    >
      {/* Background accent */}
      <motion.div
        className={styles.backgroundAccent}
        variants={pulseVariants}
        animate="animate"
      />

      <div className={styles.content}>
        {/* Main content */}
        <div className={styles.letterContainer}>
          {"OBALENDE".split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className={styles.letter}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Location text with subtle entrance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={styles.locationText}
        >
          Enugu
        </motion.div>

        {/* Progress indicator */}
        <div className={styles.progressContainer}>
          <motion.div
            className={styles.progressBar}
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7 }}
          className={styles.loadingText}
        >
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
};
