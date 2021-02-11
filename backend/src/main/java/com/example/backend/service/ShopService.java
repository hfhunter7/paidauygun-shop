package com.example.backend.service;

import com.example.backend.entities.Shop;
import com.example.backend.request.shop.CreateShopRequest;
import com.example.backend.request.shop.UpdateShopRequest;
import java.util.List;
import java.util.Optional;

public interface ShopService {
  List<Shop> getAllShop();
  Optional<Shop> getShopById(Long id);
  Shop createShop(CreateShopRequest request);
  Shop updateShop(UpdateShopRequest request);
  void deleteShopById(Long id);
}
