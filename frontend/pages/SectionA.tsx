import React from 'react';
import SchedulePage from '../components/SchedulePage';
import { sectionAData } from '../data/scheduleData';

export default function SectionA() {
  return (
    <SchedulePage
      title="Section A - Computer Science & Mathematics"
      data={sectionAData}
      theme="blue"
      sectionId="section-a"
    />
  );
}
