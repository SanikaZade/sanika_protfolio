'use client';

import Navbar from '../components/Navbar';
import VideoIntro from '../components/VideoIntro';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Divider = () => (
  <hr style={{
    border: 'none',
    borderTop: '1px solid rgba(59,130,246,0.1)',
    margin: 0,
    width: '100%',
  }} />
);

export default function Home() {
  const handleScrollDown = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Navbar />
      <VideoIntro onScrollDown={handleScrollDown} />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <WorkExperience />
      <Divider />
      <Education />
      <Divider />
      <Certifications />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}
