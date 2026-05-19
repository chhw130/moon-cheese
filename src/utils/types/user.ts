export type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export type UserInfo = {
  point: number;
  grade: Grade;
};

export type GradePointInfo = {
  type: Grade;
  minPoint: number;
};

export type GradePoint = {
  gradePointList: GradePointInfo[];
};
