package com.example.backend.service.impl;

import com.example.backend.entities.Product;
import com.example.backend.entities.Shop;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ShopRepository;
import com.example.backend.request.shop.CreateShopRequest;
import com.example.backend.request.shop.UpdateShopRequest;
import com.example.backend.service.ShopService;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShopServiceImpl implements ShopService {

  private final ShopRepository shopRepository;
  private final ProductRepository productRepository;

  @Autowired
  public ShopServiceImpl(ShopRepository shopRepository, ProductRepository productRepository) {
    this.shopRepository = shopRepository;
    this.productRepository = productRepository;
  }

  @Override
  public List<Shop> getAllShop() {
    return shopRepository.findAll();
  }

  @Override
  public Optional<Shop> getShopById(Long id) {
    return shopRepository.findById(id);
  }

  @Transactional
  @Override
  public Shop createShop(CreateShopRequest request) {
    Shop shop = new Shop();
    shop.setName(request.getName());
    shop.setAddress(request.getAddress());
    shop.setDescription(request.getDescription());
    shop.setPhoneNumber(request.getPhoneNumber());

    for (Long productId : request.getProductList()) {
      Product product = productRepository.findById(productId)
          .orElseThrow(() -> new ResourceNotFoundException("not found product id = " + productId));

      shop.getProductSet().add(product);
    }
    return shopRepository.save(shop);
  }

  @Transactional
  @Override
  public Shop updateShop(UpdateShopRequest request) {
    Shop shop = shopRepository.findById(request.getId())
        .orElseThrow(() -> new ResourceNotFoundException("not found id = " + request.getId()));

    shop.getProductSet().removeAll(shop.getProductSet());
    for (Long productId : request.getProductList()) {
      Product productObj = productRepository.findById(productId)
          .orElseThrow(() -> new ResourceNotFoundException("not found id = " + productId));
      shop.getProductSet().add(productObj);
    }

    shop.setName(request.getName());
    shop.setAddress(request.getAddress());
    shop.setDescription(request.getDescription());
    shop.setPhoneNumber(request.getPhoneNumber());
    return shopRepository.save(shop);
  }

  @Override
  public void deleteShopById(Long id) {
    shopRepository.deleteById(id);
  }
}
