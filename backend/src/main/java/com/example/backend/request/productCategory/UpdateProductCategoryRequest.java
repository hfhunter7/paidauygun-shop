package com.example.backend.request.productCategory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateProductCategoryRequest {
  private Long id;
  private String name;
  private String description;
}
