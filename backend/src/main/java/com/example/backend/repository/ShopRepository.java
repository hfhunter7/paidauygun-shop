package com.example.backend.repository;

import com.example.backend.entities.Shop;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ShopRepository extends JpaRepository<Shop, Long> {

  List<Shop> findAll();

  Optional<Shop> findById(Long id);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM Shop WHERE id = :id", nativeQuery = true)
  void deleteById(@Param("id") int id);
}
