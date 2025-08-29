import { FormData } from './validation';

const STORAGE_KEY = 'youth-camp-form-data';

export const saveFormData = (data: Partial<FormData>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error);
  }
};

export const loadFormData = (): Partial<FormData> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error);
    return {};
  }
};

export const clearFormData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error);
  }
};

export const saveCurrentStep = (step: string) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}-step`, step);
  } catch (error) {
    console.warn('Failed to save current step:', error);
  }
};

export const loadCurrentStep = (): string | null => {
  try {
    return localStorage.getItem(`${STORAGE_KEY}-step`);
  } catch (error) {
    console.warn('Failed to load current step:', error);
    return null;
  }
};