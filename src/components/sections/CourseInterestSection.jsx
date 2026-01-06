'use client';

import { useState } from 'react';
import CourseInterestCard from '@/components/cards/CourseInterestCard';
import { Button } from '@/components/ui';

export default function CourseInterestSection() {
  const [showAll, setShowAll] = useState(false);

  const interests = [
    {
      id: 'engineering',
      title: 'Engineering',
      icon: 'settings',
      courses: ['BE/B.Tech', 'ME/M.Tech', 'Polytechnic'],
      link: '/courses/engineering',
    },
    {
      id: 'medical',
      title: 'Medical',
      icon: 'heart',
      courses: ['BAMS', 'B.Sc (Medicine)', 'BHMS', 'Bachelor of Physiotherapy(BPT)'],
      link: '/courses/medical',
    },
    {
      id: 'science',
      title: 'Science',
      icon: 'flask',
      courses: ['M.Sc', 'B.Sc', 'B.F.Sc', 'M.F.Sc'],
      link: '/courses/science',
    },
    {
      id: 'commerce',
      title: 'Commerce',
      icon: 'shoppingCart',
      courses: ['M.Com', 'B.Com'],
      link: '/courses/commerce',
    },
    {
      id: 'management',
      title: 'Management',
      icon: 'briefcase',
      courses: ['BBA/BMS', 'MBA/PGDM', 'BHM (Hospital)', 'Executive MBA'],
      link: '/courses/management',
    },
    {
      id: 'arts',
      title: 'Arts',
      icon: 'palette',
      courses: ['BA', 'BFA', 'BSW', 'MA'],
      link: '/courses/arts',
    },
    {
      id: 'computer',
      title: 'Computer Applications',
      icon: 'monitor',
      courses: ['BCA', 'MCA'],
      link: '/courses/computer-applications',
    },
    {
      id: 'education',
      title: 'Education',
      icon: 'book',
      courses: ['B.Ed', 'B.P.Ed', 'M.Ed', 'M.P.Ed'],
      link: '/courses/education',
    },
    {
      id: 'law',
      title: 'Law',
      icon: 'scale',
      courses: ['LLB', 'LLM', 'BA/BBA LLB'],
      link: '/courses/law',
    },
  ];

  const displayedInterests = showAll ? interests : interests.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            CHOOSE BY INTEREST
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Collegedunia.com is an extensive search engine for the students, parents,
            and education industry players who are seeking information
          </p>
        </div>

        {/* Interest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedInterests.map((interest) => (
            <CourseInterestCard key={interest.id} interest={interest} />
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && interests.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="border-gray-300 hover:border-green-500 hover:text-green-700"
            >
              Show more streams
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
