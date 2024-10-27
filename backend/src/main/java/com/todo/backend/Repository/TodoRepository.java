package com.todo.backend.Repository;

import com.todo.backend.Entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByProjectId(Long projectId);  // Retrieve all todos for a specific project
}

