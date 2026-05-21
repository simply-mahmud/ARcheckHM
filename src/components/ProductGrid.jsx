import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onOpenViewer }) {
  return (
    <section className="model-section" aria-labelledby="model-section-title">
      <div className="model-section-header">
        <p className="eyebrow">Model library</p>
        <h2 id="model-section-title">Available 3D Models</h2>
      </div>

      <div className="model-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onOpenViewer={onOpenViewer} />
        ))}
      </div>
    </section>
  )
}
