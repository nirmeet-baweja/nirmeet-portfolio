// Import json with list of projects
import projects from "../data/projects.json";

// Create controller for GET request to '/projects/all'
export async function projectsGetAll(req, res) {
  res.json(projects);
}
