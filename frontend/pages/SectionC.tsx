import React from 'react';
import SchedulePage from '../components/SchedulePage';
import { sectionCData } from '../data/scheduleData';

export default function SectionC() {
  return (
    <SchedulePage
      title="Section C - Liberal Arts & Social Sciences"
      data={sectionCData}
      theme="orange"
      sectionId="section-c"
    />
  );
}
