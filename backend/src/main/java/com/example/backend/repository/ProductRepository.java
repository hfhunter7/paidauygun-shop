package com.example.backend.repository;

import com.example.backend.entities.Product;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findAll();

  Optional<Product> findById(Long productId);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM Product WHERE id = :id", nativeQuery = true)
  void deleteById(@Param("id") Long id);
}
