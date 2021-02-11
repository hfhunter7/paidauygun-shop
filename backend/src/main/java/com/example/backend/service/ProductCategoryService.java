package com.example.backend.service;

import com.example.backend.entities.ProductCategory;
import com.example.backend.request.productCategory.CreateProductCategoryRequest;
import com.example.backend.request.productCategory.UpdateProductCategoryRequest;
import java.util.List;
import java.util.Optional;

public interface ProductCategoryService {
  List<ProductCategory> getAll();
  Optional<ProductCategory> getById(Long id);
  ProductCategory createProductCategory(CreateProductCategoryRequest request);
  ProductCategory updateProductCategory(UpdateProductCategoryRequest request);
  void deleteById(Long id);
}
