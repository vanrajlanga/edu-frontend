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
│   │   ├── ExamCard.jsx           ✅ (7 exam icons)
│   │   ├── NewsCard.jsx           ✅ (category colors)
│   │   ├── StudyAbroadCard.jsx    ✅ (10 country landmarks)
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
│   │   └── index.js                   ✅
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
    └── universities-colleges/
        └── page.js                      ✅ (college listing page)

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

## Future Enhancements

### Potential New Pages
- College Detail Page
- Course Detail Page
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
