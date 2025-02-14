package com.workout.controller;

import com.workout.enums.UserRole;
import com.workout.exception.ProductException;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;
import com.workout.request.CreateProductRequest;
import com.workout.service.ProductService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) throws ProductException {
        Product product = productService.findProductById(productId);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(defaultValue = "name") String sort,  // Default sorting by name
            @RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "10") Integer pageSize  // Default page size
    ) {
        return ResponseEntity.ok(productService.getAllProducts(category, brand, minPrice, maxPrice, sort, pageNumber, pageSize));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        if (!user.getRole().equals(UserRole.ROLE_ADMIN)) {
            throw new UserException("Only admins can create products.");
        }
        Product product = productService.createProduct(req);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) throws ProductException {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,
                                 @RequestBody Product product) throws ProductException {
        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);
    }


}
