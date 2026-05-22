// Central curriculum registry — exports syllabusData for all grades
export type { LessonStep, SyllabusModule, GradeSyllabus, UnitTestQuestion } from './curriculumTypes';

import { grade5 } from './grade5';
import { grade6 } from './grade6';
import { grade7 } from './grade7';
import { grade8 } from './grade8';
import { grade9 } from './grade9';
import { grade10 } from './grade10';
import { grade11 } from './grade11';
import { grade12 } from './grade12';
import type { GradeSyllabus } from './curriculumTypes';

export const syllabusData: Record<number, GradeSyllabus> = {
    5: grade5,
    6: grade6,
    7: grade7,
    8: grade8,
    9: grade9,
    10: grade10,
    11: grade11,
    12: grade12,
};
