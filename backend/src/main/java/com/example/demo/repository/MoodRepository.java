package com.example.demo.repository;

import com.example.demo.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MoodRepository extends JpaRepository<Mood, Long> { // Changed Integer to Long
    Optional<Mood> findByName(String name);
}
