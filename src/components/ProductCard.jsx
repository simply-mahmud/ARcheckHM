export default function ProductCard({ product, onOpenViewer }) {
  return (
    <article className="model-card">
      <div className="model-preview" aria-hidden="true">
        <span className="model-icon">3D</span>
      </div>

      <div className="model-copy">
        <span className="model-category">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>

      <div className="model-actions" aria-label={`${product.name} viewer actions`}>
        <button className="button button-secondary" type="button" onClick={() => onOpenViewer(product, '3d')}>
          3D Viewer
        </button>
        <button className="button button-primary" type="button" onClick={() => onOpenViewer(product, 'ar')}>
          AR Viewer
        </button>
      </div>
    </article>
  )
}
