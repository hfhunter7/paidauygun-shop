package com.example.backend.request.product;

import com.example.backend.entities.ProductCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductRequest {
  private String name;
  private String description;
  private Integer price;
  private String unit;
  private Long productCategoryId;
}
