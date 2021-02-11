package com.example.backend.request.shop;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateShopRequest {
  private Long id;
  private String name;
  private String description;
  private String phoneNumber;
  private String address;
  private List<Long> productList;
}
