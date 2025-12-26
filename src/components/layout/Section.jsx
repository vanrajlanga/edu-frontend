'use client';

import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Icon } from '../ui/Icon';

const sectionPaddings = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
};

const sectionBackgrounds = {
  default: 'bg-background',
  surface: 'bg-surface',
  alt: 'bg-surface-alt',
  dark: 'bg-slate-900 text-white',
  gradient: 'gradient-mesh',
  primary: 'bg-green-50',
};

function Section({
  padding = 'md',
  background = 'default',
  containerSize = 'xl',
  className,
  children,
  ...props
}) {
  return (
    <section
      className={cn(
        sectionPaddings[padding],
        sectionBackgrounds[background],
        className
      )}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = 'View All',
  align = 'left',
  className,
  children,
}) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div
      className={cn(
        'mb-8 md:mb-12',
        align === 'center' && 'max-w-2xl',
        alignStyles[align],
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-text-secondary max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className={cn(
              'inline-flex items-center gap-1.5',
              'text-green-800 hover:text-green-900',
              'font-medium text-sm',
              'transition-colors duration-[var(--duration-fast)]',
              'group'
            )}
          >
            {viewAllText}
            <Icon
              name="arrowRight"
              size="sm"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

function SectionDivider({ variant = 'line', className }) {
  if (variant === 'wave') {
    return (
      <div className={cn('w-full overflow-hidden', className)}>
        <svg
          className="w-full h-12 md:h-16 text-surface-alt"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full h-px bg-border-strong',
        className
      )}
    />
  );
}

export { Section, SectionHeader, SectionDivider, sectionPaddings, sectionBackgrounds };
export default Section;
