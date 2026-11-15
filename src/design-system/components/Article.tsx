// Long-form building blocks for project pages: sections, prose, figures, galleries, quotes and stats.
import React from './react';

/* ---------- ArticleSection ---------- */
export interface ArticleSectionProps {
  /** Number on the right, like the guideline pages ("01"). */
  number?: string;
  title: string;
  /** Anchor id. */
  id?: string;
  children?: unknown;
  className?: string;
}

/** A chapter of a case study, framed like the brand guideline: title left, number right, thick rule below. */
export function ArticleSection({ number, title, id, children, className }: ArticleSectionProps) {
  return (
    <section id={id} className={'ds-article-section' + (className ? ' ' + className : '')}>
      <div className="ds-container">
        <header className="ds-article-section-head">
          <h2 className="ds-article-section-title">{title}</h2>
          {number && <span className="ds-article-section-number" aria-hidden="true">{number}</span>}
        </header>
        <div className="ds-article-section-body">{children as any}</div>
      </div>
    </section>
  );
}

/* ---------- Prose ---------- */
export interface ProseProps {
  /** Paragraphs, h3 subheads, lists, links and <Highlight>. Plain strings in an array become paragraphs. */
  children?: unknown;
  className?: string;
}

/** Reading column for long text: text-long style, prose-width measure, underlined links. */
export function Prose({ children, className }: ProseProps) {
  const content = Array.isArray(children) && children.every(c => typeof c === 'string')
    ? (children as string[]).map((p, i) => <p key={i}>{p}</p>)
    : (children as any);
  return <div className={'ds-prose' + (className ? ' ' + className : '')}>{content}</div>;
}

/* ---------- Figure ---------- */
export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** 'text': prose width. 'wide': content width. 'full': edge to edge. Default: 'wide'. */
  size?: 'text' | 'wide' | 'full';
  /** 'dark' puts the image on a color-black stage with padding, for logos with transparent backgrounds. Default: 'none'. */
  frame?: 'none' | 'dark';
  className?: string;
}

/** Image with an optional caption below. */
export function Figure({ src, alt, caption, size = 'wide', frame = 'none', className }: FigureProps) {
  return (
    <figure className={`ds-figure ds-figure--${size}` + (frame === 'dark' ? ' ds-figure--framed' : '') + (className ? ' ' + className : '')}>
      <div className="ds-figure-media"><img src={src} alt={alt} loading="lazy" /></div>
      {caption && <figcaption className="ds-caption-text">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- Gallery ---------- */
export interface GalleryItem { src: string; alt: string; caption?: string }
export interface GalleryProps {
  items: GalleryItem[];
  /** Default: 2. */
  columns?: 2 | 3;
  /** Same as Figure's frame. Default: 'none'. */
  frame?: 'none' | 'dark';
  className?: string;
}

/** Two or three images side by side (one column on phones), each with its caption. */
export function Gallery({ items, columns = 2, frame = 'none', className }: GalleryProps) {
  return (
    <div className={`ds-gallery ds-gallery--${columns}` + (className ? ' ' + className : '')}>
      {items.map(item => (
        <Figure key={item.src} {...item} size="text" frame={frame} />
      ))}
    </div>
  );
}

/* ---------- PullQuote ---------- */
export interface PullQuoteProps {
  /** The sentence to highlight. */
  children?: unknown;
  /** Who said it or where it comes from. */
  cite?: string;
  className?: string;
}

/** One sentence pulled out of the text, under a thick rule. */
export function PullQuote({ children, cite, className }: PullQuoteProps) {
  return (
    <figure className={'ds-quote' + (className ? ' ' + className : '')}>
      <blockquote>{children as any}</blockquote>
      {cite && <figcaption className="ds-label">{cite}</figcaption>}
    </figure>
  );
}

/* ---------- Stats ---------- */
export interface Stat { value: string; label: string }
export interface StatsProps {
  items: Stat[];
  className?: string;
}

/** Big Bebas numbers with a short label each. Only real, checkable numbers. */
export function Stats({ items, className }: StatsProps) {
  return (
    <dl className={'ds-stats' + (className ? ' ' + className : '')}>
      {items.map(s => (
        <div key={s.label} className="ds-stat">
          <dt className="ds-stat-label">{s.label}</dt>
          <dd className="ds-stat-value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
