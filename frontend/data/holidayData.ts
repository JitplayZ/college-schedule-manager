export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'academic' | 'national';
  description?: string;
}

export const initialHolidays: Holiday[] = [
  {
    id: '1',
    name: 'Labor Day',
    date: '2024-09-02',
    type: 'national',
    description: 'Federal holiday celebrating the achievements of workers'
  },
  {
    id: '2',
    name: 'Fall Break',
    date: '2024-10-14',
    type: 'academic',
    description: 'Mid-semester break for students and faculty'
  },
  {
    id: '3',
    name: 'Thanksgiving Break',
    date: '2024-11-28',
    type: 'academic',
    description: 'Extended holiday break including Thanksgiving Day'
  },
  {
    id: '4',
    name: 'Christmas Break',
    date: '2024-12-23',
    type: 'academic',
    description: 'Winter break period - classes resume in January'
  },
  {
    id: '5',
    name: 'Martin Luther King Jr. Day',
    date: '2025-01-20',
    type: 'national',
    description: 'Federal holiday honoring civil rights leader'
  },
  {
    id: '6',
    name: 'Spring Break',
    date: '2025-03-10',
    type: 'academic',
    description: 'Week-long break in the middle of spring semester'
  },
  {
    id: '7',
    name: 'Memorial Day',
    date: '2025-05-26',
    type: 'national',
    description: 'Federal holiday honoring military personnel who died in service'
  },
  {
    id: '8',
    name: 'Finals Week',
    date: '2025-05-05',
    type: 'academic',
    description: 'Final examinations period - no regular classes'
  },
  {
    id: '9',
    name: 'Independence Day',
    date: '2025-07-04',
    type: 'national',
    description: 'Celebration of American independence'
  },
  {
    id: '10',
    name: 'Summer Session Begins',
    date: '2025-06-02',
    type: 'academic',
    description: 'Start of summer semester classes'
  }
];
