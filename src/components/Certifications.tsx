'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/Certifications.module.css';

interface Certification {
  title: string;
  issuer: string;
  description: string;
  url: string;
}

const certificationsList: Certification[] = [
  {
    title: 'Deep Learning in Ecological Studies',
    issuer: 'IIRS (ISRO), Dehradun',
    description: 'Completed ISRO–IIRS workshop covering neural networks, model interpretation, and ecological data analysis.',
    url: 'https://drive.google.com/file/d/1H4HDAm1-TsUgwcGokvVtckOFnUb_E_v4/view?usp=sharing',
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    description: 'Completed 8-week program covering supervised and unsupervised learning, data preprocessing, feature extraction, and model evaluation metrics.',
    url: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs149/Course/NPTEL25CS149S64290132909180590.pdf',
  },
  {
    title: 'Data Analytics',
    issuer: 'Deloitte (Forage)',
    description: 'Gained hands-on experience in Python-based data cleaning, analysis, and visualization using real-world datasets.',
    url: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_CxRayCrPQx2uoobxm_1774710519979_completion_certificate.pdf',
  },
];

const Certifications: React.FC = () => {
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
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#certifications',
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
    <section id="certifications" className={styles.certificationsSection}>
      <div className={styles.divider} />
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>— Credentials</span>
          <h2 className={styles.title}>Certifications</h2>
          <p className={styles.subtitle}>Continuous learning across AI, ML, and Data.</p>
        </div>
        <div ref={containerRef} className={styles.grid}>
          {certificationsList.map((cert, idx) => (
            <article key={idx} className={styles.card}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cert.title}</h3>
                <p className={styles.issuer}>{cert.issuer}</p>
                <p className={styles.description}>{cert.description}</p>
              </div>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                View Certificate <span className={styles.arrow}>→</span>
              </a>
              <div className={styles.glowBar} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
