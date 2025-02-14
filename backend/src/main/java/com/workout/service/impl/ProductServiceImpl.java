package com.workout.service.impl;

import com.workout.exception.ProductException;
import com.workout.model.ecommerce.Category;
import com.workout.model.ecommerce.Product;
import com.workout.repository.CategoryRepository;
import com.workout.repository.ProductRepository;
import com.workout.request.CreateProductRequest;
import com.workout.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(CreateProductRequest req) {
        Category category1 = categoryRepository.findByName(req.getCategory1());
        if (category1 == null) {
            Category category = new Category();
            category.setName(req.getCategory1());
            category1 = categoryRepository.save(category);
        }
        Category category2 = categoryRepository.findByName(req.getCategory2());
        if (category2 == null) {
            Category category = new Category();
            category.setName(req.getCategory2());
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }
        Category category3 = categoryRepository.findByName(req.getCategory3());
        if (category3 == null) {
            Category category = new Category();
            category.setName(req.getCategory3());
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        Product product = new Product();
        product.setCategory(category3);
        product.setName(req.getName());
        product.setDescription(req.getDescription());
        product.setBrand(req.getBrand());
        product.setImages(req.getImages());
        product.setPrice(req.getPrice());
        product.setStock(req.getStock());
        return productRepository.save(product);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(Long productId) throws ProductException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found with ID: " + productId));
        productRepository.delete(product);
        //OR
        productRepository.deleteById(productId);

    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(Long id, Product updatedProduct) throws ProductException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductException("Product not found with id: " + id));

        // Update fields if not null (to avoid overwriting existing data with null)
        if (updatedProduct.getName() != null) {
            existingProduct.setName(updatedProduct.getName());
        }
        if (updatedProduct.getDescription() != null) {
            existingProduct.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getBrand() != null) {
            existingProduct.setBrand(updatedProduct.getBrand());
        }
        if (updatedProduct.getPrice() > 0) {  // Ensure price is not set to zero or negative
            existingProduct.setPrice(updatedProduct.getPrice());
        }
        if (updatedProduct.getStock() >= 0) {  // Stock should not be negative
            existingProduct.setStock(updatedProduct.getStock());
        }
        if (updatedProduct.getImages() != null && !updatedProduct.getImages().isEmpty()) {
            existingProduct.setImages(updatedProduct.getImages());
        }
        if (updatedProduct.getCategory() != null) {
            existingProduct.setCategory(updatedProduct.getCategory());
        }
        if (updatedProduct.getReviews() != null && !updatedProduct.getReviews().isEmpty()) {
            existingProduct.setReviews(updatedProduct.getReviews());
        }

        return productRepository.save(existingProduct);
    }


    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found with ID: " + productId));
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand,
                                        Integer minPrice, Integer maxPrice, String sort, Integer pageNumber,
                                        Integer pageSize) {
        Specification<Product> specification = (root, _, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("name"), category));
            }
            if (brand != null) {
                predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
            }
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Sorting
        Sort sorting = Sort.by("price"); // Default sort by price
        if ("name".equalsIgnoreCase(sort)) {
            sorting = Sort.by("name");
        } else if ("brand".equalsIgnoreCase(sort)) {
            sorting = Sort.by("brand");
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            sorting = Sort.by("price").descending();
        }

        // Pagination
        Pageable pageable = PageRequest.of(pageNumber, pageSize != null ? pageSize : 10, sorting);

        return productRepository.findAll(specification, pageable);
    }

}
