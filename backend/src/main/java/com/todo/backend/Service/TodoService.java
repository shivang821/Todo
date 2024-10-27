package com.todo.backend.Service;

import com.todo.backend.Entities.Project;
import com.todo.backend.Entities.Todo;
import com.todo.backend.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getTodosByProjectId(Long projectId) {
        return todoRepository.findByProjectId(projectId);
    }

    public Todo addTodoToProject(Long projectId, Todo todo) {
        Project project = new Project();  // Find the project using projectService (or inject it here).
        project.setId(projectId);
        todo.setProject(project);
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
    public Todo updateTodo(Long id, Todo todoDetails) throws Exception {
        // Find the existing Todo
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new Exception("Todo not found with id: " + id));

        // Update the fields
        existingTodo.setDescription(todoDetails.getDescription());
        existingTodo.setStatus(todoDetails.isStatus());
        existingTodo.setUpdatedDate(LocalDate.now());

        // Save and return the updated Todo
        return todoRepository.save(existingTodo);
    }
}

