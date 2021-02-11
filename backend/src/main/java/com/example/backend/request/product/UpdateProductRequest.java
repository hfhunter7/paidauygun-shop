package com.example.backend.request.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProductRequest {
  private Long id;
  private String name;
  private String description;
  private Integer price;
  private String unit;
  private Long productCategoryId;
}
