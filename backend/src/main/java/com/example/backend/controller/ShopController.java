package com.example.backend.controller;

import com.example.backend.entities.Shop;
import com.example.backend.request.shop.CreateShopRequest;
import com.example.backend.request.shop.UpdateShopRequest;
import com.example.backend.response.ResponseMessage;
import com.example.backend.service.ShopService;
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
@RequestMapping("/api/v1/shop")
public class ShopController {

  private final ShopService shopService;

  @Autowired
  public ShopController(ShopService shopService){
    this.shopService = shopService;
  }

  @GetMapping(value = "/")
  @ApiOperation(value = "Get All Shop", notes = "Get All Shop")
  public ResponseEntity<?> getAllShop() {
    try {
      return ResponseEntity.status(HttpStatus.OK)
          .body(shopService.getAllShop());
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @GetMapping("/{shopId}")
  @ApiOperation(value = "Get Shop By Id", notes = "Get Shop By Id")
  public ResponseEntity<?> getShopById(@Valid @PathVariable Long shopId) {
    try {
      Optional<Shop> shopOptional = shopService.getShopById(shopId);

      if(shopOptional.isPresent()){
        return ResponseEntity.status(HttpStatus.OK).body(shopOptional.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage(false, "Not found product = " + shopId));
      }
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @PostMapping("/")
  @ApiOperation(value = "Create Shop", notes = "Create Shop")
  public ResponseEntity<?> createShop(
      @Valid @RequestBody CreateShopRequest request) {
    try {
      Shop shop = shopService.createShop(request);
      return ResponseEntity.status(HttpStatus.OK).body(shop);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @PutMapping("/")
  @ApiOperation(value = "Update Shop", notes = "Update Shop")
  public ResponseEntity<?> updateShop(
      @Valid @RequestBody UpdateShopRequest request) {
    try {
      Shop shop = shopService.updateShop(request);
      return ResponseEntity.status(HttpStatus.OK).body(shop);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }

  @DeleteMapping("/{shopId}")
  @ApiOperation(value = "Delete Shop", notes = "Delete Shop")
  public ResponseEntity<?> deleteShop(@Valid @PathVariable Long shopId) {
    try {
      shopService.deleteShopById(shopId);
      return ResponseEntity.status(HttpStatus.OK).body("Delete Success");
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ResponseMessage(false, ex.getMessage()));
    }
  }
}
