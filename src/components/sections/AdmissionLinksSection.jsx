'use client';

import { cn } from '@/lib/cn';
import { QuickLinkGroup } from '../ui/QuickLink';

// Admission 2025 links
const admissionLinks = [
  { label: 'B Ed Admission 2025', href: '/admissions/bed-2025' },
  { label: 'MBA Admission 2025', href: '/admissions/mba-2025' },
  { label: 'MBBS Admission 2025', href: '/admissions/mbbs-2025' },
  { label: 'BA Admission 2025', href: '/admissions/ba-2025' },
  { label: 'M Tech Admission 2025', href: '/admissions/mtech-2025' },
  { label: 'PhD Admission 2025', href: '/admissions/phd-2025' },
  { label: 'LLB Admission 2025', href: '/admissions/llb-2025' },
  { label: 'D El Ed Admission 2025', href: '/admissions/deled-2025' },
  { label: 'BSc Admission 2025', href: '/admissions/bsc-2025' },
  { label: 'B Pharmacy Admission 2025', href: '/admissions/bpharmacy-2025' },
  { label: 'BCA Admission 2025', href: '/admissions/bca-2025' },
  { label: 'B Tech Admission 2025', href: '/admissions/btech-2025' },
  { label: 'BBA Admission 2025', href: '/admissions/bba-2025' },
  { label: 'B Com Admission 2025', href: '/admissions/bcom-2025' },
];

function AdmissionLinksSection({ className }) {
  return (
    <section className={cn('py-12 bg-slate-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuickLinkGroup
          title="Admission 2025"
          links={admissionLinks}
        />
      </div>
    </section>
  );
}

export { AdmissionLinksSection };
export default AdmissionLinksSection;
