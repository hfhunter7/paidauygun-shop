package com.example.backend.controller;

import com.example.backend.entities.Product;
import com.example.backend.request.product.CreateProductRequest;
import com.example.backend.request.product.UpdateProductRequest;
import com.example.backend.response.ResponseMessage;
import com.example.backend.service.ProductService;
import io.swagger.annotations.ApiOperation;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
  private final ProductService productService;

  @Autowired
  public ProductController(ProductService productService){
    this.productService = productService;
  }

  @GetMapping(value = "/")
  @ApiOperation(value = "Get All Product", notes = "Get All Product")
  public ResponseEntity<?> getAllProduct() {
    try {
      return ResponseEntity.status(HttpStatus.OK)
          .body(productService.getAll());
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @GetMapping("/{productId}")
  @ApiOperation(value = "Get Product By Id", notes = "Get Product By Id")
  public ResponseEntity<?> getProductById(@Valid @PathVariable Long productId) {
    try {
      Optional<Product> productOptional = productService.getById(productId);

      if(productOptional.isPresent()){
        return ResponseEntity.status(HttpStatus.OK).body(productOptional.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage(false, "Not found product = " + productId));
      }
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @PostMapping("/")
  @ApiOperation(value = "Create Product", notes = "Create Product")
  public ResponseEntity<?> createProduct(
      @Valid @RequestBody CreateProductRequest request) {
    try {
      Product product = productService.createProduct(request);
      return ResponseEntity.status(HttpStatus.OK).body(product);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @PutMapping("/")
  @ApiOperation(value = "Update Product", notes = "Update Product")
  public ResponseEntity<?> updateProduct(@Valid @RequestBody UpdateProductRequest request) {
    try {
      Product product = productService.updateProduct(request);
      return ResponseEntity.status(HttpStatus.OK).body(product);
    } catch (Exception ex) {
      ex.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @DeleteMapping("/{productId}")
  @ApiOperation(value = "Delete Product", notes = "Delete Product")
  public ResponseEntity<?> deleteProduct(@Valid @PathVariable Long productId) {
    try {
      productService.deleteById(productId);
      return ResponseEntity.status(HttpStatus.OK).body("Delete Success");
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }
}
