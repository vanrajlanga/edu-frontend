# EduPortal - Homepage Planning Document

A modern education portal built with Next.js 16, React 19, and Tailwind CSS 4.

> **Design Philosophy**: Clean, modern, light-themed design with green color scheme. Component-based architecture following atomic design principles.

---

## Current Implementation Status

### Completed Sections ✅

#### Layout Components
1. **Header** - Fixed header with transparent variant
2. **Navbar** - Navigation with dropdowns and search
3. **Footer** - Multi-column links, social icons, scroll-to-top button

#### Hero & Navigation
4. **HeroSection** - Landing hero with search and stats

#### Content Sections
5. **StudyGoalSection** - Horizontal scrollable course category cards
6. **ExploreProgramsSection** - Filter tabs with 6 feature cards (Ranking, Find Colleges, Compare, Exams, Predictor, Course Finder)
7. **TopCollegesSection** - Hierarchical filter tabs with college ranking list
8. **TopUniversitiesSection** - 2-row horizontal scroll grid of university cards
9. **CollegeRankingSection** - Ranking table with agency filter tabs and year dropdown
10. **TopStudyPlacesSection** - City cards with unique Indian landmark SVG icons
11. **ExploreCoursesSection** - Course cards with level filter tabs (Bachelors, Masters, etc.)
12. **BoardExamSection** - CBSE Class XII and X quick links
13. **TopExamsSection** - Exam cards with unique exam icon illustrations
14. **AdmissionLinksSection** - Admission 2025 quick links
15. **LatestNewsSection** - News cards with category filter tabs (Exam, College, Admission)
16. **StudyAbroadSection** - Country cards with landmark illustrations and guides
17. **TopCoursesLinksSection** - Top courses quick links

#### Banners
18. **AdmissionBanner** - CTA banner with green gradient theme
19. **SubscribeBanner** - Simple CTA banner with green theme
20. **CourseFinderBanner** - Two-tone banner with illustration
21. **NewsletterSection** - Subscription form with email, phone, course dropdown

### Pending Sections 📋
- *(Homepage complete - all sections implemented)*

---

## Design System

### Color Palette (Modern Green - Light Mode Only)

```
┌─────────────────────────────────────────────────────────────────┐
│  PRIMARY PALETTE - Modern Green (Nature-Inspired)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Green (Primary)                                                │
│  ├── green-50:  #E8FCCF  (Frosted Mint)                        │
│  ├── green-100: #D4F9A7  (Light Mint)                          │
│  ├── green-200: #C0F680  (Soft Green)                          │
│  ├── green-300: #96E072  (Light Green)                         │
│  ├── green-400: #70D050  (Medium Light Green)                  │
│  ├── green-500: #3DA35D  (Medium Jungle) ← Primary             │
│  ├── green-600: #3E8914  (India Green)                         │
│  ├── green-700: #2E6810  (Forest Green)                        │
│  ├── green-800: #1F4A0C  (Deep Green)                          │
│  └── green-900: #134611  (Black Forest) ← Dark Accent          │
│                                                                 │
│  Slate (Secondary/Neutral)                                      │
│  ├── slate-50:   #F8FAFC  ← Alternate backgrounds               │
│  ├── slate-100:  #F1F5F9                                        │
│  ├── slate-200:  #E2E8F0                                        │
│  ├── slate-300:  #CBD5E1                                        │
│  ├── slate-400:  #94A3B8                                        │
│  ├── slate-500:  #64748B                                        │
│  ├── slate-600:  #475569                                        │
│  ├── slate-700:  #334155                                        │
│  ├── slate-800:  #1E293B                                        │
│  └── slate-900:  #0F172A                                        │
│                                                                 │
│  Gray (Text & Backgrounds)                                      │
│  ├── gray-50:    #F9FAFB                                        │
│  ├── gray-100:   #F3F4F6                                        │
│  ├── gray-200:   #E5E7EB                                        │
│  ├── gray-500:   #6B7280                                        │
│  ├── gray-600:   #4B5563                                        │
│  ├── gray-800:   #1F2937                                        │
│  └── gray-900:   #111827                                        │
│                                                                 │
│  Accent Colors                                                  │
│  ├── amber-400:  #FBBF24  ← Stars, Ratings                      │
│  ├── amber-500:  #F59E0B  ← Highlights                          │
│  ├── emerald-500: #10B981 ← Success, Checkmarks                 │
│  └── green-500:  #3DA35D  ← Primary accents                     │
│                                                                 │
│  Semantic Colors                                                │
│  ├── success:    #10B981 (emerald-500)                          │
│  ├── warning:    #F59E0B (amber-500)                            │
│  ├── error:      #EF4444 (red-500)                              │
│  └── info:       #3DA35D (green-500)                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Light Mode Theme Variables

```css
:root {
  --background: #FFFFFF;
  --foreground: #1F2937;
  --surface: #FFFFFF;
  --surface-alt: #F9FAFB;
  --border: #E5E7EB;
  --border-strong: #D1D5DB;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-muted: #6B7280;
}
```

### Visual Effects

```
┌─────────────────────────────────────────────────────────────────┐
│  SHADOWS                                                        │
├─────────────────────────────────────────────────────────────────┤
│  shadow-sm:   0 1px 2px rgba(15, 23, 42, 0.05)                  │
│  shadow-md:   0 4px 12px rgba(15, 23, 42, 0.08)                 │
│  shadow-lg:   0 8px 24px rgba(15, 23, 42, 0.12)                 │
│  shadow-xl:   0 16px 48px rgba(15, 23, 42, 0.16)                │
│  shadow-blue: 0 4px 14px rgba(59, 130, 246, 0.35)               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  BORDER RADIUS                                                  │
├─────────────────────────────────────────────────────────────────┤
│  radius-sm:   6px    (badges, small elements)                   │
│  radius-md:   12px   (buttons, inputs)                          │
│  radius-lg:   16px   (cards)                                    │
│  radius-xl:   24px   (large cards, modals)                      │
│  radius-full: 9999px (pills, avatars)                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  ANIMATIONS                                                     │
├─────────────────────────────────────────────────────────────────┤
│  ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1)                     │
│  ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1)                │
│  ease-spring:  cubic-bezier(0.175, 0.885, 0.32, 1.275)          │
│  duration-fast:   150ms                                         │
│  duration-normal: 250ms                                         │
│  duration-slow:   400ms                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### File Structure

```
src/
├── components/
│   ├── ui/                    # Primitive UI components
│   │   ├── Button.jsx         ✅
│   │   ├── Input.jsx          ✅
│   │   ├── Badge.jsx          ✅
│   │   ├── Card.jsx           ✅
│   │   ├── Icon.jsx           ✅ (40+ icons including social)
│   │   ├── Avatar.jsx         ✅
│   │   ├── QuickLink.jsx      ✅ (QuickLinkPill, QuickLinkGroup)
│   │   └── index.js           ✅
│   │
│   ├── layout/                # Layout components
│   │   ├── Header.jsx         ✅
│   │   ├── Navbar.jsx         ✅
│   │   ├── Footer.jsx         ✅ (multi-column, social icons)
│   │   ├── Container.jsx      ✅
│   │   ├── Section.jsx        ✅
│   │   └── index.js           ✅
│   │
│   ├── cards/                 # Card variants
│   │   ├── StudyGoalCard.jsx      ✅
│   │   ├── ProgramCard.jsx        ✅ (6 variants)
│   │   ├── TopCollegeCard.jsx     ✅ (homepage college card)
│   │   ├── CollegeListItem.jsx    ✅ (listing page table view format)
│   │   ├── GridCollegeCard.jsx    ✅ (listing page grid view card)
│   │   ├── ListCollegeCard.jsx    ✅ (listing page list view horizontal card)
│   │   ├── TopUniversityCard.jsx  ✅
│   │   ├── RankingTableRow.jsx    ✅ (table row + header)
│   │   ├── CityCard.jsx           ✅ (10 landmark icons)
│   │   ├── CourseCard.jsx         ✅
│   │   ├── ExamCard.jsx           ✅ (7 exam icons, default & detailed variants)
│   │   ├── NewsCard.jsx           ✅ (category colors)
│   │   ├── StudyAbroadCard.jsx    ✅ (10 country landmarks)
│   │   ├── CourseLevelCard.jsx    ✅ (course level cards with image overlay)
│   │   ├── CourseInterestCard.jsx ✅ (interest-based course category cards)
│   │   ├── ExamNewsCard.jsx       ✅ (exam news item card)
│   │   └── index.js               ✅
│   │
│   ├── sections/              # Homepage & page sections
│   │   ├── HeroSection.jsx            ✅
│   │   ├── StudyGoalSection.jsx       ✅
│   │   ├── ExploreProgramsSection.jsx ✅
│   │   ├── TopCollegesSection.jsx     ✅
│   │   ├── TopUniversitiesSection.jsx ✅
│   │   ├── AdmissionBanner.jsx        ✅ (green theme)
│   │   ├── CollegeRankingSection.jsx  ✅
│   │   ├── SubscribeBanner.jsx        ✅ (green theme)
│   │   ├── TopStudyPlacesSection.jsx  ✅
│   │   ├── ExploreCoursesSection.jsx  ✅
│   │   ├── CourseFinderBanner.jsx     ✅
│   │   ├── BoardExamSection.jsx       ✅
│   │   ├── TopExamsSection.jsx        ✅
│   │   ├── AdmissionLinksSection.jsx  ✅
│   │   ├── LatestNewsSection.jsx      ✅
│   │   ├── StudyAbroadSection.jsx     ✅
│   │   ├── TopCoursesLinksSection.jsx ✅
│   │   ├── NewsletterSection.jsx      ✅
│   │   ├── CollegeListingHeader.jsx   ✅ (breadcrumb + banners)
│   │   ├── CollegeFilterSection.jsx   ✅ (filter bar + modal)
│   │   ├── CollegeResultsSection.jsx  ✅ (results with view mode switching)
│   │   ├── GridViewSection.jsx        ✅ (3-column grid layout with sidebar)
│   │   ├── ListViewSection.jsx        ✅ (horizontal cards with sidebar)
│   │   ├── CourseHeroSection.jsx      ✅ (courses page hero with search)
│   │   ├── CourseLevelSection.jsx     ✅ (choose by level - 10th/12th/Diploma)
│   │   ├── CourseInterestSection.jsx  ✅ (choose by interest - 9 interest cards)
│   │   ├── TrendingCourseSection.jsx  ✅ (trending course search pills)
│   │   ├── ExamHeroSection.jsx           ✅ (exams page hero with search)
│   │   ├── ExamCategorySection.jsx       ✅ (exam categories with filter pills and View All link)
│   │   ├── ExamNewsSection.jsx           ✅ (exam news list with widgets)
│   │   ├── ConceptArticlesSection.jsx    ✅ (subject filters with Class 10/12 article carousels)
│   │   ├── PreviousYearPapersSection.jsx ✅ (dynamic exam filters with paper carousels)
│   │   ├── FAQSection.jsx                ✅ (reusable FAQ accordion section)
│   │   └── index.js                      ✅
│   │
│   └── common/                # Shared compound components
│       ├── SearchBar.jsx            ✅
│       ├── Logo.jsx                 ✅
│       ├── ProgramFilterTabs.jsx    ✅
│       ├── CollegeFilterTabs.jsx    ✅
│       ├── AgencyFilterTabs.jsx     ✅
│       ├── AlertBanner.jsx          ✅
│       ├── GoalSelector.jsx         ✅
│       ├── ExploreDropdown.jsx      ✅
│       ├── NotificationDropdown.jsx ✅
│       ├── Breadcrumb.jsx           ✅ (navigation breadcrumb)
│       ├── PromoBanner.jsx          ✅ (image-based banners)
│       ├── FilterBar.jsx            ✅ (multi-dropdown filters)
│       ├── FilterDropdown.jsx       ✅ (reusable dropdown)
│       ├── FilterModal.jsx          ✅ (mobile filters)
│       ├── CompareModal.jsx         ✅ (compare colleges)
│       ├── ApplyModal.jsx           ✅ (registration form)
│       ├── CompareFeesModal.jsx     ✅ (fee comparison)
│       ├── ComparePlacementModal.jsx ✅ (placement stats)
│       ├── ReviewsModal.jsx         ✅ (user reviews)
│       ├── RankingsModal.jsx        ✅ (college rankings)
│       ├── FilterSidebar.jsx        ✅ (left sidebar filters for grid/list views)
│       ├── StreamDegreeFilters.jsx  ✅ (stream/degree filter chips)
│       ├── FeaturedCollegeCarousel.jsx ✅ (featured colleges carousel)
│       ├── ApplicationFormsSection.jsx ✅ (application forms grid)
│       ├── AdvertisementBanner.jsx  ✅ (ad placeholder banner)
│       └── index.js                 ✅
│
├── lib/
│   ├── cn.js                  ✅ (className merger)
│   └── formatters.js          ✅ (number/date formatters)
│
└── app/
    ├── layout.js                        ✅
    ├── page.js                          ✅ (21 sections)
    ├── globals.css                      ✅
    ├── universities-colleges/
    │   └── page.js                      ✅ (college listing page)
    ├── colleges/
    │   └── [slug]/
    │       ├── [[...tab]]/
    │       │   └── page.js              ✅ (college detail page)
    │       └── CollegeDetailClient.js   ✅ (client component)
    ├── courses/
    │   └── page.js                      ✅ (courses listing page)
    ├── exams/
    │   └── page.js                      ✅ (exams listing page)
    └── api/
        └── v1/
            └── colleges/
                └── [slug]/
                    └── route.js         ✅ (mock API)

public/
└── assets/
    └── images/
        ├── default-write-review-1.svg       ✅ (banner 384×100)
        ├── default-college-predictor-2.svg  ✅ (banner 384×100)
        └── default-course-finder-2.svg      ✅ (banner 384×100)
```

---

## Homepage Section Order

```
1.  Header (fixed)
2.  Navbar (fixed below header)
3.  HeroSection
4.  StudyGoalSection
5.  ExploreProgramsSection
6.  TopCollegesSection
7.  TopUniversitiesSection
8.  AdmissionBanner
9.  CollegeRankingSection
10. SubscribeBanner
11. TopStudyPlacesSection
12. ExploreCoursesSection
13. CourseFinderBanner
14. BoardExamSection
15. TopExamsSection
16. AdmissionLinksSection
17. LatestNewsSection
18. StudyAbroadSection
19. TopCoursesLinksSection
20. NewsletterSection
21. Footer
```

---

## Custom SVG Illustrations

### City Landmarks (CityCard)
- Delhi: India Gate
- Mumbai: Gateway of India
- Bangalore: Vidhana Soudha
- Chennai: Marina Lighthouse
- Hyderabad: Charminar
- Kolkata: Victoria Memorial
- Pune: Shaniwar Wada
- Jaipur: Hawa Mahal
- Ahmedabad: Sabarmati Ashram
- Lucknow: Bara Imambara

### Exam Icons (ExamCard)
- CUET, NEET, JEE, GATE, CAT, UPSC (unique icon per exam)

### Country Landmarks (StudyAbroadCard)
- USA: Statue of Liberty
- UK: Big Ben
- Canada: CN Tower
- Australia: Sydney Opera House
- Germany: Brandenburg Gate
- France: Eiffel Tower
- Ireland: Dublin Castle
- New Zealand: Sky Tower
- Singapore: Marina Bay Sands
- Dubai: Burj Khalifa

---

## Reusable Patterns

### Horizontal Carousel Pattern
Used in: StudyGoalSection, TopUniversitiesSection, TopStudyPlacesSection, ExploreCoursesSection, TopExamsSection, LatestNewsSection, StudyAbroadSection

```jsx
// Standard carousel with scroll detection
const scrollContainerRef = useRef(null);
const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);

// checkScrollPosition, scroll functions...
```

### Quick Links Pattern
Used in: BoardExamSection, AdmissionLinksSection, TopCoursesLinksSection

```jsx
<QuickLinkGroup
  title="Section Title"
  links={[{ label: 'Link', href: '/path' }, ...]}
/>
```

### Filter Tabs Pattern
Used in: ExploreProgramsSection, TopCollegesSection, CollegeRankingSection, ExploreCoursesSection, LatestNewsSection

```jsx
const [activeTab, setActiveTab] = useState('default');
// Pill-shaped buttons with active state
```

---

## Mobile Considerations

1. **Header**: Hamburger menu with slide-out drawer
2. **Cards**: Stack vertically, swipeable carousels
3. **Filter Tabs**: Horizontal scroll with scroll indicators
4. **College List**: Condensed mobile layout with expandable details
5. **2-Row Grid**: Changes to single-row carousel on mobile
6. **Footer**: Stacked columns, simplified layout

---

## Additional Pages

### Universities & Colleges Listing Page ✅
**Route**: `/universities-colleges`

#### Page Sections
1. **CollegeListingHeader** - Breadcrumb, page title, promo banners (SVG images)
2. **CollegeFilterSection** - Advanced filters with modal support (only visible in table view)
3. **CollegeResultsSection** - Intelligent view mode switcher with sorting

#### Three View Modes

##### 1. **Table View (Card Mode)** - Default View
- **Component**: Uses `CollegeListItem.jsx` directly in `CollegeResultsSection.jsx`
- **Layout**: Traditional table format with sortable columns
- **Features**:
  - 6-column grid: Rank, College Info, Fees, Placement, Reviews, Rankings
  - Green gradient table header
  - Inline actions (Apply, Download, Compare)
  - CD Score and Placement Score badges
  - Expandable rankings display
  - FilterBar visible at top
  - Pagination with "Load More" button
- **Filters**: Full FilterBar shown at top of page

##### 2. **Grid View** - 3-Column Card Layout
- **Component**: `GridViewSection.jsx` (uses `GridCollegeCard.jsx`)
- **Layout**: Two-column layout with left sidebar
  - **Left**: 320px FilterSidebar (sticky, full height)
  - **Right**: Main content area with 3-column grid
- **Card Features** (`GridCollegeCard.jsx`):
  - Vertical card design (portrait orientation)
  - College image at top (256×176px)
  - Logo overlay (bottom-left)
  - Collegedunia Rating badge (top-right)
  - Media count badges (image/camera icons)
  - Course fees and user rating display
  - Action buttons (Apply Now, Brochure, Compare)
  - Rankings section at bottom
  - Green theme throughout (#3DA35D)
- **Top Bar**: StreamDegreeFilters + Sort options + View mode switcher
- **Promotional Content**: Inserted every 6 cards
  - FeaturedCollegeCarousel (after 6, 24, 42...)
  - ApplicationFormsSection (after 12, 30, 48...)
  - AdvertisementBanner (after 18, 36, 54...)
- **Filters**: FilterSidebar on left (sticky)

##### 3. **List View** - Horizontal Card Layout
- **Component**: `ListViewSection.jsx` (uses `ListCollegeCard.jsx`)
- **Layout**: Two-column layout with left sidebar
  - **Left**: 320px FilterSidebar (sticky, full height)
  - **Right**: Main content area with vertical stack
- **Card Features** (`ListCollegeCard.jsx`):
  - Horizontal card design (landscape orientation)
  - **Size**: Compact - 256×176px image (w-64 h-44)
  - **Three-column layout**:
    1. **Left**: College image (256×176px) with:
       - Media count badges (top-left)
       - Collegedunia Rating (top-right, 10.0/10)
       - College logo (bottom-left, 48×48px)
    2. **Middle**: College information:
       - Name and location (green on hover)
       - Course fees (₹, text-xl, green)
       - User rating (x.x/5, green)
       - Action chips (Admission 2026, Reviews, Courses & Fees)
       - **Rankings section**: Horizontal scroll with static award badge
         - Award icon badge (fixed outside scroll)
         - Scrollable rankings (#rank out of total, agency)
         - Hidden scrollbar using Tailwind arbitrary variants
    3. **Right**: Action buttons column (192px, w-48):
       - Apply Now (green bg)
       - Brochure (bordered)
       - Compare (bordered, toggles to green when active)
       - **Rating at bottom**: Pushed with mt-auto
         - Format: "4.4/5 (402 Users)"
         - Dropdown arrow for expandable review
  - **Expandable Review Section**:
    - Full-width section below main card
    - Two-column layout:
      - Left: Avatar + name (180px width)
      - Right: Review text with "Read More" button
    - Background: gray-50
    - Toggles with chevron up/down icon
- **Top Bar**: StreamDegreeFilters + Sort options + View mode switcher
- **Promotional Content**: Same as Grid View (every 6 cards)
- **Filters**: FilterSidebar on left (sticky)

#### Components Created

**Sections** (`src/components/sections/`)
- `CollegeListingHeader.jsx` ✅ - Header with breadcrumb and image banners
- `CollegeFilterSection.jsx` ✅ - Filter bar with dropdowns and modal (table view only)
- `CollegeResultsSection.jsx` ✅ - View mode switcher and table view
- `GridViewSection.jsx` ✅ - 3-column grid layout with sidebar filters
- `ListViewSection.jsx` ✅ - Horizontal card list with sidebar filters

**Cards** (`src/components/cards/`)
- `TopCollegeCard.jsx` ✅ - Homepage college card (homepage only)
- `CollegeListItem.jsx` ✅ - Table row format (table view)
- `GridCollegeCard.jsx` ✅ - Vertical card (grid view, 3-column layout)
- `ListCollegeCard.jsx` ✅ - Horizontal card (list view, compact design)

**Common Components** (`src/components/common/`)
- `Breadcrumb.jsx` ✅ - Navigation breadcrumb trail
- `PromoBanner.jsx` ✅ - Image-based banner (4:1 aspect ratio, 100px height)
- `FilterBar.jsx` ✅ - Multi-dropdown filter interface (table view)
- `FilterSidebar.jsx` ✅ - Left sidebar filters (grid/list views)
- `StreamDegreeFilters.jsx` ✅ - Stream/degree filter chips (grid/list views)
- `FilterDropdown.jsx` ✅ - Reusable filter dropdown
- `FilterModal.jsx` ✅ - Mobile-friendly filter modal
- `FeaturedCollegeCarousel.jsx` ✅ - Featured colleges carousel (grid/list promotional)
- `ApplicationFormsSection.jsx` ✅ - Application forms grid (grid/list promotional)
- `AdvertisementBanner.jsx` ✅ - Ad placeholder banner (grid/list promotional)

**Modals** (`src/components/common/`)
- `CompareModal.jsx` ✅ - Compare up to 4 colleges side-by-side
- `ApplyModal.jsx` ✅ - Two-column registration form
- `CompareFeesModal.jsx` ✅ - Fee comparison table
- `ComparePlacementModal.jsx` ✅ - Placement statistics comparison
- `ReviewsModal.jsx` ✅ - Category-wise user reviews (6 categories)
- `RankingsModal.jsx` ✅ - Complete college rankings by agency

#### Design Specifications

**Color Theme** - Green Palette (All Views)
- Primary: `green-500` (#3DA35D)
- Hover: `green-600` (#3E8914)
- Backgrounds: `green-50`, `green-100`
- Ratings: `green-600` (bold)
- Action buttons: `green-500` background with white text
- ❌ **NEVER** use `orange-*` or `blue-*` colors (except CSS variables that map to green)

**Banner Specifications**
- Dimensions: 400 × 100 px (4:1 aspect ratio)
- Images:
  - `default-write-review-1.svg`
  - `default-college-predictor-2.svg`
  - `default-course-finder-2.svg`

**Card Sizing**
- **Table View**: Full-width rows, responsive columns
- **Grid View**: 3 columns, card height ~400px, 4:3 image aspect
- **List View**: Full-width horizontal cards, compact:
  - Image: 256×176px (w-64 h-44)
  - Logo: 48×48px (w-12 h-12)
  - Button column: 192px (w-48)
  - All padding: p-3, gap-3
  - Fonts: text-xs to text-xl (compact)

**Interactive Features**
- Sort by: Popularity, Rating, Highest Fees, Lowest Fees
- View mode buttons: Card (table icon), Grid (grid icon), List (horizontal bars icon)
- Add to compare (max 4 colleges)
- Action buttons: Apply Now, Download Brochure, Compare
- Expandable sections: Rankings (table view), Reviews (list view)
- Horizontal scrolling: Rankings in list view (hidden scrollbar)
- Load More pagination: 18 colleges per batch

**Layout Patterns**
- **Table View**: Traditional full-width layout with FilterBar at top
- **Grid/List Views**: Two-column with 320px sticky sidebar
- **Promotional insertion**: Every 6 colleges (carousel at 6, forms at 12, ads at 18)

---

### Courses Listing Page ✅
**Route**: `/courses`

**Page Structure**: Header → Navbar/NewsTicker → Hero → Course Levels → Interest Categories → Trending Pills → Newsletter → Footer

#### Implemented Sections

##### 1. **CourseHeroSection** ✅ - Hero Banner with Search
- **Component**: `CourseHeroSection.jsx`
- **Layout**: Full-width gradient background (slate-700 to slate-600)
- **Features**:
  - Large heading: "SEARCH FROM OVER 10000 COURSES IN INDIA"
  - Prominent search bar with:
    - Search icon (left)
    - Input placeholder: "Search Course for Ex. MCA, BA Finance or B.Tech Courses"
    - Arrow button (right, dark bg with green hover)
  - Quick course links below search:
    - BE/B.TECH COURSES | MBBS COURSES | B.SC COURSES | B.COM COURSES | BA COURSES | MBA/PGDM COURSES
    - Links separated by pipe (|) characters
    - White text with green-400 hover
- **Responsive**: Single column on mobile, search bar scales down
- **Theme**: Dark background with white text, green accent on hover

##### 2. **CourseLevelSection** ✅ - Choose by Education Level
- **Component**: `CourseLevelSection.jsx` (uses `CourseLevelCard.jsx`)
- **Layout**: White background with centered content
- **Features**:
  - Section header:
    - Heading: "DON'T KNOW WHAT TO CHOOSE ? CHOOSE BY YOUR LEVEL" (blue-600)
    - Subtext: Descriptive paragraph about the platform
  - **Six education level cards**:
    - **After 10th Courses**: 6 categories (ITI, Arts, Dental, Animation, Hotel Management, Vocational)
    - **After 10+2 Courses**: 9 categories (Engineering, Arts, Science, Management, Commerce, Education, Medical, Paramedical, Design)
    - **Diploma Courses**: 9 categories (Management, Arts, Medical, Engineering, Law, Paramedical, Science, Hotel Management, Design)
    - **Certification Courses**: 9 categories (Arts, Commerce, Management, Science, Design, Computer Applications, Education, Law, Agriculture)
    - **Masters Degree/Post Graduation**: 9 categories (Management, Engineering, Medical, Science, Arts, Law, Commerce, Dental, Pharmacy)
    - **Ph.D Research Courses**: 9 categories (Science, Arts, Medical, Engineering, Management, Pharmacy, Commerce, Agriculture, Law)
  - Each card (`CourseLevelCard`):
    - **Image area** (224px height) with:
      - Background image (optional) or gradient placeholder
      - Dark overlay gradient (from-black/80 via-black/50 to-black/30)
      - White text overlay centered (title + subtitle)
      - Hover effect: image scales 110%
    - **Category badges section** (white bg, p-4):
      - Compact pill-shaped badges with inline count and category
      - White background with gray-300 border
      - Green-600 count text, gray-600 category text
      - Green hover effect (border-green-500, text-green-700, bg-green-50)
      - Format: "[count] [name]" in single badge
- **Card Gradients** (when no image):
  - After 10th: slate-600 to slate-800
  - After 10+2: slate-700 to slate-900
  - Diploma: amber-700 to slate-800
  - Certification: yellow-600 to slate-700
  - Masters: slate-600 to slate-800
  - Ph.D: slate-700 to slate-900
- **Responsive**: 3 columns on desktop, 2 on tablet, 1 on mobile

##### 3. **CourseInterestSection** ✅ - Choose by Interest
- **Component**: `CourseInterestSection.jsx` (uses `CourseInterestCard.jsx`)
- **Layout**: White background with centered content
- **Features**:
  - Section header:
    - Heading: "CHOOSE BY INTEREST" (blue-600, text-3xl to text-4xl)
    - Subtext: Platform description paragraph
  - **Nine interest category cards**:
    1. **Engineering**: BE/B.Tech, ME/M.Tech, Polytechnic
    2. **Medical**: BAMS, B.Sc (Medicine), BHMS, Bachelor of Physiotherapy(BPT)
    3. **Science**: M.Sc, B.Sc, B.F.Sc, M.F.Sc
    4. **Commerce**: M.Com, B.Com
    5. **Management**: BBA/BMS, MBA/PGDM, BHM (Hospital), Executive MBA
    6. **Arts**: BA, BFA, BSW, MA
    7. **Computer Applications**: BCA, MCA
    8. **Education**: B.Ed, B.P.Ed, M.Ed, M.P.Ed
    9. **Law**: LLB, LLM, BA/BBA LLB
  - Each card (`CourseInterestCard`):
    - **White card** with gray-200 border, green-300 hover border
    - **Icon section**: Large icon (w-10 h-10) with green-600 color
    - **Title**: text-xl font-bold, gray-800
    - **Courses list**: Pipe-separated course names with hover effects
    - **Explore link**: "Explore all courses" with arrow icon, green-600 color
    - **Hover effects**: Shadow lift, gap expansion on arrow
  - **Show more button**:
    - Initially shows 6 cards, button expands to 9
    - Gray border with green hover effect
- **Responsive**: 3 columns on lg, 2 on md, 1 on mobile

##### 4. **TrendingCourseSection** ✅ - Trending Course Search
- **Component**: `TrendingCourseSection.jsx`
- **Layout**: Light gray background (gray-50) with top border
- **Features**:
  - Section header:
    - Heading: "#TRENDING COURSE SEARCH" (gray-400, text-2xl to text-3xl)
  - **Trending course pills**:
    - 12 course links: BE/B.TECH, MBBS, B.SC, B.COM, BA, MBA/PGDM, BCA, M.Tech, BBA, M.Sc, B.Ed, LLB
    - Pill design:
      - White background with gray-300 border
      - Rounded-full shape
      - text-sm font-medium, gray-700 text
      - Hover: border-green-500, text-green-700, bg-green-50
      - Shadow-sm with shadow-md on hover
    - Responsive flex wrapping with centered alignment
- **Responsive**: Flexible wrapping, maintains pill shape on all screens

##### 5. **NewsletterSection** ✅ - Newsletter Subscription
- **Component**: `NewsletterSection.jsx` (reused from homepage)
- **Layout**: Full-width green gradient background (from-green-900 via-green-700 to-green-600)
- **Features**:
  - Section header:
    - Bell icon in circular badge
    - Heading: "Subscribe To Our Newsletter" (white text)
    - Subtext: "Get College Notifications, Exam Notifications and News Updates"
  - **Subscription form** (white card with backdrop blur):
    - Email input with icon
    - Phone input with icon
    - Course dropdown with 10 options
    - Submit button with loading state
    - Privacy text with shield icon
  - **Trust badges**:
    - 100K+ Subscribers
    - Daily Updates
    - Exam Alerts
    - Admission Updates
- **Responsive**: 3-column grid on desktop, stacks on mobile

#### Pending Sections 📋

**Content Sections (To be implemented):**
- **Popular Courses** - Trending and most sought-after courses
- **Course by Stream** - Engineering, Medical, Arts, Commerce, etc.
- **Top Rated Courses** - Highest rated courses by students
- **Professional Courses** - MBA, CA, CS, CMA, and more
- **Online Courses** - Distance learning and online programs
- **Course Comparison** - Compare multiple courses side-by-side
- **Course Detail View** - Eligibility, fees, duration, syllabus

#### Components Created

**Sections** (`src/components/sections/`)
- `CourseHeroSection.jsx` ✅ - Hero with search bar and quick links
- `CourseLevelSection.jsx` ✅ - Six education level cards with image overlays
- `CourseInterestSection.jsx` ✅ - Nine interest category cards with show more button
- `TrendingCourseSection.jsx` ✅ - Trending course search pills

**Cards** (`src/components/cards/`)
- `CourseLevelCard.jsx` ✅ - Individual course level card with image overlay, dark gradient, and green badges
- `CourseInterestCard.jsx` ✅ - Interest category card with icon, courses list, and explore link

#### Design Specifications

**Color Theme** - Modern Green Palette
- Hero background: Light green gradient (`from-green-50 via-white to-white`)
- Search bar: White with green focus ring and green button
- Quick links: White pills with gray border, green hover
- Section headings: `blue-600` (Choose by Level/Interest), `gray-400` (Trending)
- Badge backgrounds: White with `gray-300` border, `green-600` text
- Badge hover: `border-green-500`, `text-green-700`, `bg-green-50`
- Card borders: `gray-200` with `green-300` hover
- Icons: `green-600` color
- Links: `green-600` with hover transitions
- Card gradients: Custom per education level

**Hero Section Sizing**
- Heading: text-3xl to text-5xl (responsive)
- Search bar: py-5, max-width 4xl
- Search icon: w-6 h-6
- Button: px-8 py-5
- Quick links: text-xs to text-sm

**Card Specifications**
- Card height: 264px (image overlay area)
- Card shadow: md with xl on hover
- Badge padding: px-3 py-1.5
- Badge text: text-xs font-medium
- Card padding: p-6 (badge area)

**Interactive Features**
- Course search functionality
- Quick link navigation to specific course types
- Category badge clicks (to be implemented)
- Hover states on all interactive elements
- Card hover effects (shadow transition)

**Layout Patterns**
- Hero: Full-width with centered content container
- Cards: 3-column grid (responsive to 2 and 1 column)
- Badges: Flexible wrapping with gap-2

#### Technical Implementation

**Search Functionality**:
```js
- State management for search query
- Form submission handler
- Console logging (to be replaced with actual search/navigation)
```

**Quick Links**: Array of course types with href paths

**Course Categories**: Structured data with count and name for each badge

**SEO Metadata**: Title, description, and keywords for course discovery

---

### Exams Listing Page ✅
**Route**: `/exams`

**Page Structure**: Header → Navbar/NewsTicker → Hero → Two-Column Layout (Category + News/Widgets) → Newsletter → Footer

#### Page Layout Structure

**Two-Column Layout (12-column grid):**
- **Left Column (66% - 8/12 columns)**: Exam category, concept articles, previous year papers, FAQ
- **Right Column (33% - 4/12 columns)**: Exam news, newsletter widget, upcoming exams, syllabus widgets

#### Implemented Sections

##### 1. **ExamHeroSection** ✅ - Hero Banner with Search
- **Component**: `ExamHeroSection.jsx`
- **Layout**: Two-column layout (content left, illustration right)
- **Features**:
  - **Left Column**:
    - Heading: "Entrance Exams" (gray-900) + "In India" (green-600)
    - Subtext: Platform description
    - **Search bar**:
      - White rounded-2xl card with shadow
      - Search icon (left)
      - Input placeholder: "Search Entrance Exams"
      - Green search button with arrow (right)
      - Hover and focus states with green accents
    - **Popular Exams section**:
      - Label: "POPULAR EXAMS:" (uppercase, gray-500)
      - 10 exam pills: JEE MAIN, NEET, CAT, GATE, CLAT, JEE ADVANCED, COMEDK UGET, AP EAPCET, WBJEE, KCET
      - Pill design: Blue theme (blue-50 bg, blue-600 text, blue-200 border)
      - Hover: blue-100 bg, blue-300 border, blue-700 text
  - **Right Column**:
    - Student studying illustration (exam.svg)
    - 600×450px image
    - Hidden on mobile, visible on lg screens
  - **Background**:
    - Gradient: from-green-50 via-white to-blue-50
    - Decorative blur circles (green-200, blue-200)
- **Responsive**: Two columns on lg, single column on mobile
- **Theme**: Green and blue color palette

##### 2. **ExamCategorySection** ✅ - Exam Categories with Cards (Left Column)
- **Component**: `ExamCategorySection.jsx` (uses `ExamCard.jsx` with detailed variant)
- **Layout**: White background section
- **Features**:
  - **Section header**: "Exams Category" heading
  - **Category filter pills**:
    - 24 total categories: Engineering (default active), Medical, Management, Science, Law, Pharmacy, Computer Applications, Arts, Education, Design, Architecture, Commerce, Paramedical, Dental, Class 12 Exams, Agriculture, Class 10 Exams, Hotel Management, Veterinary Sciences, Vocational Courses, Study Abroad Exams, Mass Communications, Aviation, Animation
    - Initially shows 7 categories, "View More" button expands to all 24
    - Active state: Green gradient background (from-green-600 to-emerald-600)
    - Inactive state: White background with gray border
    - Hover: Green border and background
  - **Exam cards grid** (2 columns on md):
    - Shows first 6 exams initially
    - Uses `ExamCard` component with `variant="detailed"` and `showApplyButton={true}`
    - **8 total exams**: CUET 2025, JEE Advanced 2026, NEET 2026, CAT 2026, GATE 2026, UPSC CSE 2026, JEE Main 2026, CLAT 2026
    - Each card shows:
      - **Header**: Exam icon (SVG, 12×12px), exam name, full name (line-clamp-1), exam type badge (Online/Offline)
      - **Details section** (gray-50 bg, compact p-2.5):
        - Exam Date (text-xs)
        - Application Form (text-xs)
        - Result Announce (text-xs)
      - **Quick links** (text-xs): Application Process, Exam Pattern, Previous Year Paper (with chevron icons)
      - **Apply Now button**: Green gradient, full width, py-2
  - **View All Button**:
    - Text link with chevron: "View All {activeCategory} Exams"
    - Green text (green-600) with hover (green-700)
    - Dynamic category name based on active filter
- **Responsive**: 2 columns on md, 1 column on mobile
- **Icons**: Uses existing exam icon system (CUET, JEE, NEET, GATE, CAT, UPSC)
- **Compact design**: p-4, text-xs to text-base, tight spacing for 2-column layout

##### 3. **ExamNewsSection** ✅ - Latest Exam News with Widgets (Right Column)
- **Component**: `ExamNewsSection.jsx` (uses `ExamNewsCard.jsx`)
- **Layout**: Vertical stack with space-y-5
- **Features**:
  - **Section header**: "Exams News" heading (text-xl)
  - **News list**:
    - First 6 news items displayed (out of 10 total)
    - Compact cards (p-2.5, gap-2.5):
      - Thumbnail (48×48px rounded-md, green/blue gradient placeholder, document icon)
      - Title (text-xs, 2-line clamp, clickable)
      - Date with calendar icon (text-xs)
      - Chevron icon on hover
    - Card hover: Green-50 background, green-200 border
    - Space between cards: space-y-2
  - **View All News button**: White with green border, py-2, hover inverts colors
  - **Newsletter Widget**: Orange-to-amber gradient background, compact design
  - **Upcoming Exams Widget**: Shows 5 upcoming exams with dates and icons
  - **Exams Syllabus Widget**: Shows 3 exams (CAT, JEE Main, GATE) with quick links
- **Responsive**: Single column layout, stacks vertically

##### 4. **ConceptArticlesSection** ✅ - Concept Articles Carousel (Left Column)
- **Component**: `ConceptArticlesSection.jsx` (uses `ArticleCard.jsx`)
- **Layout**: Gray-50 background section with rounded corners
- **Features**:
  - **Section header**: "Concept Articles" heading
  - **Subject filter pills**:
    - 4 subjects: Mathematics (default), Physics, Biology, Chemistry
    - Active state: White bg, green border and text
    - Inactive state: Gray-100 bg
  - **Two subsections with horizontal scrollable carousels**:
    - **Top Class 10 Concept Articles** (6 articles)
    - **Top Class 12 Concept Articles** (6 articles)
  - **Article cards** (`ArticleCard.jsx`):
    - Width: 210px (shows 4 cards per row)
    - Colorful gradient backgrounds: blue, green, sky, amber, purple, rose (rotates)
    - Document illustration with layered papers effect
    - Title with 2-line clamp (text-sm)
    - "Read More" link with chevron icon
    - Hover: Green border, shadow, arrow slides right
  - **Carousel navigation**:
    - Right arrow always visible
    - Left arrow conditionally shown (after scrolling >10px)
    - Circular floating buttons with shadow
    - Smooth scroll behavior
- **Responsive**: Horizontal scroll on all screen sizes

##### 5. **PreviousYearPapersSection** ✅ - Previous Year Papers (Left Column)
- **Component**: `PreviousYearPapersSection.jsx` (uses `PreviousYearPaperCard.jsx`)
- **Layout**: White background section with rounded corners
- **Features**:
  - **Dynamic section header**: "Top {examName} Previous Year Paper"
    - Changes based on selected exam filter
  - **Exam filter pills**:
    - 6 exams: JEE Main (default), NEET, CAT, GATE, JEE Advanced, CUET
    - Active state: White bg, green border and text
    - Inactive state: Gray-100 bg
  - **Paper cards** (`PreviousYearPaperCard.jsx`):
    - Width: 240px
    - Orange-to-amber gradient background (from-orange-50 to-amber-50)
    - Exam icon at top (20×20px)
    - Paper title with 3-line clamp (text-sm, centered)
    - Hover: Green border, shadow-md
  - **Papers data**:
    - 6 papers per exam (36 total papers across all exams)
    - JEE Main, NEET, CAT, GATE, JEE Advanced, CUET specific papers
  - **Carousel navigation**:
    - Right arrow always visible
    - Left arrow conditionally shown
    - Resets scroll position when changing exams
- **Responsive**: Horizontal scroll carousel

##### 6. **FAQSection** ✅ - Frequently Asked Questions (Left Column)
- **Component**: `FAQSection.jsx` (uses `FAQItem.jsx`)
- **Layout**: White background section with rounded corners
- **Features**:
  - **Section header**: "Frequently Asked Questions" (customizable via props)
  - **FAQ accordion items** (`FAQItem.jsx`):
    - Question with "Ques." prefix
    - Author and date: "Top Answer By [Name] on [Date]"
    - Plus icon (rotates 45° to X when expanded)
    - Click to expand/collapse
    - Expandable answer section:
      - Green-50 background
      - Green-600 left border (4px)
      - Smooth fadeIn animation
      - Text with line breaks support
    - Hover: Gray-50 bg, green text
  - **Default FAQs**: 5 exam-related questions (CUET, Sastra, BITSAT, HNBGU, VIPS)
  - **Reusable props**:
    - `title` - Custom heading
    - `faqs` - Array of FAQ objects
    - `className` - Additional classes
- **Responsive**: Single column, full width of left column

##### 7. **NewsletterWidget** ✅ - Compact Newsletter (Right Column Widget)
- **Component**: `NewsletterWidget.jsx`
- **Layout**: Compact widget with gradient background
- **Features**:
  - Gradient background (from-green-50 to-emerald-50)
  - Email illustration (12×12px) with checkmark badge
  - Heading: "Subscribe to our Newsletter" (text-base)
  - Description (text-xs): Shortened text
  - "Subscribe Now" button (px-4 py-2, text-xs)
  - Trust indicators: "100K+ Subscribers", "No Spam"
  - Border: green-100, rounded-lg
- **Size**: Compact - p-4, reduced spacing throughout

##### 8. **UpcomingExamsWidget** ✅ - Upcoming Exams List (Right Column Widget)
- **Component**: `UpcomingExamsWidget.jsx`
- **Layout**: White card with border
- **Features**:
  - Header: "Upcoming Exams" with border-bottom
  - 5 upcoming exams:
    - CUET (11 May 26)
    - JEE Main (22 Jan 26)
    - JEE Advanced (17 May 26)
    - CBSE Class X (17 Feb 26)
    - TS EAMCET (29 Apr 26)
  - Each exam shows:
    - Date with calendar icon
    - Exam icon (12×12px circular)
    - Exam name with mode (Online/Offline)
    - Hover: Green text
  - Space between items: space-y-4

##### 9. **ExamsSyllabusWidget** ✅ - Exams Syllabus with Links (Right Column Widget)
- **Component**: `ExamsSyllabusWidget.jsx`
- **Layout**: White card with border
- **Features**:
  - Header: "Exams 2026 Syllabus" with border-bottom
  - 3 exams: CAT, JEE Main, GATE
  - Each exam shows:
    - Exam icon (12×12px)
    - Exam name and mode
    - Quick links section:
      - Exam Pattern
      - Paper Analysis
      - Virtual Calculator
      - Syllabus / CS Syllabus
    - Links with chevron icons
    - Hover: Green-50 bg
  - Border separators between exams

##### 10. **NewsletterSection** ✅ - Full-Width Newsletter (Bottom)
- **Component**: `NewsletterSection.jsx` (reused from homepage)
- **Layout**: Full-width green gradient background
- **Features**:
  - Green gradient (from-green-900 via-green-700 to-green-600)
  - Bell icon in circular badge
  - Heading: "Subscribe To Our Newsletter"
  - Subscription form with email, phone, course dropdown
  - Trust badges: 100K+ Subscribers, Daily Updates, Exam Alerts, Admission Updates
- **Position**: After two-column layout, before footer

#### Components Created

**Sections** (`src/components/sections/`)
- `ExamHeroSection.jsx` ✅ - Hero with two-column layout, search bar, popular exams pills, and illustration
- `ExamCategorySection.jsx` ✅ - Category filter pills with exam cards grid (2 columns, 6 exams shown, dynamic View All link)
- `ExamNewsSection.jsx` ✅ - News list (6 items shown) with newsletter and exam widgets
- `ConceptArticlesSection.jsx` ✅ - Subject filters with Class 10/12 article carousels (conditional scroll arrows)
- `PreviousYearPapersSection.jsx` ✅ - Dynamic exam filters with paper carousels (6 papers per exam)
- `FAQSection.jsx` ✅ - Reusable FAQ accordion section with default exam questions

**Cards** (`src/components/cards/`)
- `ExamCard.jsx` ✅ - Enhanced with two variants:
  - **default variant**: For homepage (Participating Colleges, Exam Date, Exam Level)
  - **detailed variant**: For exams page (compact design, p-4, text-xs, 2-column grid optimized)
- `ExamNewsCard.jsx` ✅ - Compact news card (48×48px thumbnail, text-xs, p-2.5)
- `ArticleCard.jsx` ✅ - Article card with colorful gradients, document illustration (210px width, 4 per row)
- `PreviousYearPaperCard.jsx` ✅ - Paper card with orange-amber gradient, exam icon (240px width)

**Widgets** (`src/components/widgets/`)
- `NewsletterWidget.jsx` ✅ - Compact newsletter subscription widget (p-4, text-xs/base)
- `UpcomingExamsWidget.jsx` ✅ - Upcoming exams list with dates and icons (5 exams)
- `ExamsSyllabusWidget.jsx` ✅ - Exam syllabus with quick links (3 exams: CAT, JEE Main, GATE)

**Common** (`src/components/common/`)
- `FAQItem.jsx` ✅ - Accordion FAQ item with expand/collapse, green theme

#### Design Specifications

**Color Theme** - Green Palette
- **Hero section**:
  - Background: Gradient (`from-green-50 via-white to-blue-50`)
  - Decorative elements: `green-200`, `blue-200` blur circles
  - Heading: `gray-900` (Entrance Exams), `green-600` (In India)
  - Search bar: White with green button (`green-600`)
  - Popular exam pills: Blue theme (`blue-50` bg, `blue-600` text, `blue-200` border)
- **Category section**:
  - Background: White
  - Active pill: Green gradient (`from-green-600 to-emerald-600`)
  - Exam cards: Compact (p-4, text-xs details, 12×12px icons)
  - View All link: Green text with chevron
- **News section**:
  - Compact cards: 48×48px thumbnails, text-xs, p-2.5
  - Widgets: Various backgrounds (green-50, white, orange-50)
- **Concept articles**:
  - Card backgrounds: 6 gradient colors (blue, green, sky, amber, purple, rose)
  - Card width: 210px (4 cards visible)
  - Arrows: Circular floating buttons with conditional left arrow
- **Previous year papers**:
  - Card background: Orange-to-amber gradient
  - Card width: 240px
  - Dynamic section title based on active exam
- **FAQ section**:
  - Accordion with green accents
  - Answer section: green-50 bg, green-600 left border

**Section Sizing**
- **Left column**: lg:col-span-8 (66% width)
- **Right column**: lg:col-span-4 (33% width)
- **Article cards**: 210px width (4 per row)
- **Paper cards**: 240px width
- **News thumbnails**: 48×48px (compact)
- **Exam icons**: 12×12px (compact)

**Interactive Features**
- **Category selection**: 24 categories with View More/Less
- **Subject filters**: 4 subjects for concept articles
- **Exam filters**: 6 exams for previous year papers
- **Carousel navigation**: Conditional left/right arrows with smooth scroll
- **FAQ accordion**: Click to expand/collapse
- **Dynamic content**: Section titles and content change based on filters
- **Scroll detection**: Left arrow appears after scrolling >10px

**Layout Patterns**
- **Two-column**: 66% left (content) + 33% right (widgets)
- **Horizontal carousels**: Concept articles, previous year papers
- **Vertical stacks**: News section with multiple widgets
- **Accordion**: FAQ with expandable answers
- **Full-width**: Newsletter section at bottom

---

## Future Enhancements

### Potential New Pages
- Individual Course Detail Page
- Exam Detail Page
- News Article Page
- Study Abroad Country Page
- Search Results Page

### Potential New Features
- Dark mode toggle
- User authentication
- Favorites/Bookmarks
- College predictor tool
- Course finder wizard
- Notification preferences

---

## Development Guidelines & Critical Rules ⚠️

### **DO NOT Make These Mistakes**

#### 1. **Never Modify Shared Components Without Checking All Usage Locations**
- ❌ **WRONG**: Updating `CollegeListItem.jsx` directly when it's used in multiple places
- ✅ **RIGHT**: Create a new component (e.g., `TopCollegeCard.jsx`) for different use cases
- **Why**: A component used in both homepage AND listing pages has different requirements. Modifying one breaks the other.
- **Rule**: Before editing any component, use `Grep` to find ALL files that import it:
  ```bash
  grep -r "ComponentName" src/
  ```

#### 2. **Never Update Color Names Partially**
- ❌ **WRONG**: Changing `blue-500` to `green-500` in some files but not all
- ✅ **RIGHT**: Use systematic search (Grep) to find ALL instances and update them together
- **Why**: Inconsistent naming causes confusion and makes the codebase unmaintainable
- **Rule**: When renaming colors/variables, ALWAYS:
  1. Search for all variants: `blue-[0-9]`, `--blue`, `shadow-blue`, etc.
  2. Update CSS variables in `globals.css` first
  3. Update all component files
  4. Verify with build

#### 3. **Never Assume Component Names Indicate Single Use**
- ❌ **WRONG**: "It's called `CollegeListItem`, so it's only used in college lists"
- ✅ **RIGHT**: Check actual usage before modifying
- **Why**: Components may be reused in unexpected places (homepage, detail pages, modals)
- **Rule**: Search for imports BEFORE making changes

#### 4. **Always Create Context-Specific Components**
- ❌ **WRONG**: Making one component handle multiple drastically different layouts via props
- ✅ **RIGHT**: Create separate components for different contexts:
  - `TopCollegeCard.jsx` - Homepage card layout
  - `CollegeListItem.jsx` - Listing page table row
  - `CollegeCompareCard.jsx` - Compare modal card
- **Why**: Single Responsibility Principle - easier to maintain and modify

#### 5. **Never Skip Build Verification After Major Changes**
- ❌ **WRONG**: Making changes and assuming they work
- ✅ **RIGHT**: Run `npm run build` after:
  - Renaming variables/classes
  - Updating shared components
  - Modifying CSS global styles
- **Why**: Build errors surface breaking changes immediately

#### 6. **Document Component Purpose and Usage**
- ✅ **REQUIRED**: Update `PLANNING.md` when creating new components
- ✅ **REQUIRED**: Add to barrel exports in `index.js` files
- ✅ **REQUIRED**: Specify WHERE and HOW component is used
- **Example**:
  ```
  - TopCollegeCard.jsx ✅ (homepage college card)
  - CollegeListItem.jsx ✅ (listing page table row format)
  ```

#### 7. **Maintain Consistent Color Theme**
- ✅ **PRIMARY**: Use `green-500` (#3DA35D) and `green-600` (#3E8914)
- ✅ **ACCENTS**: `amber-400/500` for ratings, `emerald-500` for success
- ❌ **NEVER**: Use `orange-*` or `blue-*` colors (except CSS variables that map to green)
- **Rule**: All brand colors use GREEN palette, not blue or orange

#### 8. **View Mode Pattern - College Listing Example**
- ✅ **RIGHT**: Separate components for each view mode
  - `CollegeListItem.jsx` - Table view (6-column grid)
  - `GridCollegeCard.jsx` - Grid view (vertical card)
  - `ListCollegeCard.jsx` - List view (horizontal card)
- ❌ **WRONG**: One component with view mode props trying to handle all layouts
- **Why**: Each view has drastically different layouts, data display, and interactions
- **Pattern**:
  - Create view-specific card components
  - Create view-specific section components (GridViewSection, ListViewSection)
  - Use a switcher component (CollegeResultsSection) to render the right view
  - Share common modals and utilities across views

### Quick Checklist Before Making Changes

- [ ] Search for all files using the component/variable you're modifying
- [ ] Understand all usage contexts (homepage, listing, modal, etc.)
- [ ] Create new component if contexts differ significantly
- [ ] Update all instances when renaming colors/variables
- [ ] Run `npm run build` to verify changes
- [ ] Update PLANNING.md documentation
- [ ] Add to barrel exports if creating new component

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19 with React Compiler
- **Styling**: Tailwind CSS 4 via PostCSS
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom Icon component with 40+ SVG icons
- **Utilities**: clsx + tailwind-merge for className handling
