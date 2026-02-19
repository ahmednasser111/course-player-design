# 🎓 Course Player Platform

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-white?style=for-the-badge&logo=radix-ui)](https://www.radix-ui.com/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com/)

A sophisticated, production-ready educational platform featuring an advanced video player, interactive curriculum, community engagement tools, and dynamic motivational systems. Built with **Next.js**, **Tailwind CSS**, and **Radix UI**.

---

## ✨ Key Features

### 📺 Advanced Player System
- **Responsive Modes**: Switch seamlessly between **Normal**, **Wide**, and **Fullscreen** modes.
- **Mobile Sticky Header**: YouTube-style sticky player on mobile devices for uninterrupted viewing while browsing content.
- **Smooth Transitions**: Professional animations between layout shifts.

### 📚 Interactive Learning
- **Collapsible Curriculum**: Organized by weeks with lesson and quiz tracking.
- **Progress Tracking**: Visual indicators for completed and upcoming content.
- **Smooth Navigation**: One-click internal scrolling to specific sections.

### 🤝 Community & Support
- **Comments System**: Threaded comments for peer-to-peer and instructor interaction.
- **Ask Question Modal**: Integrated question submission with **Session Draft Preservation** (never lose your unsaved work).
- **Leaderboard**: Competitive ranking system to boost student engagement.

### 🚀 Smart Motivation
- **Motivational Messages**: 20+ dynamic messages styled after M. Ali Shaheen.
- **Level-Based Content**: Messages adapt based on user progress (Beginner → Expert).
- **Plain-Text Emoticons**: Friendly, low-distraction motivational cues.

---

## 🏗️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context & Hooks
- **Persistence**: SessionStorage for drafts

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Pages & Layouts)
├── components/           # UI Components
│   ├── course-player/    # Core platform components
│   │   ├── modals/       # Interaction modals (Leaderboard, Ask Question)
│   │   └── ...           # Player, Controls, Sections
│   └── ui/               # Reusable primitive components (shadcn)
├── hooks/                # Custom React hooks (State & Persistence)
├── lib/                  # Utilities & Motivational Message Library
└── public/               # Static assets
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn

### 2. Installation
```bash
git clone https://github.com/ahmednasser111/course-player-design.git
cd course-player-design
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the live demo.

---

## 📖 Documentation Index

For detailed guides, refer to the specialized documentation files:

| Document | Description |
| :--- | :--- |
| 📘 **[Quick Start Guide](./README_COURSE_PLAYER.md)** | Core features and basic usage. |
| 🛠️ **[Integration Guide](./COURSE_PLAYER_GUIDE.md)** | API reference, props, and backend integration. |
| 🎨 **[Layout Reference](./LAYOUT_REFERENCE.md)** | Design specifications and ASCII wireframes. |
| ✅ **[Component Checklist](./IMPLEMENTATION_CHECKLIST.md)** | Feature status and development progress. |
| 📊 **[Project Summary](./PROJECT_SUMMARY.md)** | Architectural overview and success metrics. |
| 🔍 **[Documentation Index](./DOCUMENTATION_INDEX.md)** | The master map for all project docs. |

---

## 🔧 Basic Usage

```tsx
import { CoursePlayer } from '@/components/course-player/CoursePlayer';
import { CoursePlayerProvider } from '@/hooks/useCoursePlayerState';

export default function Page() {
  return (
    <CoursePlayerProvider>
      <CoursePlayer
        videoUrl="https://www.youtube.com/embed/..."
        courseName="Next.js Mastery"
        progressPercentage={45}
        curriculum={curriculumData}
        comments={commentsData}
      />
    </CoursePlayerProvider>
  );
}
```

---

## 📱 Accessibility & Performance

- ✅ **WCAG AA Compliant**: Semantic HTML and ARIA labels.
- ✅ **Keyboard Friendly**: Fully navigable via keyboard.
- ✅ **Optimized**: Minimal re-renders and smooth 60fps animations.
- ✅ **Cross-Browser**: Tested on Chrome, Firefox, Safari, and Edge.

---

Developed with ❤️ by [Ahmed Nasser](https://github.com/ahmednasser111)
