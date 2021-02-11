package com.example.backend.repository;

import com.example.backend.entities.ProductCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

  List<ProductCategory> findAll();

  Optional<ProductCategory> findById(Long id);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM ProductCategory WHERE id = :id", nativeQuery = true)
  void deleteById(@Param("id") Long id);
}
