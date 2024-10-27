package com.todo.backend.Controller;

import com.todo.backend.Entities.Todo;
import com.todo.backend.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/project/{projectId}")
    public List<Todo> getTodosByProject(@PathVariable Long projectId) {
        return todoService.getTodosByProjectId(projectId);
    }

    @PostMapping("/project/{projectId}")
    public Todo addTodoToProject(@PathVariable Long projectId, @RequestBody Todo todo) {
        System.out.println("called post todo");
        return todoService.addTodoToProject(projectId, todo);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.ok("Todo with id "+todoId+" deleted successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) throws Exception {
        Todo updatedTodo = todoService.updateTodo(id, todoDetails);
        return ResponseEntity.ok(updatedTodo);
    }
}
