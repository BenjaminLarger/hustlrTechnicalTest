import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCatalog = () => {
  const dispatch = useDispatch();
  
  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      category: "electronics",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Men's Casual Cotton T-Shirt",
      price: 24.99,
      category: "men's clothing",
      description: "Comfortable 100% cotton t-shirt with modern fit. Available in multiple colors and perfect for everyday wear.",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Women's Summer Floral Dress",
      price: 59.99,
      category: "women's clothing",
      description: "Elegant floral print dress made from breathable fabric. Perfect for summer occasions and casual outings.",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Smart Fitness Watch",
      price: 199.99,
      category: "electronics",
      description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Water resistant up to 50m.",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },
    {
      id: 5,
      title: "Sterling Silver Pendant Necklace",
      price: 89.99,
      category: "jewelery",
      description: "Elegant sterling silver necklace with cubic zirconia pendant. Comes with beautiful gift packaging.",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"
    },
    {
      id: 6,
      title: "Men's Leather Jacket",
      price: 149.99,
      category: "men's clothing",
      description: "Premium genuine leather jacket with classic biker style. Durable construction and timeless design.",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
    },
    {
      id: 7,
      title: "Wireless Charging Pad",
      price: 29.99,
      category: "electronics",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices. LED indicator and non-slip surface.",
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"
    },
    {
      id: 8,
      title: "Women's Athletic Sneakers",
      price: 89.99,
      category: "women's clothing",
      description: "Comfortable running shoes with breathable mesh upper and cushioned sole. Perfect for workouts and daily wear.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
    },
    {
      id: 9,
      title: "Gold-Plated Watch",
      price: 299.99,
      category: "jewelery",
      description: "Luxury gold-plated watch with Japanese quartz movement. Stainless steel case and premium leather strap.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
    },
    {
      id: 10,
      title: "Professional Camera Lens",
      price: 399.99,
      category: "electronics",
      description: "High-performance 50mm f/1.8 lens for DSLR cameras. Perfect for portraits and low-light photography.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop"
    },
    {
      id: 11,
      title: "Men's Formal Dress Shirt",
      price: 49.99,
      category: "men's clothing",
      description: "Classic white dress shirt with French cuffs. Made from premium cotton blend for comfort and durability.",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop"
    },
    {
      id: 12,
      title: "Diamond Stud Earrings",
      price: 199.99,
      category: "jewelery",
      description: "Brilliant cut diamond earrings set in 14k white gold. Perfect for special occasions or everyday elegance.",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop"
    }
  ];

  const [products] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProducts = (category, price, search) => {
    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter(product => product.category === category);
    }

    if (price !== "all") {
      switch (price) {
        case "under-50":
          filtered = filtered.filter(product => product.price < 50);
          break;
        case "50-100":
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case "100-200":
          filtered = filtered.filter(product => product.price > 100 && product.price <= 200);
          break;
        case "over-200":
          filtered = filtered.filter(product => product.price > 200);
          break;
        default:
          break;
      }
    }

    if (search) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterProducts(category, priceRange, searchTerm);
  };

  const handlePriceFilter = (price) => {
    setPriceRange(price);
    filterProducts(selectedCategory, price, searchTerm);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    filterProducts(selectedCategory, priceRange, search);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">☆</span>);
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-muted">☆</span>);
    }
    return stars;
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Product Catalog</h2>
          <hr />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-4 mb-3">
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <select 
            className="form-select"
            value={priceRange}
            onChange={(e) => handlePriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="under-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="over-200">Over $200</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <p className="text-muted">Showing {filteredProducts.length} of {products.length} products</p>
        </div>
      </div>

      <div className="row justify-content-center">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4>No products found</h4>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.length > 25 ? `${product.title.substring(0, 25)}...` : product.title}
                  </h5>
                  <p className="card-text text-muted small">
                    {product.description.length > 90 ? `${product.description.substring(0, 90)}...` : product.description}
                  </p>
                  <div className="mb-2">
                    {renderStars(product.rating)}
                    <span className="text-muted ms-2">({product.rating})</span>
                  </div>
                  <span className="badge bg-secondary mb-2">{product.category}</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead fw-bold text-primary">${product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark m-1"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;