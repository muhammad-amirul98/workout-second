package com.workout.service;

import com.workout.exception.ProductException;
import com.workout.model.ecommerce.Product;
import com.workout.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest req);
    void deleteProduct(Long productId) throws ProductException;
    Product updateProduct(Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProducts(String query);
    Page<Product> getAllProducts(
            String category,
            String brand,
            Integer minPrice,
            Integer maxPrice,
            String sort,
            Integer pageNumber,
            Integer pageSize
    );




}
