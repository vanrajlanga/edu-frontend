'use client';

import { cn } from '@/lib/cn';
import { QuickLinkPill } from '../ui/QuickLinkPill';

// Class 12 links data
const class12Links = [
  { label: 'CBSE Class 12', href: '/cbse/class-12' },
  { label: 'CBSE Class 12th Results', href: '/cbse/class-12/results' },
  { label: 'CBSE Class 12th Previous Year Papers', href: '/cbse/class-12/previous-papers' },
  { label: 'CBSE Class 12th Syllabus', href: '/cbse/class-12/syllabus' },
  { label: 'CBSE Class 12th Exam Dates', href: '/cbse/class-12/exam-dates' },
  { label: 'CBSE Class 12th Admit Card', href: '/cbse/class-12/admit-card' },
  { label: 'NCERT Solutions Class 12th Physics', href: '/ncert/class-12/physics' },
  { label: 'NCERT Solutions Class 12th Chemistry', href: '/ncert/class-12/chemistry' },
  { label: 'NCERT Solutions Class 12th Biology', href: '/ncert/class-12/biology' },
  { label: 'NCERT Solutions Class 12th Maths', href: '/ncert/class-12/maths' },
  { label: 'CBSE Class 12th Notes', href: '/cbse/class-12/notes' },
  { label: 'CBSE Class 12th Physics Notes', href: '/cbse/class-12/notes/physics' },
  { label: 'CBSE Class 12th Chemistry Notes', href: '/cbse/class-12/notes/chemistry' },
  { label: 'CBSE Class 12th Biology Notes', href: '/cbse/class-12/notes/biology' },
];

// Class 10 links data
const class10Links = [
  { label: 'CBSE Class 10', href: '/cbse/class-10' },
  { label: 'CBSE Class 10th Result', href: '/cbse/class-10/results' },
  { label: 'CBSE Class 10 Previous Year Papers', href: '/cbse/class-10/previous-papers' },
  { label: 'CBSE Class 10th Syllabus', href: '/cbse/class-10/syllabus' },
  { label: 'CBSE Class 10th Exam Dates', href: '/cbse/class-10/exam-dates' },
  { label: 'CBSE Class 10th Admit Card', href: '/cbse/class-10/admit-card' },
  { label: 'NCERT Solutions Class 10th Maths', href: '/ncert/class-10/maths' },
  { label: 'NCERT Solutions Class 10th Science', href: '/ncert/class-10/science' },
];

// Reusable Board Exam Block component
function BoardExamBlock({ title, links, className }) {
  return (
    <div className={cn('py-10', className)}>
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-green-500 rounded-full" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h3>
      </div>

      {/* Links Grid */}
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => (
          <QuickLinkPill key={index} href={link.href}>
            {link.label}
          </QuickLinkPill>
        ))}
      </div>
    </div>
  );
}

function BoardExamLinksSection({ className }) {
  return (
    <section className={cn('py-8 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Class XII Section */}
        <BoardExamBlock
          title="CBSE Class XII Board Exam"
          links={class12Links}
        />

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Class X Section */}
        <BoardExamBlock
          title="CBSE Class X Board Exam"
          links={class10Links}
        />
      </div>
    </section>
  );
}

export { BoardExamLinksSection, BoardExamBlock };
export default BoardExamLinksSection;
