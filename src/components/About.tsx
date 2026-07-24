'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/About.module.css';

const RobotModel = dynamic(() => import('./RobotModel'), { ssr: false });

const About = () => {
  const stats = [
    { value: 'AI & ML', label: 'FOCUS AREA' },
    { value: '2027', label: 'GRAD YEAR' },
    { value: 'NextLeap', label: 'CURRENT ROLE' },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <h2 className={styles.heading}>About Me</h2>
      <div className={styles.container}>

        {/* Original LEFT — stat cards */}
        <div className={styles.left}>
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={styles.statCard}
            >
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Original RIGHT — bio text */}
        <div className={styles.right}>
          <p className={styles.bio}>
            I am Sanika Zade, an AI &amp; Machine Learning specialist transforming raw data into scalable, intelligent applications. I build end‑to‑end ML pipelines, design interactive visualizations, and automate complex workflows. Through industry roles at Clustor Computing, NextLeap, InnoByte Services, and Unified Mentor, I convert complex datasets into actionable insights and user‑friendly platforms, including an API‑driven real estate analytics solution.
          </p>
        </div>

        {/* NEW — 3D Robot model on the far right */}
        <div className={styles.modelCol}>
          <div className={styles.modelWrapper}>
            <RobotModel />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
