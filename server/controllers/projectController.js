// Import json with list of projects
import projects from "../data/projects.json";

// Create controller for GET request to '/projects/all'
export async function projectsGetAll(req, res) {
  // res.send('There will be dragons, not posts.')
  res.json(projects);
}
