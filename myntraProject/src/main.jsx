import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Heart,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  User,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = ['Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Studio'];

const categories = [
  {
    name: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    offer: 'Min. 45% off',
  },
  {
    name: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    offer: 'Fresh drops',
  },
  {
    name: 'Ethnic Edit',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    offer: 'Festive styles',
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    offer: 'Up to 60% off',
  },
  {
    name: 'Home Finds',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    offer: 'New arrivals',
  },
];

const products = [
  {
    id: 1,
    brand: 'Roadster',
    title: 'Relaxed denim jacket',
    price: 1299,
    original: 2899,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    tag: 'Bestseller',
  },
  {
    id: 2,
    brand: 'Anouk',
    title: 'Printed kurta set',
    price: 1799,
    original: 3499,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=900&q=80',
    tag: 'Only few left',
  },
  {
    id: 3,
    brand: 'HRX',
    title: 'Training shoes',
    price: 2199,
    original: 4999,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    tag: 'Hot deal',
  },
  {
    id: 4,
    brand: 'Mast & Harbour',
    title: 'Linen resort shirt',
    price: 899,
    original: 1999,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    tag: 'Trending',
  },
  {
    id: 5,
    brand: 'DressBerry',
    title: 'Satin party dress',
    price: 1499,
    original: 3299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80',
    tag: 'New season',
  },
  {
    id: 6,
    brand: 'H&M',
    title: 'Cotton cargo trousers',
    price: 1699,
    original: 2999,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=900&q=80',
    tag: 'Style steal',
  },
  {
    id: 7,
    brand: 'Maybelline',
    title: 'Everyday makeup kit',
    price: 1199,
    original: 2499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    tag: 'Top rated',
  },
  {
    id: 8,
    brand: 'Home Centre',
    title: 'Textured cushion set',
    price: 799,
    original: 1599,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80',
    tag: 'Cozy pick',
  },
];

const filters = ['All', 'Men', 'Women', 'Beauty', 'Home'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [bag, setBag] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState('');

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch = `${product.brand} ${product.title}`.toLowerCase().includes(query.toLowerCase());
      if (activeFilter === 'All') return searchMatch;
      if (activeFilter === 'Men') return ['Roadster', 'HRX', 'Mast & Harbour', 'H&M'].includes(product.brand) && searchMatch;
      if (activeFilter === 'Women') return ['Anouk', 'DressBerry'].includes(product.brand) && searchMatch;
      return product.brand === activeFilter || product.title.toLowerCase().includes(activeFilter.toLowerCase());
    });
  }, [activeFilter, query]);

  const toggleBag = (id) => {
    setBag((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  };

  const toggleWishlist = (id) => {
    setWishlist((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  };

  return (
    <main>
      <header className="topbar">
        <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>
        <a className="logo" href="#top" aria-label="Myntra clone home">
          <span>M</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href="#products">
              {item}
            </a>
          ))}
        </nav>
        <label className="searchbox">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for products, brands and more"
            aria-label="Search products"
          />
        </label>
        <div className="actions">
          <button className="action-btn" aria-label="Profile">
            <User size={19} />
            <span>Profile</span>
          </button>
          <button className="action-btn" aria-label={`${wishlist.length} wishlist items`}>
            <Heart size={19} />
            <span>Wishlist</span>
            {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </button>
          <button className="action-btn" aria-label={`${bag.length} bag items`}>
            <ShoppingBag size={19} />
            <span>Bag</span>
            {bag.length > 0 && <b>{bag.length}</b>}
          </button>
        </div>
      </header>

      {menuOpen && (
        <aside className="drawer" aria-label="Mobile menu">
          <div>
            <a className="logo" href="#top" onClick={() => setMenuOpen(false)}>
              <span>M</span>
            </a>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>
          {navItems.map((item) => (
            <a key={item} href="#products" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </aside>
      )}

      <section id="top" className="hero">
        <div className="hero-copy">
          <p>End of season sale</p>
          <h1>Big fashion energy, sharper prices.</h1>
          <div className="hero-actions">
            <a className="primary-link" href="#products">
              Shop now
            </a>
            <span>50-80% off across top brands</span>
          </div>
        </div>
        <div className="hero-strip" aria-label="Featured fashion collage">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" alt="Fashion shopper" />
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" alt="Model in summer outfit" />
          <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80" alt="Casual outfit" />
        </div>
      </section>

      <section className="service-band" aria-label="Shopping benefits">
        <span>
          <PackageCheck size={19} /> Easy returns
        </span>
        <span>Free shipping above Rs. 799</span>
        <span>Extra 10% off on prepaid orders</span>
      </section>

      <section className="category-section" aria-labelledby="category-heading">
        <div className="section-heading">
          <p>Shop by vibe</p>
          <h2 id="category-heading">Category picks</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.name}>
              <img src={category.image} alt={category.name} />
              <div>
                <h3>{category.name}</h3>
                <p>{category.offer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="products-section" aria-labelledby="product-heading">
        <div className="section-heading product-heading">
          <div>
            <p>Curated for you</p>
            <h2 id="product-heading">Latest deals</h2>
          </div>
          <div className="filter-wrap" aria-label="Product filters">
            <SlidersHorizontal size={18} />
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => {
            const discount = Math.round(((product.original - product.price) / product.original) * 100);
            const inBag = bag.includes(product.id);
            const liked = wishlist.includes(product.id);
            return (
              <article className="product-card" key={product.id}>
                <div className="product-media">
                  <img src={product.image} alt={`${product.brand} ${product.title}`} />
                  <button
                    className={liked ? 'heart liked' : 'heart'}
                    aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                  </button>
                  <span>{product.tag}</span>
                </div>
                <div className="product-info">
                  <div className="rating">
                    <Star size={15} fill="currentColor" />
                    {product.rating}
                  </div>
                  <h3>{product.brand}</h3>
                  <p>{product.title}</p>
                  <div className="price-line">
                    <strong>Rs. {product.price}</strong>
                    <s>Rs. {product.original}</s>
                    <em>{discount}% off</em>
                  </div>
                  <button className={inBag ? 'bag-btn added' : 'bag-btn'} onClick={() => toggleBag(product.id)}>
                    {inBag ? 'Added to bag' : 'Add to bag'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {visibleProducts.length === 0 && (
          <div className="empty-state">
            <h3>No matches found</h3>
            <p>Try another search or filter.</p>
          </div>
        )}
      </section>

      <footer>
        <strong>Myntra Clone</strong>
        <span>Made with React, HTML, CSS and JavaScript.</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
