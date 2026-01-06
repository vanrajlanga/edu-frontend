import CollegeDetailClient from '../CollegeDetailClient';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Map URL slugs to tab IDs
const tabMapping = {
  'courses-fees': 'courses',
  'admission': 'admission',
  'cutoff': 'cutoff',
  'placement': 'placements',
  'reviews': 'reviews',
  'department': 'department',
  'ranking': 'rankings',
  'gallery': 'gallery',
  'scholarship': 'scholarships',
  'faculty': 'faculty',
  'news': 'news',
  'hostel': 'hostel',
  'qna': 'qna',
  'compare': 'compare',
  'profile': 'profile',
};

export default async function CollegeDetailPage({ params }) {
  const { slug, tab } = await params;

  // Get the tab from URL or default to 'overview'
  const tabSlug = tab?.[0] || null;
  const activeTab = tabSlug ? (tabMapping[tabSlug] || 'overview') : 'overview';

  return <CollegeDetailClient slug={slug} initialTab={activeTab} />;
}
