'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/Projects.module.css';

interface Project {
  title: string;
  stack: string[];
  description: string;
  highlights: string[];
  url: string;
}

const projectsList: Project[] = [
  {
    title: 'Location-Based Real Estate Price Trend Analyzer',
    stack: ['Python', 'Pandas', 'NumPy', 'Leaflet.js', 'OpenStreetMap', 'HTML', 'CSS', 'JavaScript'],
    description: 'Developed an interactive geospatial analytics platform that transforms scattered real estate listings into actionable property insights. Built an end-to-end data pipeline that scrapes housing data, performs data cleaning and normalization, and visualizes location-wise pricing trends using OpenStreetMap and Leaflet.js. The platform enables users to compare neighborhood price patterns through an intuitive map-based interface without relying on paid mapping APIs.',
    highlights: [
      'Automated property data extraction and processing workflow',
      'Interactive geospatial visualization using Leaflet.js',
      'Location-based price trend analysis',
      'Cost-free mapping architecture using OpenStreetMap',
    ],
    url: 'https://github.com/SanikaZade/Real-Estate',
  },
  {
    title: 'EcoSphere — ESG Management Platform',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'JWT', 'Recharts', 'jsPDF', 'SheetJS'],
    description: 'Developed a comprehensive, AI-powered Environmental, Social, and Governance (ESG) management platform for tracking organizational sustainability. Created a centralized hub featuring role-based access control to monitor carbon emissions, manage CSR employee engagement with badges and XP, log compliance issues, and generate dynamic compliance reports in PDF and Excel formats.',
    highlights: [
      'Real-time carbon footprint and emission transaction tracking',
      'Gamified CSR module with employee challenges, badges, and XP system',
      'Governance module for policy audits, compliance logs, and scoring',
      'On-demand compliance report compiler exporting to PDF and Excel formats',
    ],
    url: 'https://github.com/SanikaZade/EcoSphere_Project',
  },
  {
    title: 'Amazon Sales Dashboard',
    stack: ['Python', 'Pandas', 'NumPy', 'HTML', 'CSS', 'JavaScript', 'Plotly.js'],
    description: 'Built an interactive, self-contained Business Intelligence dashboard analyzing 128k+ transaction logs from Amazon India. Designed a custom vectorized client-side JavaScript engine to compute and cross-filter sales, geographical, and fulfillment analytics instantly in under 50ms, paired with a Python data processing pipeline.',
    highlights: [
      'Aggregated over 128,000 e-commerce transactions using Python, Pandas, and NumPy',
      'Fast client-side in-memory filter engine running completely serverless',
      'Interactive geography maps, dual-axis timelines, and visual Sankey flow diagrams',
      '100% offline-capable single self-contained HTML bundle containing compiled datasets',
    ],
    url: 'https://github.com/SanikaZade/amazon_dashboard_project',
  },

];

const Projects: React.FC = () => {
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
              trigger: '#projects',
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
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Projects</h2>
        <div ref={containerRef} className={styles.grid}>
            <div className={styles.timelineLine} />

          {projectsList.map((project, idx) => (
            <div key={idx} className={styles.cardWrap}>
              <article className={styles.card}>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <div className={styles.stack}>
                    {project.stack.map((tech, i) => (
                      <span key={i} className={styles.pill}>{tech}</span>
                    ))}
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  <ul className={styles.highlights}>
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  View Project <span className={styles.arrow}>→</span>
                </a>
                <div className={styles.glowBar} />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
