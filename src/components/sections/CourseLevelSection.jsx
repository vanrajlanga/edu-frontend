'use client';

import CourseLevelCard from '@/components/cards/CourseLevelCard';

export default function CourseLevelSection() {
  const courseLevels = [
    {
      id: 'after-10th',
      title: 'After 10th Courses',
      subtitle: 'Applicable for Diploma courses & Certification courses',
      image: null, // Can add actual image path later: '/assets/images/courses/after-10th.jpg'
      placeholderGradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
      categories: [
        { name: 'ITI', count: 16 },
        { name: 'Arts', count: 4 },
        { name: 'Dental', count: 2 },
        { name: 'Animation', count: 1 },
        { name: 'Hotel Management', count: 1 },
        { name: 'Vocational Courses', count: 1 },
      ],
    },
    {
      id: 'after-12th',
      title: 'After 10+2 Courses',
      subtitle: 'Applicable for Degree courses & Diploma courses & Certification courses',
      image: null,
      placeholderGradient: 'bg-gradient-to-br from-slate-700 to-slate-900',
      categories: [
        { name: 'Engineering', count: 207 },
        { name: 'Arts', count: 145 },
        { name: 'Science', count: 135 },
        { name: 'Management', count: 89 },
        { name: 'Commerce', count: 53 },
        { name: 'Education', count: 38 },
        { name: 'Medical', count: 34 },
        { name: 'Paramedical', count: 32 },
        { name: 'Design', count: 30 },
      ],
    },
    {
      id: 'diploma',
      title: 'Diploma Courses',
      subtitle: 'Applicable for Diploma courses',
      image: null,
      placeholderGradient: 'bg-gradient-to-br from-amber-700 to-slate-800',
      categories: [
        { name: 'Management', count: 79 },
        { name: 'Arts', count: 31 },
        { name: 'Medical', count: 26 },
        { name: 'Engineering', count: 23 },
        { name: 'Law', count: 14 },
        { name: 'Paramedical', count: 14 },
        { name: 'Science', count: 13 },
        { name: 'Hotel Management', count: 10 },
        { name: 'Design', count: 9 },
      ],
    },
    {
      id: 'certification',
      title: 'Certification Courses',
      subtitle: 'Applicable for Certification courses',
      image: null,
      placeholderGradient: 'bg-gradient-to-br from-yellow-600 to-slate-700',
      categories: [
        { name: 'Arts', count: 12 },
        { name: 'Commerce', count: 9 },
        { name: 'Management', count: 8 },
        { name: 'Science', count: 6 },
        { name: 'Design', count: 4 },
        { name: 'Computer Applications', count: 4 },
        { name: 'Education', count: 2 },
        { name: 'Law', count: 2 },
        { name: 'Agriculture', count: 2 },
      ],
    },
    {
      id: 'masters',
      title: 'Masters Degree/Post Graduation Courses',
      subtitle: 'Applicable for Degree courses & Diploma courses',
      image: null,
      placeholderGradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
      categories: [
        { name: 'Management', count: 217 },
        { name: 'Engineering', count: 170 },
        { name: 'Medical', count: 126 },
        { name: 'Science', count: 113 },
        { name: 'Arts', count: 104 },
        { name: 'Law', count: 25 },
        { name: 'Commerce', count: 23 },
        { name: 'Dental', count: 20 },
        { name: 'Pharmacy', count: 15 },
      ],
    },
    {
      id: 'phd',
      title: 'Ph.D Research Courses',
      subtitle: 'Applicable for Degree courses',
      image: null,
      placeholderGradient: 'bg-gradient-to-br from-slate-700 to-slate-900',
      categories: [
        { name: 'Science', count: 67 },
        { name: 'Arts', count: 64 },
        { name: 'Medical', count: 35 },
        { name: 'Engineering', count: 25 },
        { name: 'Management', count: 22 },
        { name: 'Pharmacy', count: 8 },
        { name: 'Commerce', count: 7 },
        { name: 'Agriculture', count: 8 },
        { name: 'Law', count: 4 },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            DON'T KNOW WHAT TO CHOOSE ?<br />
            CHOOSE BY YOUR LEVEL
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Collegedunia.com is an extensive search engine for the students, parents,
            and education industry players who are seeking information
          </p>
        </div>

        {/* Course Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseLevels.map((level) => (
            <CourseLevelCard key={level.id} level={level} />
          ))}
        </div>
      </div>
    </section>
  );
}
