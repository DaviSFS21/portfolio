import React from './react';

export interface ProjectCardImage {
  src: string;
  alt: string;
  /** Image width inside the card. Default: "80%" on wide cards; half cards size the logo by height so logos side by side match. */
  width?: string;
  /** A brand mark, not a screenshot: sized by height like in the half card, also in the wide card. Half cards always do this. */
  logo?: boolean;
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
      data-reveal="up"
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
    >
      {image && (
        <div className={'ds-card-media' + (image.logo ? ' ds-card-media--logo' : '')}>
          <img src={image.src} alt={image.alt} style={image.width ? { width: image.width } : undefined} loading="lazy" />
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
