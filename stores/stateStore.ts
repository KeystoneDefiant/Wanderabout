import { defineStore } from 'pinia'
import {type Course } from '@/stores/courseStore';

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    currentView: 'MainMenu',
    selectedCourse: null as Course | null,
   }),
  actions: {
    setCurrentView(view): void {
      this.currentView = view
    },
    setSelectedCourse(course: Course): void {
      this.selectedCourse = course
      console.log(this.selectedCourse)
    },
    clearSelectedCourse(): void {
      this.selectedCourse = null
    }
  },
  getters: {
    getCurrentView(): String {
      return this.currentView
    },
    getSelectedCourse(): Course | null {
      return this.selectedCourse
    }
  },
})
