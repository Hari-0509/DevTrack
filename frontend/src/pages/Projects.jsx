import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function Projects() {

    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] =
        useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {

        try {

            const response = await api.get("/projects");

            console.log(response.data);

            setProjects(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const createProject = async () => {

        try {

            await api.post(
                "/projects",
                {
                    title,
                    description
                }
            );

            setTitle("");
            setDescription("");

            loadProjects();

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <MainLayout>

            <h1
                style={{
                    color: "white"
                }}
            >
                Projects
            </h1>

            <div
                style={{
                    background: "#1e293b",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px"
                }}
            >

                <input
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br />
                <br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <button
                    onClick={createProject}
                >
                    Create Project
                </button>

            </div>

            {projects.map((project) => (

                <div
                    key={project.id}
                    style={{
                        background: "#1e293b",
                        color: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "15px"
                    }}
                >

                    <h3>
                        {project.title}
                    </h3>

                    <p>
                        {project.description}
                    </p>

                    <p>
                        Status:
                        {" "}
                        {project.status}
                    </p>

                </div>

            ))}

        </MainLayout>

    );
}

export default Projects;