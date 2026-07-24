'use client';

import { useEffect, useRef } from 'react';
import styles from './WorkExperience.module.css';

interface Experience {
  company: string;
  role: string;
  duration: string;
  current: boolean;
  description: string;
  tags: string[];
  offerLetterUrl?: string;
  metadata?: { label: string; value: string }[];
}

const experiences: Experience[] = [
  {
    company: 'NextLeap',
    role: 'AI Content Curator Intern',
    duration: 'April 2026 – Present',
    current: true,
    description:
      'Curating high-quality AI & ML learning content and building structured knowledge pathways for the next generation of engineers.',
    tags: ['AI', 'Content Strategy', 'ML', 'Research'],
    offerLetterUrl: 'https://drive.google.com/file/d/13E6HH9HXHi_dYw-oupG3B3G7WMaw1vQ-/view?usp=sharing',
    metadata: [
      { label: 'Position', value: 'AI Content Curator' },
      { label: 'Location', value: 'Mumbai' },
      { label: 'Duration', value: 'April 2026 – Present' },
      { label: 'Issued by', value: 'Neha Pal, Cofounder & Head of Operations' },
    ],
  },
  {
    company: 'InnoByte Services',
    role: 'Data Analyst Intern',
    duration: 'July – August 2026',
    current: false,
    description:
      'Working with the analytics team to support data-driven projects including data collection, analysis, and visualization. Gaining valuable experience and insights into data analysis and the latest analytical tools and techniques.',
    tags: ['Data Analysis', 'Data Collection', 'Visualization', 'Analytics'],
    offerLetterUrl: 'https://drive.google.com/file/d/1fVpexC2NiUjnffzw3a2ciNqlZYxJXyX3/view?usp=sharing',
    metadata: [
      { label: 'Position', value: 'Data Analyst Intern' },
      { label: 'Location', value: 'New Delhi, India' },
      { label: 'Duration', value: 'July 6 – August 5, 2026' },
      { label: 'Issued by', value: 'Sonali Agarwal, Sr. H.R. Director' },
    ],
  },
  {
    company: 'Clustor Computing',
    role: 'Data Analyst Intern',
    duration: 'April – May 2025',
    current: false,
    description:
      'Worked on a real estate analytics project in a 5-member team. Performed data preprocessing, visualization, and interactive dashboard creation using Python and Power BI. Automated dataset extraction pipelines, significantly improving data collection efficiency.',
    tags: ['Python', 'Power BI', 'Data Visualization', 'EDA', 'Excel'],
    offerLetterUrl: 'https://drive.google.com/file/d/189uGOsB3f2LgE_f3aLsp55HWTiDSaXPj/view?usp=sharing',
    metadata: [
      { label: 'Position', value: 'Data Analyst Intern' },
      { label: 'Location', value: 'Nagpur, Maharashtra' },
      { label: 'Duration', value: 'April – May 2025' },
      { label: 'Team Size', value: '5 Members' },
    ],
  },
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading
        gsap.fromTo(
          headingRef.current?.querySelectorAll('[data-h]') ?? [],
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Cards
        gsap.fromTo(
          cardsRef.current?.querySelectorAll('[data-card]') ?? [],
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.18,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, sectionRef);
    };

    load();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="experience">
      <div className={styles.inner}>
        {/* Heading */}
        <div ref={headingRef} className={styles.heading}>
          <span data-h className={styles.eyebrow}>— Career</span>
          <h2 data-h className={styles.title}>Experience</h2>
          <p data-h className={styles.desc}>
            Where skills meet real-world impact.
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experiences.map((exp, i) => (
            <div key={i} data-card className={styles.cardWrap}>
              <div className={`${styles.card} ${exp.current ? styles.cardActive : ''}`}>
                {exp.current && <div className={styles.activePing} />}

                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.company}>{exp.company}</p>
                    <p className={styles.role}>{exp.role}</p>
                  </div>
                  <span className={`${styles.badge} ${exp.current ? styles.badgeLive : ''}`}>
                    {exp.current && <span className={styles.badgeDot} />}
                    {exp.duration}
                  </span>
                </div>

                <p className={styles.cardDesc}>{exp.description}</p>

                <div className={styles.tags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {exp.offerLetterUrl && (
                  <a
                    href={exp.offerLetterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.offerBtn}
                  >
                    View Offer Letter <span className={styles.offerArrow}>→</span>
                  </a>
                )}

                {exp.metadata && (
                  <div className={styles.metaGrid}>
                    {exp.metadata.map((m) => (
                      <div key={m.label} className={styles.metaItem}>
                        <span className={styles.metaLabel}>{m.label}</span>
                        <span className={styles.metaValue}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {exp.current && <div className={styles.glowBar} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
