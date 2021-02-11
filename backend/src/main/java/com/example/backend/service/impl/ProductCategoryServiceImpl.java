package com.example.backend.service.impl;

import com.example.backend.entities.ProductCategory;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProductCategoryRepository;
import com.example.backend.request.productCategory.CreateProductCategoryRequest;
import com.example.backend.request.productCategory.UpdateProductCategoryRequest;
import com.example.backend.service.ProductCategoryService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

  private final ProductCategoryRepository productCategoryRepository;

  @Autowired
  public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository) {
    this.productCategoryRepository = productCategoryRepository;
  }

  @Override
  public List<ProductCategory> getAll() {
    return productCategoryRepository.findAll();
  }

  @Override
  public Optional<ProductCategory> getById(Long id) {
    return productCategoryRepository.findById(id);
  }

  @Override
  public ProductCategory createProductCategory(CreateProductCategoryRequest request) {
    ProductCategory productCategory = new ProductCategory();
    productCategory.setName(request.getName());
    productCategory.setDescription(request.getDescription());
    return productCategoryRepository.save(productCategory);
  }

  @Override
  public ProductCategory updateProductCategory(UpdateProductCategoryRequest request) {
    ProductCategory productCategory = productCategoryRepository.findById(request.getId())
        .orElseThrow(() -> new ResourceNotFoundException("not found id = " + request.getId()));

    productCategory.setName(request.getName());
    productCategory.setDescription(request.getDescription());

    return productCategoryRepository.save(productCategory);
  }

  @Override
  public void deleteById(Long id) {
    productCategoryRepository.deleteById(id);
  }
}
