package com.example.backend.service.impl;

import com.example.backend.entities.Product;
import com.example.backend.entities.ProductCategory;
import com.example.backend.entities.Shop;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProductCategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ShopRepository;
import com.example.backend.request.product.CreateProductRequest;
import com.example.backend.request.product.UpdateProductRequest;
import com.example.backend.service.ProductService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;
  private final ProductCategoryRepository productCategoryRepository;
  private final ShopRepository shopRepository;

  @Autowired
  public ProductServiceImpl(
      ProductRepository productRepository,
      ProductCategoryRepository productCategoryRepository,
      ShopRepository shopRepository) {
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.shopRepository = shopRepository;
  }

  @Override
  public List<Product> getAll() {
    return productRepository.findAll();
  }

  @Override
  public Optional<Product> getById(Long id) {
    return productRepository.findById(id);
  }

  @Transactional
  @Override
  public Product createProduct(CreateProductRequest request) {
    ProductCategory productCategory = productCategoryRepository.findById(request.getProductCategoryId())
        .orElseThrow(() -> new ResourceNotFoundException("not found id = " + request.getProductCategoryId()));

    Product product = new Product();
    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setPrice(request.getPrice());
    product.setUnit(request.getUnit());
    product.setProductCategory(productCategory);
    return productRepository.save(product);
  }

  @Transactional
  @Override
  public Product updateProduct(UpdateProductRequest request) {
    ProductCategory productCategory = productCategoryRepository.findById(request.getProductCategoryId())
        .orElseThrow(() -> new ResourceNotFoundException("not found id = " + request.getProductCategoryId()));

    Product product = productRepository.findById(request.getId())
        .orElseThrow(() -> new ResourceNotFoundException("not found id = " + request.getProductCategoryId()));

    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setPrice(request.getPrice());
    product.setUnit(request.getUnit());
    product.setProductCategory(productCategory);
    return productRepository.save(product);
  }

  @Override
  public void deleteById(Long id) {
    productRepository.deleteById(id);
  }
}
