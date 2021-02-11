package com.example.backend.service;

import com.example.backend.entities.Product;
import com.example.backend.request.product.CreateProductRequest;
import com.example.backend.request.product.UpdateProductRequest;
import java.util.List;
import java.util.Optional;

public interface ProductService {

  List<Product> getAll();
  Optional<Product> getById(Long id);
  Product createProduct(CreateProductRequest request);
  Product updateProduct(UpdateProductRequest request);
  void deleteById(Long id);
}