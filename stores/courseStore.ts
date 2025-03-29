import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import courseData from '@/public/courses.json';

export interface Course {
  id: string;
  course: string;
  friendlyName: string;
  difficulty: string;
  enabled: boolean;
}

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    courses: [] as Course[],
    lastSelectedCourse: null as Course | null,
  }),

  actions: {
    async loadCourses(): Promise<void> {
      // Use courseData directly instead of making an axios call
      const normalCourses = courseData.map((course: any) => {
        const existingCourse = this.courses.find((c) => c.id === course.course + 'Normal');
        return {
          id: course.course + 'Normal',
          course: course.course,
          friendlyName: course.friendlyName,
          difficulty: 'Normal',
          enabled: existingCourse ? existingCourse.enabled : true, // Inherit enabled state if persisted
        };
      });

      const hardCourses = courseData.map((course: any) => {
        const existingCourse = this.courses.find((c) => c.id === course.course + 'Hard');
        return {
          id: course.course + 'Hard',
          course: course.course,
          friendlyName: course.friendlyName,
          difficulty: 'Hard',
          enabled: existingCourse ? existingCourse.enabled : true, // Inherit enabled state if persisted
        };
      });

      this.courses = [...normalCourses, ...hardCourses];
    },

    toggleCourse(courseId: string, enabledState?: boolean): void {
      const course = this.courses.find((c) => c.id === courseId);
      if (course) {
        if (enabledState !== undefined) {
          course.enabled = enabledState;
        } else {
          course.enabled = !course.enabled;
        }
      } else {
        console.warn(`Course with ID ${courseId} not found.`);
      }
    },

    resetDisabledCourses(): void {
      Cookies.remove('disabledCourses');
      this.courses.forEach((course) => {
        course.enabled = true;
      });
      console.log('All courses have been enabled, and disabledCourses cookie has been reset.');
    },
  },

  getters: {
    getAllCourses: (state) => {
      return state.courses;
    },
    getCourseById: (state) => (courseId: string) => {
      return state.courses.find((course) => course.id === courseId);
    },
    getCoursesGroupedByDifficulty: (state) => (difficulty: string) => {
      return state.courses.filter((course) => course.difficulty === difficulty);
    },
    getCourseByFriendlyName: (state) => (friendlyName: string) => {
      return state.courses.find((course) => course.friendlyName === friendlyName);
    },
    getGroupedCourses: (state) => {
      return {
        normal: state.courses.filter((course) => course.difficulty === 'Normal'),
        hard: state.courses.filter((course) => course.difficulty === 'Hard'),
      };
    },
    getAllEnabledCourses: (state) => {
      return state.courses.filter((course) => course.enabled);
    },
    getAllEnabledCoursesByDifficulty: (state) => (difficulty: string) => {
      return state.courses.filter((course) => course.difficulty === difficulty && course.enabled);
    },
    getGroupedByFriendlyName: (state) => {
      const grouped: { friendlyName: string; normal?: Course; hard?: Course }[] = [];

      state.courses.forEach((course) => {
        const existingGroup = grouped.find((group) => group.friendlyName === course.friendlyName);
    
        if (existingGroup) {
          if (course.difficulty === 'Normal') {
            existingGroup.normal = course;
          } else if (course.difficulty === 'Hard') {
            existingGroup.hard = course;
          }
        } else {
          grouped.push({
            friendlyName: course.friendlyName,
            normal: course.difficulty === 'Normal' ? course : undefined,
            hard: course.difficulty === 'Hard' ? course : undefined,
          });
        }
      });
    
      return grouped;
    }
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
