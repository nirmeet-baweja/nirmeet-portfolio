import React, { useEffect, useState } from "react";

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [projectsList, setProjectsList] = useState({});

  const [emotion, setEmotion] = useState("");

  const [statement, setStatement] = useState("");

  const handleStatement = (event) => {
    setStatement(event.target.value);
  };

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

  const predictEmotion = async () => {
    const predictedEmotion = await fetch("/emotion-predictor/predict").then(
      (res) => res.text()
    );
    console.log(predictedEmotion);
    setEmotion(predictedEmotion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatement("");
    setEmotion("");
    await predictEmotion();
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
        <form onSubmit={handleSubmit}>
          <label>
            {`Tell me something about your day and
              I will try to predict how you feel:`}
            <br />
            <input
              type="text"
              name="statement"
              value={statement}
              onChange={handleStatement}
              placeholder="Enter something about your day"
            />
          </label>
          <button onClick={handleSubmit}>Predict</button>
        </form>
        <div>
          {emotion && <span>{`The predicted emotion is: ${emotion}`}</span>}
        </div>
      </main>
    </div>
  );
}

export default App;
