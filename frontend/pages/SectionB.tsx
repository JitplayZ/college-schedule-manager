import React from 'react';
import SchedulePage from '../components/SchedulePage';
import { sectionBData } from '../data/scheduleData';

export default function SectionB() {
  return (
    <SchedulePage
      title="Section B - Business & Economics"
      data={sectionBData}
      theme="green"
      sectionId="section-b"
    />
  );
}
