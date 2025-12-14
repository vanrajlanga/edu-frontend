# EduPortal - Homepage Planning Document

A modern education portal built with Next.js 16, React 19, and Tailwind CSS 4.

> **Design Philosophy**: Clean, modern, light-themed design with classic blue color scheme. Component-based architecture following atomic design principles.

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
18. **AdmissionBanner** - CTA banner with blue gradient theme
19. **SubscribeBanner** - Simple CTA banner with blue theme
20. **CourseFinderBanner** - Two-tone banner with illustration
21. **NewsletterSection** - Subscription form with email, phone, course dropdown

### Pending Sections 📋
- *(Homepage complete - all sections implemented)*

---

## Design System

### Color Palette (Classic Blue - Light Mode Only)

```
┌─────────────────────────────────────────────────────────────────┐
│  PRIMARY PALETTE - Classic Blue                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Blue (Primary)                                                 │
│  ├── blue-50:    #EFF6FF                                        │
│  ├── blue-100:   #DBEAFE                                        │
│  ├── blue-200:   #BFDBFE                                        │
│  ├── blue-300:   #93C5FD                                        │
│  ├── blue-400:   #60A5FA                                        │
│  ├── blue-500:   #3B82F6  ← Primary Actions, CTAs               │
│  ├── blue-600:   #2563EB                                        │
│  ├── blue-700:   #1D4ED8                                        │
│  ├── blue-800:   #1E40AF                                        │
│  └── blue-900:   #1E3A8A                                        │
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
│  └── purple-500: #8B5CF6  ← Admission category                  │
│                                                                 │
│  Semantic Colors                                                │
│  ├── success:    #10B981 (emerald-500)                          │
│  ├── warning:    #F59E0B (amber-500)                            │
│  ├── error:      #EF4444 (red-500)                              │
│  └── info:       #3B82F6 (blue-500)                             │
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
│   │   ├── CollegeListItem.jsx    ✅
│   │   ├── TopUniversityCard.jsx  ✅
│   │   ├── RankingTableRow.jsx    ✅ (table row + header)
│   │   ├── CityCard.jsx           ✅ (10 landmark icons)
│   │   ├── CourseCard.jsx         ✅
│   │   ├── ExamCard.jsx           ✅ (7 exam icons)
│   │   ├── NewsCard.jsx           ✅ (category colors)
│   │   ├── StudyAbroadCard.jsx    ✅ (10 country landmarks)
│   │   └── index.js               ✅
│   │
│   ├── sections/              # Homepage sections
│   │   ├── HeroSection.jsx            ✅
│   │   ├── StudyGoalSection.jsx       ✅
│   │   ├── ExploreProgramsSection.jsx ✅
│   │   ├── TopCollegesSection.jsx     ✅
│   │   ├── TopUniversitiesSection.jsx ✅
│   │   ├── AdmissionBanner.jsx        ✅ (blue theme)
│   │   ├── CollegeRankingSection.jsx  ✅
│   │   ├── SubscribeBanner.jsx        ✅ (blue theme)
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
│   │   └── index.js                   ✅
│   │
│   └── common/                # Shared compound components
│       ├── SearchBar.jsx          ✅
│       ├── Logo.jsx               ✅
│       ├── ProgramFilterTabs.jsx  ✅
│       ├── CollegeFilterTabs.jsx  ✅
│       ├── AgencyFilterTabs.jsx   ✅
│       ├── AlertBanner.jsx        ✅
│       ├── GoalSelector.jsx       ✅
│       ├── ExploreDropdown.jsx    ✅
│       ├── NotificationDropdown.jsx ✅
│       └── index.js               ✅
│
├── lib/
│   ├── cn.js                  ✅ (className merger)
│   └── formatters.js          ✅ (number/date formatters)
│
└── app/
    ├── layout.js              ✅
    ├── page.js                ✅ (21 sections)
    └── globals.css            ✅
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

## Future Enhancements

### Potential New Pages
- College Detail Page
- Course Detail Page
- Exam Detail Page
- News Article Page
- Study Abroad Country Page
- Search Results Page
- Compare Colleges Page

### Potential New Features
- Dark mode toggle
- User authentication
- Favorites/Bookmarks
- College predictor tool
- Course finder wizard
- Notification preferences

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19 with React Compiler
- **Styling**: Tailwind CSS 4 via PostCSS
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom Icon component with 40+ SVG icons
- **Utilities**: clsx + tailwind-merge for className handling
