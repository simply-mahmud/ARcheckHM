export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">No-backend 3D commerce demo</p>
        <h1 id="hero-title">AR Product Showcase</h1>
        <p className="hero-subtitle">
          Preview products in interactive 3D, then view them in your real environment with
          mobile AR on supported devices.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={scrollToProducts}>
            Browse products
          </button>
          <span className="hero-note">
            AR works on supported Android/iOS devices. 3D preview works on desktop and mobile.
          </span>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="showcase-stage">
          <div className="product-plinth">
            <span className="cube cube-large" />
            <span className="cube cube-medium" />
            <span className="cube cube-small" />
          </div>
          <div className="scan-ring" />
        </div>
      </div>
    </section>
  )
}
