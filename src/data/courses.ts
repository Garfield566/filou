import type { Course } from '../types';
import { englishUnits } from './english';
import { germanUnits } from './german';

export const courses: Course[] = [
  { id: 'en', name: 'anglais', label: 'Anglais', languageTag: 'en-US', units: englishUnits },
  { id: 'de', name: 'allemand', label: 'Allemand', languageTag: 'de-DE', units: germanUnits },
];

export const courseById = (id: string): Course => courses.find((c) => c.id === id) ?? courses[0];

export const lessonsOf = (course: Course) => course.units.flatMap((unit) => unit.lessons);
