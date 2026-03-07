// Central curriculum registry — exports syllabusData for all grades
export type { LessonStep, SyllabusModule, GradeSyllabus, UnitTestQuestion } from './curriculumTypes';

import { grade5 } from './grade5';
import { grade6 } from './grade6';
import { grade7 } from './grade7';
// Grades 8-12 re-use the compact fallback below until their full files are written
import { syllabus5_8 } from './curriculum_5_8';
import { syllabus9_12 } from './curriculum_9_12';
import type { GradeSyllabus } from './curriculumTypes';

export const syllabusData: Record<number, GradeSyllabus> = {
    // Full 11-month curriculum (priority — overrides compact versions)
    5: grade5,
    6: grade6,
    7: grade7,
    // Compact fallback for grades 8-12 (will be replaced when full files are added)
    8: syllabus5_8[8],
    9: syllabus9_12[9],
    10: syllabus9_12[10],
    11: syllabus9_12[11],
    12: syllabus9_12[12],
};
