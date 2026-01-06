'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';
import { examIcons } from '@/components/cards/ExamCard';

export default function UpcomingExamsWidget({ className }) {
  const upcomingExams = [
    {
      date: '11 May 26',
      name: 'Common Universities Entrance Test',
      shortName: 'CUET',
      icon: 'cuet',
      mode: 'Online Exam',
      href: '/exams/cuet'
    },
    {
      date: '22 Jan 26',
      name: 'Joint Entrance Exam Main',
      shortName: 'JEE Main',
      icon: 'jee',
      mode: 'Online Exam',
      href: '/exams/jee-main'
    },
    {
      date: '17 May 26',
      name: 'Joint Entrance Examination Advanced',
      shortName: 'JEE Advanced',
      icon: 'jee',
      mode: 'Online Exam',
      href: '/exams/jee-advanced'
    },
    {
      date: '17 Feb 26',
      name: 'CBSE Class X Board',
      shortName: 'CBSE Class X',
      icon: 'default',
      mode: 'Offline Exam',
      href: '/exams/cbse-class-10'
    },
    {
      date: '29 Apr 26',
      name: 'Telangana State Engineering Agriculture and Medical Common Entrance Test',
      shortName: 'TS EAMCET',
      icon: 'default',
      mode: 'Online Exam',
      href: '/exams/ts-eamcet'
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
          Upcoming Exams
        </h3>
      </div>

      {/* Exams List */}
      <div className="p-4 space-y-4">
        {upcomingExams.map((exam, index) => (
          <a
            key={index}
            href={exam.href}
            className="block group"
          >
            {/* Date */}
            <div className="flex items-center gap-1.5 mb-2">
              <Icon name="calendar" size="sm" className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">
                {exam.date} Examination
              </span>
            </div>

            {/* Exam Info */}
            <div className="flex items-start gap-2.5">
              {/* Exam Icon */}
              <div className="flex-shrink-0 w-12 h-12">
                {examIcons[exam.icon] || examIcons.default}
              </div>

              {/* Exam Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">
                  {exam.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {exam.mode}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
