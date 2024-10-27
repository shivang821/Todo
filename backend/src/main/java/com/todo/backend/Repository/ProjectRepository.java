package com.todo.backend.Repository;

import com.todo.backend.Entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    boolean existsByTitle(String title);
}

