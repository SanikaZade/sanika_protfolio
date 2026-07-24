'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Education.module.css';

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  current: boolean;
  description?: string;
  tags?: string[];
}

const educationData: EducationItem[] = [
  {
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    institution: 'DMIHER(DU)',
    duration: '2023 – 2027',
    current: true,
    description: 'Focusing on advanced algorithms, machine learning pipelines, deep learning, NLP, computer vision, and data analytics.',
    tags: ['Machine Learning', 'Deep Learning', 'Data Science', 'Python', 'AI'],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <section ref={sectionRef} className={styles.section} id="education">
      <div className={styles.inner}>
        {/* Heading */}
        <div ref={headingRef} className={styles.heading}>
          <span data-h className={styles.eyebrow}>— Learning Path</span>
          <h2 data-h className={styles.title}>Education</h2>
          <p data-h className={styles.desc}>
            Building a strong theoretical and practical foundation.
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className={styles.timeline}>
          <div className={styles.timelineLine} />

          {educationData.map((edu, i) => (
            <div key={i} data-card className={styles.cardWrap}>
              <div className={`${styles.card} ${edu.current ? styles.cardActive : ''}`}>
                {edu.current && <div className={styles.activePing} />}

                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                    <p className={styles.institutionFull}>Datta Meghe Institute of Higher Education and Research, Wardha</p>
                    <p className={styles.institutionFull}>Faculty of Engineering and Technology</p>
                  </div>
                  <span className={`${styles.badge} ${edu.current ? styles.badgeLive : ''}`}>
                    {edu.current && <span className={styles.badgeDot} />}
                    {edu.duration}
                  </span>
                </div>

                {edu.description && <p className={styles.cardDesc}>{edu.description}</p>}

                {edu.tags && (
                  <div className={styles.tags}>
                    {edu.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {edu.current && <div className={styles.glowBar} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
