import CourseCollegesPage from '@/components/pages/CourseCollegesPage';
import CourseLocationCollegesPage from '@/components/pages/CourseLocationCollegesPage';

// Generate static paths for all course types and common locations
export function generateStaticParams() {
  const courseTypes = ['btech', 'mba', 'mbbs', 'mtech', 'bsc', 'ba', 'bcom', 'bba', 'bca', 'llb', 'bed', 'bsc-nursing'];
  const locations = ['mumbai-colleges', 'delhi-colleges', 'bangalore-colleges', 'hyderabad-colleges', 'chennai-colleges', 'pune-colleges', 'kolkata-colleges'];

  const params = [];

  // Single segment routes: /btech-colleges
  courseTypes.forEach(courseType => {
    params.push({ slug: [`${courseType}-colleges`] });
  });

  // Two segment routes: /btech/mumbai-colleges
  courseTypes.forEach(courseType => {
    locations.forEach(location => {
      params.push({ slug: [courseType, location] });
    });
  });

  return params;
}

export default async function Page({ params }) {
  const { slug } = await params;

  // Handle undefined slug (shouldn't happen with [[...slug]] but safety check)
  if (!slug || slug.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </main>
    );
  }

  // Single segment: /btech-colleges
  if (slug.length === 1) {
    return <CourseCollegesPage slug={slug[0]} />;
  }

  // Two segments: /btech/mumbai-colleges
  if (slug.length === 2) {
    return <CourseLocationCollegesPage courseType={slug[0]} locationSlug={slug[1]} />;
  }

  // More than 2 segments - show 404
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600">Page not found</p>
      </div>
    </main>
  );
}
