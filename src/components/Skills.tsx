'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/Skills.module.css';

const skillCategories = [
  {
    title: 'Languages',
    items: ['Python', 'SQL', 'JavaScript'],
  },
  {
    title: 'AI / ML',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Matplotlib', 'Seaborn', 'Streamlit'],
  },
  {
    title: 'Tools & Cloud',
    items: ['n8n', 'VS Code', 'Jupyter Notebook', 'Docker', 'Git', 'GitHub'],
  },
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = containerRef.current?.querySelectorAll(`.${styles.card}`);
        if (cards) {
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.6,
            scrollTrigger: {
              trigger: '#skills',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      }, containerRef);
    };

    load();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section id="skills" className={styles.skillsSection}>
      <h2 className={styles.heading}>Skills</h2>
      <div ref={containerRef} className={styles.grid}>
        {skillCategories.map((cat, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className={styles.category}>{cat.title}</h3>
            <ul className={styles.list}>
              {cat.items.map((item, i) => (
                <li key={i} className={styles.badge}> {item} </li>
              ))}
            </ul>
            <div className={styles.glowBar} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
