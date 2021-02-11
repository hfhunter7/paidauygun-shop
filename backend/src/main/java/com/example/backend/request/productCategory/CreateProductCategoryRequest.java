package com.example.backend.request.productCategory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateProductCategoryRequest {
  private String name;
  private String description;
}
