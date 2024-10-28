package com.todo.backend.Service;
import com.todo.backend.Entities.Project;
import com.todo.backend.Entities.Todo;
import com.todo.backend.Exceptions.ResourceAlreadyExistsException;
import com.todo.backend.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Value("${github.token}")
    String token;
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    private void validateProjectNameUnique(String projectName) {
        if (projectRepository.existsByTitle(projectName)) {
            throw new ResourceAlreadyExistsException("Project with name " + projectName + " already exists.");
        }
    }
    public Project createProject(Project project) {
        validateProjectNameUnique(project.getTitle());
        return projectRepository.save(project);
    }
    public void deleteProject(Long projectId) {
       projectRepository.deleteById(projectId);
    }
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }
    public Map<String, String> exportProjectToGist(Long projectId) {
        Project project = getProjectById(projectId);
        String markdownContent = generateMarkdown(project);
        saveMarkdownLocally(project.getTitle(), markdownContent);
        // Prepare Gist request body
        Map<String, Object> fileContent = new HashMap<>();
        fileContent.put("content", markdownContent);

        Map<String, Object> files = new HashMap<>();
        files.put(project.getTitle() + ".md", fileContent);

        Map<String, Object> gistRequest = new HashMap<>();
        gistRequest.put("description", "Project Summary: " + project.getTitle());
        gistRequest.put("public", false);
        gistRequest.put("files", files);

        // Prepare HTTP request

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(gistRequest, headers);

        // Send POST request to GitHub API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity("https://api.github.com/gists", requestEntity, Map.class);

        String gistUrl = (String) response.getBody().get("html_url");

        // Prepare response
        Map<String, String> result = new HashMap<>();
        result.put("message", "Gist created successfully");
        result.put("gistUrl", gistUrl);

        return result;
    }

    private String generateMarkdown(Project project) {
        StringBuilder sb = new StringBuilder();
        sb.append("# ").append(project.getTitle()).append("\n");
        sb.append("## Summary\n");
        long completedCount = project.getTodos().stream().filter(Todo::isStatus).count();
        sb.append(completedCount).append(" / ").append(project.getTodos().size()).append(" completed.\n\n");

        sb.append("### Pending Todos:\n");
        project.getTodos().stream().filter(todo -> !todo.isStatus())
                .forEach(todo -> sb.append("- [ ] ").append(todo.getDescription()).append("\n"));

        sb.append("\n### Completed Todos:\n");
        project.getTodos().stream().filter(Todo::isStatus)
                .forEach(todo -> sb.append("- [x] ").append(todo.getDescription()).append("\n"));

        return sb.toString();
    }
    private void saveMarkdownLocally(String projectName, String markdownContent) {
        // Define the directory path
        String directoryPath = "src/summaries";

        // Create directory if it does not exist
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();  // Create the directory
        }

        // Define the file name
        String fileName = projectName + ".md";
        File markdownFile = new File(directory, fileName);

        // Write the markdown content to the file
        try (FileWriter writer = new FileWriter(markdownFile)) {
            writer.write(markdownContent);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
    }

    public Project updateProject(Long id, Project projectDetails) throws Exception {
        // Find the existing Todo
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new Exception("Todo not found with id: " + id));
        if(!existingProject.getTitle().equals(projectDetails.getTitle())){
            validateProjectNameUnique(projectDetails.getTitle());
        }
        // Update the fields
        existingProject.setTitle(projectDetails.getTitle());

        // Save and return the updated Todo
        return projectRepository.save(existingProject);
    }
}
