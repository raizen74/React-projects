import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar"
import SelectedProject from "./components/SelectedProject";
function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // id of the project | null if we want to add a new project | undefined if we are not adding a new project and also did not select any project
    projects: [],
    tasks: [],
  })

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks] // add a new task
      }
    })
  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        // predicate function that executes for each entry and returns an array of all truthy elements
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }
    });
    }
  function handleSelectProject(id) {
    setProjectsState(prevState => { return { ...prevState, selectedProjectId: id, } });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => { return { ...prevState, selectedProjectId: null, } });
  }
  function handleCancelAddProject() {
    setProjectsState(prevState => { return { ...prevState, selectedProjectId: undefined, } });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = { ...projectData, id: projectId };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState, selectedProjectId: undefined,
        // predicate function that executes for each entry and returns an array of all truthy elements
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId),
      }
    });
  }
  // a predicate function that is executed for every element in the array
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />;  // quan el project.id no es null ni undefined
  // renderitza el SelectedProject

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    //  className="h-screen my-8 flex gap-8"
    <main id="main">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        />
      {content}
    </main>
  );
}

export default App;
