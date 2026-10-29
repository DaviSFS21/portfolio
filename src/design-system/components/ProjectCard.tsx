import React from './react';

export interface ProjectCardImage {
  src: string;
  alt: string;
  /** Image width inside the card. Default: "80%". */
  width?: string;
}

export interface ProjectCardProps {
  /** 'wide': image left, text right, full row. 'half': logo on top, text centered, half a row. Default: 'half'. */
  variant?: 'wide' | 'half';
  /** Project name in the "Name - Type" format, e.g. "sqlutions - Branding". */
  title: string;
  /** One or two sentences: what was done, for whom, with what. An array renders one paragraph per item. */
  description?: string | string[];
  image?: ProjectCardImage;
  href: string;
  /** Open in a new tab, like the site. Default: true. */
  newTab?: boolean;
  className?: string;
}

/** Project card: dark surface on gradient-projects; on hover it turns primary, lifts 5px and casts shadow-card. */
export function ProjectCard({ variant = 'half', title, description, image, href, newTab = true, className }: ProjectCardProps) {
  const paragraphs = description == null ? [] : Array.isArray(description) ? description : [description];
  return (
    <a
      className={`ds-card ds-card--${variant}` + (className ? ' ' + className : '')}
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
    >
      {image && (
        <div className="ds-card-media">
          <img src={image.src} alt={image.alt} style={{ width: image.width || '80%' }} loading="lazy" />
        </div>
      )}
      <div className="ds-card-body">
        <h3 className="ds-card-title">{title}</h3>
        {paragraphs.map((p, i) => (
          <p key={i} className="ds-card-text">{p}</p>
        ))}
      </div>
    </a>
  );
}
