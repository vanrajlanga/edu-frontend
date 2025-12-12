# EduPortal - Homepage Planning Document

A modern education portal built with Next.js 16, React 19, and Tailwind CSS 4.

> **Design Philosophy**: Clean, modern, light-themed design with classic blue color scheme. Component-based architecture following atomic design principles.

---

## Current Implementation Status

### Completed Sections ✅
1. **Header** - Fixed header with transparent variant
2. **Navbar** - Navigation with dropdowns and search
3. **HeroSection** - Landing hero with search and stats
4. **StudyGoalSection** - Horizontal scrollable course category cards
5. **ExploreProgramsSection** - Filter tabs with 6 feature cards (Ranking, Find Colleges, Compare, Exams, Predictor, Course Finder)
6. **TopCollegesSection** - Hierarchical filter tabs with college ranking list
7. **TopUniversitiesSection** - 2-row horizontal scroll grid of university cards
8. **AdmissionBanner** - CTA banner with illustration

### Pending Sections 📋
- Latest News Section
- Exam Alerts Section
- Study Abroad Section
- Testimonials Section
- Footer

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
│  ├── slate-50:   #F8FAFC                                        │
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
│  ├── orange-500: #F97316  ← CTA Buttons (Banner)                │
│  └── orange-600: #EA580C                                        │
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
│   │   ├── Icon.jsx           ✅
│   │   ├── Avatar.jsx         ✅
│   │   └── index.js           ✅
│   │
│   ├── layout/                # Layout components
│   │   ├── Header.jsx         ✅
│   │   ├── Navbar.jsx         ✅
│   │   ├── Footer.jsx         📋 (pending)
│   │   └── index.js           ✅
│   │
│   ├── cards/                 # Card variants
│   │   ├── StudyGoalCard.jsx      ✅
│   │   ├── ProgramCard.jsx        ✅ (6 variants)
│   │   ├── CollegeListItem.jsx    ✅
│   │   ├── TopUniversityCard.jsx  ✅
│   │   └── index.js               ✅
│   │
│   ├── sections/              # Homepage sections
│   │   ├── HeroSection.jsx        ✅
│   │   ├── StudyGoalSection.jsx   ✅
│   │   ├── ExploreProgramsSection.jsx  ✅
│   │   ├── TopCollegesSection.jsx      ✅
│   │   ├── TopUniversitiesSection.jsx  ✅
│   │   ├── AdmissionBanner.jsx         ✅
│   │   └── index.js                    ✅
│   │
│   └── common/                # Shared compound components
│       ├── SearchBar.jsx          ✅
│       ├── Logo.jsx               ✅
│       ├── ProgramFilterTabs.jsx  ✅
│       ├── CollegeFilterTabs.jsx  ✅
│       ├── AlertBanner.jsx        ✅
│       ├── GoalSelector.jsx       ✅
│       ├── ExploreDropdown.jsx    ✅
│       ├── NotificationDropdown.jsx ✅
│       └── index.js               ✅
│
├── lib/
│   └── cn.js                  ✅ (className merger)
│
└── app/
    ├── layout.js              ✅
    ├── page.js                ✅
    └── globals.css            ✅
```

---

## Implemented Sections

### 1. Header & Navbar

```
┌──────────────────────────────────────────────────────────────────────┐
│  [EduPortal Logo]                                                    │
│                                                                      │
│  Colleges▼  Exams▼  Courses  News                     🔍  [Login]   │
└──────────────────────────────────────────────────────────────────────┘
```

### 2. Hero Section

```
┌──────────────────────────────────────────────────────────────────────┐
│  (gradient background with decorative elements)                      │
│                                                                      │
│          Find Your Dream College                                     │
│          Discover 25,000+ colleges across India                      │
│                                                                      │
│    ╭─────────────────────────────────────────────────────────────╮  │
│    │  🔍  Search colleges, courses, exams...            [Search] │  │
│    ╰─────────────────────────────────────────────────────────────╯  │
│                                                                      │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│    │ 25,000+ │  │  500+   │  │ 1 Lakh+ │  │   50+   │              │
│    │Colleges │  │ Exams   │  │ Reviews │  │Rankings │              │
│    └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
└──────────────────────────────────────────────────────────────────────┘
```

### 3. Study Goal Section

```
┌──────────────────────────────────────────────────────────────────────┐
│  Select Your Study Goal                                              │
│                                                                      │
│  ◀ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──── ▶ │
│    │Engineering│ │Management │ │ Commerce  │ │   Arts    │ │Med    │
│    │ ⚙️ 6347   │ │ 📊 7977   │ │ 💼 5063   │ │ 📚 5706   │ │ ❤️    │
│    │ Colleges  │ │ Colleges  │ │ Colleges  │ │ Colleges  │ │ Col   │
│    │           │ │           │ │           │ │           │ │       │
│    │ BE/B.Tech │ │ MBA/PGDM  │ │ B.Com     │ │ BA        │ │ MBBS  │
│    │ Diploma   │ │ BBA/BMS   │ │ M.Com     │ │ MA        │ │ PG    │
│    │ ME/M.Tech │ │ Exec MBA  │ │           │ │ BFA       │ │ Med   │
│    └───────────┘ └───────────┘ └───────────┘ └───────────┘ └────   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 4. Explore Programs Section

```
┌──────────────────────────────────────────────────────────────────────┐
│  Explore Programs                                                    │
│                                                                      │
│  [All] [BE/B.Tech] [MBA/PGDM] [MBBS] [ME/M.Tech] [B.Sc] ...         │
│  (scrollable filter tabs)                                            │
│                                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │
│  │   📊 Ranking    │ │  🔍 Find        │ │  ⚖️ Compare     │        │
│  │   India's Top   │ │  Colleges       │ │  Colleges       │        │
│  │   Colleges      │ │  Best match     │ │  Side by side   │        │
│  │   [View →]      │ │  [Find →]       │ │  [Compare →]    │        │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘        │
│                                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │
│  │   📝 Exams      │ │  🎯 College     │ │  📚 Course      │        │
│  │   Upcoming      │ │  Predictor      │ │  Finder         │        │
│  │   entrance      │ │  Know chances   │ │  Find right     │        │
│  │   [View →]      │ │  [Predict →]    │ │  [Find →]       │        │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘        │
└──────────────────────────────────────────────────────────────────────┘
```

### 5. Top Colleges Section (Hierarchical Filters)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Top 10 Colleges                                    [View All →]     │
│                                                                      │
│  Initial State (no filter):                                          │
│  [BE/B.Tech] [MBA/PGDM] [MBBS] [ME/M.Tech] [B.Sc] [BA] ...    →     │
│  ────────────────────────────────────────────────────────────────    │
│                                                                      │
│  After selecting BE/B.Tech:                                          │
│  [BE/B.Tech ✕] │ [Computer Science] [Mechanical] [ECE] [Civil] → │
│  ────────────────────────────────────────────────────────────────    │
│                                                                      │
│  After selecting secondary filter:                                   │
│  [BE/B.Tech ✕] [Computer Science ✕] │ [Mechanical] [ECE] ...    → │
│  ────────────────────────────────────────────────────────────────    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ 1 │ 🏛️ IIT Madras          │ NIRF #1 │ 98.5% │ May 15 │ 2.5L │ │
│  ├────────────────────────────────────────────────────────────────┤ │
│  │ 2 │ 🏛️ IIT Delhi           │ NIRF #2 │ 98.2% │ May 15 │ 2.5L │ │
│  ├────────────────────────────────────────────────────────────────┤ │
│  │ 3 │ 🏛️ IIT Bombay          │ NIRF #3 │ 98.0% │ May 15 │ 2.5L │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│              [View All BE/B.Tech Colleges →]                         │
└──────────────────────────────────────────────────────────────────────┘
```

### 6. Top Universities Section (2-Row Grid)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Top Universities/Colleges                                           │
│                                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │ [Image]     │ │ [Image]     │ │ [Image]     │ │ [Image]     │  ▶ │
│  │ cd 10/10   │ │ cd 10/10   │ │ cd 10/10   │ │ cd 10/10   │    │
│  │ 🏛️ IIMA     │ │ 🏛️ IITB     │ │ 🏛️ CU       │ │ 🏛️ IITD     │    │
│  │ MBA ★4.6   │ │ MBA ★4.4   │ │ B.Tech ★4.4│ │ B.Tech ★4.7│    │
│  │ 27.50L     │ │ 7.68L      │ │ 2.35L      │ │ 2.28L      │    │
│  │ View Fees →│ │ View Fees →│ │ View Fees →│ │ View Fees →│    │
│  │ Brochure → │ │ Brochure → │ │ Brochure → │ │ Brochure → │    │
│  │ Compare →  │ │ Compare →  │ │ Compare →  │ │ Compare →  │    │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │ 🏛️ SRCC     │ │ 🏛️ IHM      │ │ 🏛️ NALSAR   │ │ 🏛️ NIT-T    │  ▶ │
│  │ BA ★4.3    │ │ BHM ★4.1   │ │ MBA ★4.5   │ │ B.Tech ★4.5│    │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 7. Admission Banner

```
┌──────────────────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  (amber/orange gradient background with grid pattern)                │
│                                                                      │
│     Know your chances of Admission            👤══[Start Now →]     │
│     Get personalized predictions...           📖                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### CollegeFilterTabs

**Behavior:**
- Single row that changes based on selection state
- No filter applied → Shows all primary courses as equal pills
- Filter applied → Shows selected with ✕, separator, then secondary options
- Click ✕ on primary → Returns to all courses view
- Click ✕ on secondary → Removes that secondary filter

**Props:**
```jsx
{
  primaryFilters: [{ value: 'btech', label: 'BE/B.Tech' }, ...],
  secondaryFiltersMap: {
    btech: [{ value: 'cs', label: 'Computer Science' }, ...],
    mba: [{ value: 'cat', label: 'CAT' }, ...],
  },
  selectedPrimary: string | null,
  selectedSecondary: string[],
  onPrimaryChange: (value) => void,
  onSecondaryChange: (values) => void,
}
```

### TopUniversityCard

**Layout:**
```
┌─────────────────────────────────────────┐
│  [Campus Image]              cd 10/10  │
│  🏛️ College Name - [Short]             │
│     Location | Accreditations           │
├─────────────────────────────────────────┤
│  MBA/PGDM                    ★ 4.6/5   │
│  27.50 Lacs Total Fees      59 reviews │
│  Ranked 428 out of 2000 CWUR           │
├─────────────────────────────────────────┤
│  View All Courses and fees          →  │
│  Download Brochure                  →  │
│  Compare                            →  │
└─────────────────────────────────────────┘
```

### CollegeListItem

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [1] 🏛️ IIT Madras          NIRF #1  98.5%  May 15  2.5L    →  │
│       Chennai, TN ★4.9                                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Pending Implementation

### Sections to Build
1. **Latest News Section** - Featured article + news list
2. **Exam Alerts Section** - Upcoming exams with status badges
3. **Study Abroad Section** - Country cards with stats
4. **Testimonials Section** - Carousel of student reviews
5. **Footer** - Links, newsletter, social icons

### Components to Build
- NewsCard (featured + compact variants)
- ExamCard
- CountryCard
- TestimonialCard
- Footer component

---

## Mobile Considerations

1. **Header**: Hamburger menu with slide-out drawer
2. **Cards**: Stack vertically, swipeable carousels
3. **Filter Tabs**: Horizontal scroll with scroll indicators
4. **College List**: Condensed mobile layout with expandable details
5. **2-Row Grid**: Changes to single-row carousel on mobile

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19 with React Compiler
- **Styling**: Tailwind CSS 4 via PostCSS
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom Icon component with SVG sprites
