import React from 'react';
import styles from './ProjectCard.module.css';

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  projectUrl: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  projectUrl,
}) => (
  <article className={styles.card}>
    <img src={image} alt={title} className={styles.image} />
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <a
        href={projectUrl}
        className={styles.button}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View project: ${title}`}
      >
        View Project
      </a>
    </div>
  </article>
);

export default ProjectCard;
