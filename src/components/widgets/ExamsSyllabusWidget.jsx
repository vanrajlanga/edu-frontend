'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';
import { examIcons } from '@/components/cards/ExamCard';

export default function ExamsSyllabusWidget({ className }) {
  const exams = [
    {
      name: 'CAT',
      icon: 'cat',
      mode: 'Online Exam',
      links: [
        { label: 'Exam Pattern', href: '/exams/cat/pattern' },
        { label: 'Paper Analysis', href: '/exams/cat/paper-analysis' },
        { label: 'Virtual Calculator', href: '/exams/cat/calculator' },
        { label: 'Syllabus', href: '/exams/cat/syllabus' }
      ]
    },
    {
      name: 'JEE Main',
      icon: 'jee',
      mode: 'Online Exam',
      links: [
        { label: 'Exam Pattern', href: '/exams/jee-main/pattern' },
        { label: 'Syllabus', href: '/exams/jee-main/syllabus' }
      ]
    },
    {
      name: 'GATE',
      icon: 'gate',
      mode: 'Online Exam',
      links: [
        { label: 'Exam Pattern', href: '/exams/gate/pattern' },
        { label: 'Paper Analysis', href: '/exams/gate/paper-analysis' },
        { label: 'Virtual Calculator', href: '/exams/gate/calculator' },
        { label: 'CS Syllabus', href: '/exams/gate/cs-syllabus' }
      ]
    }
  ];

  return (
    <div
      className={cn(
        'bg-white rounded-lg',
        'border border-gray-200',
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">
          Exams 2026 Syllabus
        </h3>
      </div>

      {/* Exams List */}
      <div>
        {exams.map((exam, examIndex) => (
          <div
            key={examIndex}
            className={cn(
              'p-4',
              examIndex !== exams.length - 1 && 'border-b border-gray-200'
            )}
          >
            {/* Exam Header */}
            <div className="flex items-start gap-2.5 mb-3">
              {/* Exam Icon */}
              <div className="flex-shrink-0 w-12 h-12">
                {examIcons[exam.icon] || examIcons.default}
              </div>

              {/* Exam Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                  {exam.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {exam.mode}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-1.5">
              {exam.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between',
                    'py-1.5 px-2 rounded',
                    'text-sm text-gray-700',
                    'hover:bg-blue-50 hover:text-blue-700',
                    'transition-colors duration-200'
                  )}
                >
                  <span>{link.label}</span>
                  <Icon name="chevronRight" size="sm" className="text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
