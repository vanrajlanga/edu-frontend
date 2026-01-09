'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Footer link columns data
const footerLinks = {
  topColleges: {
    title: 'Top Colleges',
    links: [
      { label: 'M.B.A', href: '/colleges/mba' },
      { label: 'B.Tech/B.E', href: '/colleges/btech' },
      { label: 'MCA', href: '/colleges/mca' },
      { label: 'BCA', href: '/colleges/bca' },
      { label: 'M.Tech', href: '/colleges/mtech' },
      { label: 'MA', href: '/colleges/ma' },
      { label: 'BA', href: '/colleges/ba' },
    ],
  },
  topUniversities: {
    title: 'Top Universities',
    links: [
      { label: 'Engineering', href: '/universities/engineering' },
      { label: 'Management', href: '/universities/management' },
      { label: 'Medical', href: '/universities/medical' },
      { label: 'Law', href: '/universities/law' },
      { label: 'Commerce', href: '/universities/commerce' },
      { label: 'Science', href: '/universities/science' },
      { label: 'Arts', href: '/universities/arts' },
    ],
  },
  topExams: {
    title: 'Top Exams',
    links: [
      { label: 'CAT', href: '/exams/cat' },
      { label: 'GATE', href: '/exams/gate' },
      { label: 'JEE Main', href: '/exams/jee-main' },
      { label: 'NEET', href: '/exams/neet' },
      { label: 'XAT', href: '/exams/xat' },
      { label: 'CLAT', href: '/exams/clat' },
      { label: 'MAT', href: '/exams/mat' },
    ],
  },
  studyAbroad: {
    title: 'Study Abroad',
    links: [
      { label: 'Canada', href: '/study-abroad/canada' },
      { label: 'USA', href: '/study-abroad/usa' },
      { label: 'UK', href: '/study-abroad/uk' },
      { label: 'Australia', href: '/study-abroad/australia' },
      { label: 'Germany', href: '/study-abroad/germany' },
      { label: 'Ireland', href: '/study-abroad/ireland' },
      { label: 'Singapore', href: '/study-abroad/singapore' },
    ],
  },
  boardExams: {
    title: 'Board Exams',
    links: [
      { label: 'CBSE Class 12', href: '/board-exams/cbse-12' },
      { label: 'CBSE Class 12th Results', href: '/board-exams/cbse-12-results' },
      { label: 'CBSE Class 12th Syllabus', href: '/board-exams/cbse-12-syllabus' },
      { label: 'CBSE Class 10', href: '/board-exams/cbse-10' },
      { label: 'CBSE Class 10th Result', href: '/board-exams/cbse-10-results' },
      { label: 'CBSE Class 10th Syllabus', href: '/board-exams/cbse-10-syllabus' },
    ],
  },
};

const otherLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Careers', href: '/careers' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

// Social media icons as SVG paths (filled style for social icons)
const socialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  rss: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
    </svg>
  ),
};

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm text-gray-600 hover:text-blue-900 transition-colors inline-flex items-center gap-1 group"
            >
              <span className="w-0 h-0.5 bg-blue-500 group-hover:w-2 transition-all duration-200" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ className }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={cn('bg-slate-50 relative', className)}>
      {/* Top Border Gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Description */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <a href="/" className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                  <Icon name="graduationCap" size="lg" className="text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EduPortal</span>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your trusted companion for educational guidance. Discover colleges, explore courses,
                and stay updated with the latest exam notifications.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {Object.entries(socialIcons).map(([name, icon]) => (
                <a
                  key={name}
                  href={`https://${name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'bg-white border border-gray-200 shadow-sm',
                    'text-gray-500 hover:text-white',
                    'hover:bg-blue-500 hover:border-blue-800',
                    'transition-all duration-200'
                  )}
                  aria-label={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10 pb-10 border-b border-gray-200">
          {Object.values(footerLinks).map((column) => (
            <FooterLinkColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>

        {/* Other Links & Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Other Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {otherLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EduPortal. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-8 right-8 z-50',
          'w-12 h-12 rounded-full',
          'bg-white border border-gray-200 shadow-lg',
          'flex items-center justify-center',
          'text-gray-600 hover:text-blue-900',
          'hover:border-blue-300 hover:shadow-xl',
          'transition-all duration-300',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="Scroll to top"
      >
        <Icon name="arrowUp" size="md" />
      </button>
    </footer>
  );
}

export { Footer };
export default Footer;
