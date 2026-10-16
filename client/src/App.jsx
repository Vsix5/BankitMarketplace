import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 2499, seller: "Sound House", emoji: "🎧" },
  { id: 2, name: "Everyday Backpack", category: "Fashion", price: 1299, seller: "Urban Store", emoji: "🎒" },
  { id: 3, name: "Ceramic Coffee Mug", category: "Home & Living", price: 399, seller: "Clay Corner", emoji: "☕" },
  { id: 4, name: "Desk Lamp", category: "Home & Living", price: 899, seller: "Bright Living", emoji: "💡" },
  { id: 5, name: "Notebook Set", category: "Books", price: 299, seller: "Paper Studio", emoji: "📚" },
  { id: 6, name: "Sports Water Bottle", category: "Sports", price: 599, seller: "Active Gear", emoji: "🥤" },
  { id: 7, name: "Smart Watch", category: "Electronics", price: 3499, seller: "Tech World", emoji: "⌚" },
  { id: 8, name: "Casual Sneakers", category: "Fashion", price: 1999, seller: "Street Style", emoji: "👟" },
];

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Books", "Sports"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.seller} ${product.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="/">bankit<span>.</span></a>

        <form className="search" onSubmit={(event) => event.preventDefault()}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products and stores..."
            aria-label="Search products and stores"
          />
          <button type="submit">Search</button>
        </form>

        <nav className="nav">
          <a href="#products">Explore</a>
          <a href="#categories">Categories</a>
          <a href="/signin">Sign in</a>
          <a className="cart-link" href="#cart">
            Cart <span>{cart.length}</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">ONE MARKETPLACE. MANY STORES.</p>
            <h1>Discover something <span>you'll love.</span></h1>
            <p>
              Explore products from independent sellers and discover
              stores worth coming back to.
            </p>
            <a className="primary-button" href="#products">
              Explore products →
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span>🛍️</span>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR STYLE</p>
              <h2>Shop by category</h2>
            </div>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section id="products" className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE MARKETPLACE</p>
              <h2>Explore products</h2>
            </div>
            <span className="result-count">
              {filteredProducts.length} products
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <span>{product.emoji}</span>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-details">
                    <p className="seller-name">Sold by {product.seller}</p>
                    <h3>{product.name}</h3>
                    <div className="product-footer">
                      <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section id="cart" className="cart-summary">
          <div>
            <p className="eyebrow">YOUR SHOPPING CART</p>
            <h2>{cart.length} item{cart.length === 1 ? "" : "s"} added</h2>
          </div>
          <strong>
            ₹{cart.reduce((total, item) => total + item.price, 0).toLocaleString("en-IN")}
          </strong>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="/">bankit<span>.</span></a>
        <p>Discover stores. Find your next favourite.</p>
        <span>© {new Date().getFullYear()} Bankit Marketplace</span>
      </footer>
    </div>
  );
}

export default App;