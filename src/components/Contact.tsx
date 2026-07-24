'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Contact.module.css';

interface ContactLink {
  title: string;
  value: string;
  url: string;
  icon: React.ReactNode;
}

const contactLinks: ContactLink[] = [
  {
    title: 'Email',
    value: 'zadesanika25@gmail.com',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=zadesanika25@gmail.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    value: 'sanikazade',
    url: 'https://www.linkedin.com/in/sanikazade',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    value: 'SanikaZade',
    url: 'https://github.com/SanikaZade',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    title: 'Instagram',
    value: '_sanikazade_',
    url: 'https://www.instagram.com/_sanikazade_/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    title: 'Reddit',
    value: 'Unusual_Copy_7568',
    url: 'https://www.reddit.com/user/Unusual_Copy_7568/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M17 11.5a1.5 1.5 0 0 1-2.5 1.1 8 8 0 0 0-5 0A1.5 1.5 0 1 1 7 11.5c0-.6.3-1.1.8-1.3A6 6 0 0 1 12 9a6 6 0 0 1 4.2 1.2c.5.2.8.7.8 1.3z" />
        <circle cx="10" cy="12" r="1" fill="currentColor" />
        <circle cx="14" cy="12" r="1" fill="currentColor" />
        <path d="M11 15a3 3 0 0 0 2 0" />
      </svg>
    ),
  },
  {
    title: 'X',
    value: 'ZadeSanu997083',
    url: 'https://x.com/ZadeSanu997083',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    title: 'Discord',
    value: '_sanika_',
    url: 'https://discord.com/users/1266236267935567943',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M19.5 6a15.2 15.2 0 0 0-3.8-1.2 9.6 9.6 0 0 0-.6 1.2 20.8 20.8 0 0 0-6.2 0 8.4 8.4 0 0 0-.6-1.2 15.2 15.2 0 0 0-3.8 1.2C2 12.8 3.5 19.3 5 22a15.5 15.5 0 0 0 4-1.2 11.5 11.5 0 0 0 1.2-2 12.7 12.7 0 0 1-2-.9c.2-.1.4-.3.6-.4a14.3 14.3 0 0 0 8.4 0c.2.1.4.3.6.4-.6.3-1.3.6-2 .9a11.5 11.5 0 0 0 1.2 2 15.5 15.5 0 0 0 4 1.2C21.8 17.6 22 11.2 19.5 6z" />
      </svg>
    ),
  },
  {
    title: 'Resume',
    value: 'View my Resume',
    url: 'https://drive.google.com/file/d/17xZ92nt2RwOmkJ22zx-9LUhojKqfPZOV/view?usp=sharing',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const elements = containerRef.current?.querySelectorAll('[data-fade]');
        if (elements) {
          gsap.fromTo(
            elements,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }, containerRef);
    };

    load();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles.section} id="contact">
      {/* Ambient gradient circle */}
      <div className={styles.ambientGlow} />

      <div ref={containerRef} className={styles.inner}>
        <div data-fade className={styles.header}>
          <h2 className={styles.title}>Let&apos;s Connect</h2>
          <p className={styles.subtitle}>
            Open to internships, collaborations, and ML research opportunities.
          </p>
        </div>

        <div className={styles.grid}>
          {contactLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              data-fade
              className={styles.card}
            >
              <div className={styles.iconContainer}>{link.icon}</div>
              <h3 className={styles.cardTitle}>{link.title}</h3>
              <p className={styles.cardValue}>{link.value}</p>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
