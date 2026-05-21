import { useEffect, useRef, useState } from 'react'

export default function ProductCard({ product, onOpenViewer }) {
  const thumbnailRef = useRef(null)
  const [thumbnailState, setThumbnailState] = useState('loading')

  useEffect(() => {
    setThumbnailState('loading')
  }, [product.modelPath])

  useEffect(() => {
    const thumbnail = thumbnailRef.current
    if (!thumbnail) return undefined

    const handleLoad = () => setThumbnailState('loaded')
    const handleError = () => setThumbnailState('error')

    thumbnail.addEventListener('load', handleLoad)
    thumbnail.addEventListener('error', handleError)

    return () => {
      thumbnail.removeEventListener('load', handleLoad)
      thumbnail.removeEventListener('error', handleError)
    }
  }, [product.modelPath])

  return (
    <article className="model-card">
      <div className="model-preview">
        {thumbnailState === 'loading' ? (
          <div className="thumbnail-status" role="status">
            Loading preview...
          </div>
        ) : null}

        {thumbnailState === 'error' ? (
          <div className="thumbnail-status thumbnail-error" role="status">
            Preview unavailable
          </div>
        ) : null}

        <model-viewer
          ref={thumbnailRef}
          class="model-thumbnail"
          src={product.modelPath}
          alt={`${product.name} thumbnail`}
          camera-controls
          auto-rotate
          interaction-prompt="none"
          shadow-intensity="0.75"
          exposure="1"
          environment-image="neutral"
          reveal="auto"
        />
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
