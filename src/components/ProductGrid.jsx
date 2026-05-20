import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onOpenViewer }) {
  return (
    <section className="model-grid" aria-label="Available models">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpenViewer={onOpenViewer} />
      ))}
    </section>
  )
}
