package com.todo.backend.Controller;

import com.todo.backend.Entities.Project;
import com.todo.backend.Entities.Todo;
import com.todo.backend.Service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project project) {
        Project createdProject = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }
    @PostMapping("/{id}/export-gist")
    public ResponseEntity<Map<String, String>> exportProjectToGist(@PathVariable Long id) {
        Map<String, String> result = projectService.exportProjectToGist(id);
        return ResponseEntity.ok(result);
    }
    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok("Project with id " + projectId + " deleted successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTodo(@PathVariable Long id, @RequestBody Project projectDetails) throws Exception {
        System.out.println("put called");
        Project updatedTodo = projectService.updateProject(id, projectDetails);
        return ResponseEntity.ok("project updated successfully");
    }

}


