
import React from 'react';
import { COURSES } from '../constants';
import CourseOverview from '../components/CourseOverview';
import CourseDetails from '../components/CourseDetails';

const CoursesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 space-y-24">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900">Học viện Hudesign</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Học thiết kế đồ họa từ số 0 với giáo trình cá nhân hóa và sự đồng hành 1 kèm 1.</p>
      </div>
      <CourseOverview />
      <CourseDetails />
    </div>
  );
};

export default CoursesPage;
