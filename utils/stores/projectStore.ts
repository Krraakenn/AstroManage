// projectsStore.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Project data interface.
 * Extend or modify this according to your needs.
 */
export interface ProjectData {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

/**
 * Key for storing/retrieving projects in AsyncStorage.
 */
const PROJECTS_KEY = "@user_projects";

/**
 * Store an entire array of projects in AsyncStorage.
 */
export const storeProjects = async (projects: ProjectData[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(projects);
    await AsyncStorage.setItem(PROJECTS_KEY, jsonValue);
  } catch (error) {
    console.error("Error storing projects:", error);
  }
};

/**
 * Retrieve the array of projects from AsyncStorage.
 */
export const getProjects = async (): Promise<ProjectData[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROJECTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting projects:", error);
    return null;
  }
};

/**
 * Add a single project to the existing array in AsyncStorage.
 */
export const addProject = async (newProject: ProjectData): Promise<void> => {
  try {
    // First, get existing projects
    const existingProjects = (await getProjects()) || [];

    // Check if the project already exists (optional)
    const projectExists = existingProjects.some(
      (project) => project.id === newProject.id
    );
    if (projectExists) {
      console.warn(`Project with id ${newProject.id} already exists.`);
      return;
    }

    // Append the new project
    const updatedProjects = [...existingProjects, newProject];
    await storeProjects(updatedProjects);
  } catch (error) {
    console.error("Error adding new project:", error);
  }
};

/**
 * Update an existing project by ID.
 */
export const updateProject = async (
  updatedProject: ProjectData
): Promise<void> => {
  try {
    const existingProjects = (await getProjects()) || [];

    // Find index of the project to update
    const index = existingProjects.findIndex(
      (project) => project.id === updatedProject.id
    );

    if (index === -1) {
      console.warn(`Project with id ${updatedProject.id} not found.`);
      return;
    }

    // Replace old project with updated one
    existingProjects[index] = updatedProject;
    await storeProjects(existingProjects);
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

/**
 * Remove a project by ID from AsyncStorage.
 */
export const removeProject = async (projectId: string): Promise<void> => {
  try {
    const existingProjects = (await getProjects()) || [];
    const filteredProjects = existingProjects.filter(
      (project) => project.id !== projectId
    );

    await storeProjects(filteredProjects);
  } catch (error) {
    console.error("Error removing project:", error);
  }
};

/**
 * Clear all projects from AsyncStorage.
 */
export const clearAllProjects = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PROJECTS_KEY);
  } catch (error) {
    console.error("Error clearing projects:", error);
  }
};
