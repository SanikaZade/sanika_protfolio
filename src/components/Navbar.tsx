'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for entrance when it becomes visible
  useEffect(() => {
    if (isVisible) {
      const loadGSAP = async () => {
        const { gsap } = await import('gsap');
        gsap.fromTo(
          '#navbar-container',
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      };
      loadGSAP();
    }
  }, [isVisible]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <nav id="navbar-container" className={styles.navbar}>
      <div className={styles.navbarInner}>
        <div className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SZ
        </div>

        {/* Desktop menu */}
        <ul className={styles.navLinks}>
          <li className={styles.navItem} onClick={() => scrollTo('about')}>About</li>
          <li className={styles.navItem} onClick={() => scrollTo('skills')}>Skills</li>
          <li className={styles.navItem} onClick={() => scrollTo('projects')}>Projects</li>
          <li className={styles.navItem} onClick={() => scrollTo('experience')}>Experience</li>
          <li className={styles.navItem} onClick={() => scrollTo('education')}>Education</li>
          <li className={styles.navItem} onClick={() => scrollTo('contact')}>Contact</li>
        </ul>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuActive : ''}`}>
        <ul className={styles.mobileLinks}>
          <li className={styles.mobileItem} onClick={() => scrollTo('about')}>About</li>
          <li className={styles.mobileItem} onClick={() => scrollTo('skills')}>Skills</li>
          <li className={styles.mobileItem} onClick={() => scrollTo('projects')}>Projects</li>
          <li className={styles.mobileItem} onClick={() => scrollTo('experience')}>Experience</li>
          <li className={styles.mobileItem} onClick={() => scrollTo('education')}>Education</li>
          <li className={styles.mobileItem} onClick={() => scrollTo('contact')}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
