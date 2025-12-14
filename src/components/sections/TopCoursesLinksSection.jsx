'use client';

import { cn } from '@/lib/cn';
import { QuickLinkGroup } from '../ui/QuickLink';

// Top courses links
const topCoursesLinks = [
  { label: 'BE/B.Tech', href: '/courses/be-btech' },
  { label: 'BA', href: '/courses/ba' },
  { label: 'B.Sc', href: '/courses/bsc' },
  { label: 'MBA/PGDM', href: '/courses/mba-pgdm' },
  { label: 'M.Sc', href: '/courses/msc' },
  { label: 'ME/M.Tech', href: '/courses/me-mtech' },
  { label: 'MA', href: '/courses/ma' },
  { label: 'Polytechnic', href: '/courses/polytechnic' },
  { label: 'BE/B.Tech Lateral', href: '/courses/be-btech-lateral' },
  { label: 'M.Phil/Ph.D in Science', href: '/courses/mphil-phd-science' },
  { label: 'B.Com', href: '/courses/bcom' },
  { label: 'MD', href: '/courses/md' },
  { label: 'BBA/BMS', href: '/courses/bba-bms' },
  { label: 'M.Phil/Ph.D in Arts', href: '/courses/mphil-phd-arts' },
  { label: 'M.Phil/Ph.D in Engineering', href: '/courses/mphil-phd-engineering' },
  { label: 'BCA', href: '/courses/bca' },
  { label: 'MCA', href: '/courses/mca' },
  { label: 'LLB', href: '/courses/llb' },
  { label: 'LLM', href: '/courses/llm' },
  { label: 'B.Pharmacy', href: '/courses/bpharmacy' },
];

function TopCoursesLinksSection({ className }) {
  return (
    <section className={cn('py-12 bg-slate-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuickLinkGroup
          title="Top Courses"
          links={topCoursesLinks}
        />
      </div>
    </section>
  );
}

export { TopCoursesLinksSection };
export default TopCoursesLinksSection;
