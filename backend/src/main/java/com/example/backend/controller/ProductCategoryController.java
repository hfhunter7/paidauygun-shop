package com.example.backend.controller;

import com.example.backend.response.ResponseMessage;
import com.example.backend.service.ProductCategoryService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product-category")
public class ProductCategoryController {
  private final ProductCategoryService productCategoryService;

  @Autowired
  public ProductCategoryController(ProductCategoryService productCategoryService){
    this.productCategoryService = productCategoryService;
  }

  @GetMapping(value = "/")
  @ApiOperation(value = "Get All Product Category", notes = "Get All Product Category")
  public ResponseEntity<?> getAllProductCategory() {
    try {
      return ResponseEntity.status(HttpStatus.OK)
          .body(productCategoryService.getAll());
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }
}
