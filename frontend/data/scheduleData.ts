export interface Course {
  id: string;
  name: string;
  instructor: string;
  room: string;
  time: string;
  days: string[];
  credits: number;
}

export const sectionAData: Course[] = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    instructor: 'Dr. Sarah Johnson',
    room: 'CS-101',
    time: '9:00 AM - 10:30 AM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 4
  },
  {
    id: '2',
    name: 'Calculus III',
    instructor: 'Prof. Michael Chen',
    room: 'MATH-205',
    time: '11:00 AM - 12:30 PM',
    days: ['Tuesday', 'Thursday'],
    credits: 4
  },
  {
    id: '3',
    name: 'Database Management Systems',
    instructor: 'Dr. Emily Rodriguez',
    room: 'CS-203',
    time: '2:00 PM - 3:30 PM',
    days: ['Monday', 'Wednesday'],
    credits: 3
  },
  {
    id: '4',
    name: 'Computer Graphics',
    instructor: 'Prof. David Kim',
    room: 'CS-301',
    time: '10:00 AM - 11:30 AM',
    days: ['Tuesday', 'Thursday'],
    credits: 3
  },
  {
    id: '5',
    name: 'Linear Algebra',
    instructor: 'Dr. Jessica Miller',
    room: 'MATH-108',
    time: '1:00 PM - 2:30 PM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 3
  }
];

export const sectionBData: Course[] = [
  {
    id: '6',
    name: 'Financial Accounting',
    instructor: 'Prof. Robert Wilson',
    room: 'BUS-102',
    time: '9:00 AM - 10:30 AM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 3
  },
  {
    id: '7',
    name: 'Microeconomics',
    instructor: 'Dr. Lisa Thompson',
    room: 'ECON-201',
    time: '11:00 AM - 12:30 PM',
    days: ['Tuesday', 'Thursday'],
    credits: 3
  },
  {
    id: '8',
    name: 'Business Statistics',
    instructor: 'Prof. James Anderson',
    room: 'BUS-205',
    time: '2:00 PM - 3:30 PM',
    days: ['Monday', 'Wednesday'],
    credits: 3
  },
  {
    id: '9',
    name: 'Marketing Management',
    instructor: 'Dr. Maria Garcia',
    room: 'BUS-301',
    time: '10:00 AM - 11:30 AM',
    days: ['Tuesday', 'Thursday'],
    credits: 3
  },
  {
    id: '10',
    name: 'Operations Management',
    instructor: 'Prof. Steven Lee',
    room: 'BUS-210',
    time: '1:00 PM - 2:30 PM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 3
  }
];

export const sectionCData: Course[] = [
  {
    id: '11',
    name: 'American Literature',
    instructor: 'Dr. Catherine Brown',
    room: 'ENG-105',
    time: '9:00 AM - 10:30 AM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 3
  },
  {
    id: '12',
    name: 'World History',
    instructor: 'Prof. Thomas Davis',
    room: 'HIST-201',
    time: '11:00 AM - 12:30 PM',
    days: ['Tuesday', 'Thursday'],
    credits: 3
  },
  {
    id: '13',
    name: 'Introduction to Psychology',
    instructor: 'Dr. Rachel Martinez',
    room: 'PSYC-101',
    time: '2:00 PM - 3:30 PM',
    days: ['Monday', 'Wednesday'],
    credits: 3
  },
  {
    id: '14',
    name: 'Philosophy of Ethics',
    instructor: 'Prof. William Turner',
    room: 'PHIL-205',
    time: '10:00 AM - 11:30 AM',
    days: ['Tuesday', 'Thursday'],
    credits: 3
  },
  {
    id: '15',
    name: 'Sociology of Culture',
    instructor: 'Dr. Amanda Clark',
    room: 'SOC-203',
    time: '1:00 PM - 2:30 PM',
    days: ['Monday', 'Wednesday', 'Friday'],
    credits: 3
  }
];
