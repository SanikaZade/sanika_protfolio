'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

interface VideoIntroProps {
  onScrollDown: () => void;
}

export default function VideoIntro({ onScrollDown }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const gsapRef = useRef<{ gsap: typeof import('gsap').gsap } | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const load = async () => {
      const { gsap } = await import('gsap');
      gsapRef.current = { gsap };

      // Entrance animation
      gsap.set(titleRef.current, { opacity: 0 });
      setLoaded(true);

      await new Promise(r => setTimeout(r, 400));

      gsap.fromTo(
        titleRef.current?.querySelectorAll('[data-anim]') ?? [],
        { y: 60, opacity: 0, filter: 'blur(12px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
      gsap.to(titleRef.current, { opacity: 1, duration: 0.1 });
    };

    load();

    timeout = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play(); bg?.play();
      setPlaying(true);
    } else {
      v.pause(); bg?.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* Ambient blurred BG */}
      <div className={styles.bgLayer}>
        <video
          ref={bgVideoRef}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
        />
        <div className={styles.bgBlur} />
      </div>

      {/* Cinematic gradients */}
      <div className={styles.gradientTop} />
      <div className={styles.gradientBottom} />
      <div className={styles.gradientLeft} />
      <div className={styles.gradientRight} />
      <div className={styles.vignette} />

      {/* Three.js particles */}
      <CinematicLayer />

      {/* Foreground video */}
      <div className={styles.videoFrame}>
        <div className={styles.videoGlow} />
        <video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
          onCanPlay={() => setLoaded(true)}
        />
        <div className={styles.videoOverlay} />
      </div>

      {/* Text overlay */}
      <div ref={titleRef} className={styles.content} style={{ opacity: 0 }}>
        <span data-anim className={styles.tagline}>AI &amp; ML ENGINEER</span>

        <div className={styles.nameBlock}>
          <h1 data-anim className={styles.firstName}>SANIKA</h1>
          <h1 data-anim className={styles.lastName}>ZADE</h1>
        </div>

        <p data-anim className={styles.subtitle}>
          B.Tech AI &amp; ML&nbsp;&nbsp;·&nbsp;&nbsp;Data Analyst&nbsp;&nbsp;·&nbsp;&nbsp;ML Engineer
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.glassBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>

        <button
          className={styles.glassBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <path d="M19.07,4.93a10,10,0,0,1,0,14.14"/>
              <path d="M15.54,8.46a5,5,0,0,1,0,7.07"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sound hint */}
      {showSoundHint && (
        <div className={styles.soundHint}>
          <span className={styles.soundDot} />
          Tap for sound
        </div>
      )}

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={onScrollDown} aria-label="Scroll down">
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </button>
    </section>
  );
}
