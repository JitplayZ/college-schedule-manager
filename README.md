# College Schedule Manager

A comprehensive multi-page web application for managing college class schedules and holiday lists. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Multi-page Navigation**: Home dashboard, three class sections (A, B, C), and holiday calendar
- **Schedule Management**: Add, edit, and delete courses with full CRUD functionality
- **Multiple Views**: Daily, weekly, and table views for schedule visualization
- **Search & Filter**: Find courses by name, instructor, or filter by specific days
- **Holiday Calendar**: Manage academic and national holidays with type filtering
- **Data Persistence**: All data stored locally using localStorage

### 🎨 Design & User Experience
- **Responsive Design**: Optimized for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Theme System**: Distinct color schemes for each section (Blue, Green, Orange, Purple)
- **Modern UI**: Clean interface with smooth animations and hover effects
- **Print-Friendly**: Optimized CSS for printing schedules
- **Accessibility**: WCAG 2.1 compliant with proper focus states and keyboard navigation

### 📱 Technical Features
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Safari, and Edge
- **Local Storage**: Persistent data across browser sessions
- **Loading States**: Smooth transitions and loading animations
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation
1. Clone or download the project files
2. Open the project directory in your terminal
3. The application will automatically install dependencies and start

### Usage
1. **Home Page**: Overview of all sections and quick navigation
2. **Section Pages**: Manage courses for Computer Science (A), Business (B), or Liberal Arts (C)
3. **Holiday Calendar**: View and manage academic and national holidays
4. **Add/Edit Courses**: Click the "Add Course" button to create new entries
5. **Search**: Use the search bar to find specific courses or instructors
6. **Filter**: Filter by day of the week or holiday type
7. **View Modes**: Switch between daily, weekly, and table views

## Application Structure

```
frontend/
├── components/           # Reusable UI components
│   ├── Navigation.tsx   # Main navigation component
│   └── SchedulePage.tsx # Shared schedule page component
├── pages/               # Individual page components
│   ├── Home.tsx        # Dashboard/landing page
│   ├── SectionA.tsx    # Computer Science section
│   ├── SectionB.tsx    # Business section
│   ├── SectionC.tsx    # Liberal Arts section
│   └── Holidays.tsx    # Holiday calendar page
├── data/               # Sample data and types
│   ├── scheduleData.ts # Course data for all sections
│   └── holidayData.ts  # Holiday data
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Local storage management
├── styles/             # CSS and styling
│   └── global.css      # Global styles and print CSS
└── App.tsx            # Main application component
```

## Sample Data

### Courses (5 per section)
**Section A - Computer Science & Mathematics:**
- Data Structures and Algorithms
- Calculus III
- Database Management Systems
- Computer Graphics
- Linear Algebra

**Section B - Business & Economics:**
- Financial Accounting
- Microeconomics
- Business Statistics
- Marketing Management
- Operations Management

**Section C - Liberal Arts & Social Sciences:**
- American Literature
- World History
- Introduction to Psychology
- Philosophy of Ethics
- Sociology of Culture

### Holidays (10 total)
- **Academic**: Fall Break, Thanksgiving Break, Christmas Break, Spring Break, Finals Week, Summer Session Begins
- **National**: Labor Day, Martin Luther King Jr. Day, Memorial Day, Independence Day

## Customization

### Adding New Courses
1. Navigate to any section page
2. Click "Add Course" button
3. Fill in course details (name, instructor, room, time, days, credits)
4. Save to add to the schedule

### Managing Holidays
1. Go to the Holiday Calendar page
2. Use "Add Holiday" to create new entries
3. Filter by type (Academic/National) or search by name
4. Edit or delete existing holidays as needed

### Color Themes
Each section has its own color theme:
- **Section A**: Blue theme (`from-blue-500 to-blue-600`)
- **Section B**: Green theme (`from-green-500 to-green-600`)
- **Section C**: Orange theme (`from-orange-500 to-orange-600`)
- **Holidays**: Purple theme (`from-purple-500 to-purple-600`)

## Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Accessibility Features
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus indicators
- ARIA labels where appropriate

## Print Functionality
The application includes print-optimized CSS that:
- Removes navigation elements
- Optimizes layout for paper
- Ensures proper page breaks
- Uses print-friendly colors

To print a schedule:
1. Navigate to the desired section
2. Use your browser's print function (Ctrl+P / Cmd+P)
3. The layout will automatically optimize for printing

## Data Storage
All data is stored locally in your browser using localStorage:
- Course schedules are saved per section
- Holiday data is saved globally
- Data persists across browser sessions
- No external database required

## Troubleshooting

### Common Issues
1. **Data not saving**: Ensure your browser supports localStorage and isn't in private/incognito mode
2. **Layout issues on mobile**: Try refreshing the page or clearing browser cache
3. **Print not working**: Check your browser's print settings and ensure CSS is enabled

### Browser Compatibility
If you experience issues, try:
1. Updating your browser to the latest version
2. Clearing browser cache and cookies
3. Disabling browser extensions temporarily

## Future Enhancements
Potential features for future versions:
- Export to PDF functionality
- Calendar sync integration
- Email notifications for upcoming deadlines
- Dark mode support
- Multi-user support with authentication
- Cloud data synchronization

## Contributing
This is a self-contained application designed for immediate use. All components are modular and well-documented for easy customization and extension.

## License
This project is provided as-is for educational and personal use.
