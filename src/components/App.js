import React, { useEffect, useState } from "react";

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [projectsList, setProjectsList] = useState({});

  const fetchMessage = async () => {
    const message = await fetch("/api").then((res) => res.text());
    setWelcomeMessage(message);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchProjects = async () => {
    const projects = await fetch("/projects/all").then((res) => res.json());
    setProjectsList(projects);
  };

  return (
    <div className="app">
      <header className="app-header">
        <p>{welcomeMessage}</p>
      </header>
      <main>
        <button onClick={fetchProjects}>Fetch projects</button>
        {projectsList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Tech Stack</th>
                <th>Associated Organisation</th>
              </tr>
            </thead>

            <tbody>
              {projectsList.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.title}</td>
                  <td>{project.techStack}</td>
                  <td>{project.associatedWith}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;
