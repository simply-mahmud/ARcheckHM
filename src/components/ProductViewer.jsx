import { useEffect, useRef, useState } from 'react'

export default function ProductViewer({ product, mode = '3d', onClose }) {
  const modalRef = useRef(null)
  const viewerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setIsFullscreen(false)
  }, [product])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return undefined

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)
    }
    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    viewer.addEventListener('load', handleLoad)
    viewer.addEventListener('error', handleError)

    return () => {
      viewer.removeEventListener('load', handleLoad)
      viewer.removeEventListener('error', handleError)
    }
  }, [product])

  if (!product) return null

  const toggleFullscreen = () => {
    const modal = modalRef.current
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement) {
      setIsFullscreen(false)

      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => setIsFullscreen(true))
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }

      return
    }

    setIsFullscreen(true)

    if (modal?.requestFullscreen) {
      modal.requestFullscreen().catch(() => setIsFullscreen(true))
    } else if (modal?.webkitRequestFullscreen) {
      modal.webkitRequestFullscreen()
    }
  }

  return (
    <div className="viewer-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={modalRef}
        className={`viewer-modal ${isFullscreen ? 'viewer-modal-fullscreen' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="viewer-header">
          <div>
            <p className="eyebrow">{mode === 'ar' ? 'AR viewer' : '3D viewer'}</p>
            <h2 id="viewer-title">{product.name}</h2>
          </div>
          <div className="viewer-actions">
            <button className="viewer-action-button" type="button" onClick={toggleFullscreen}>
              {isFullscreen ? 'Exit full screen' : 'Full screen'}
            </button>
            <button className="icon-button" type="button" onClick={onClose} aria-label="Close viewer">
              x
            </button>
          </div>
        </div>

        <div className="viewer-layout">
          <div className="model-frame">
            {isLoading && !hasError ? (
              <div className="model-loading" role="status">
                Loading 3D preview...
              </div>
            ) : null}

            {hasError ? (
              <div className="model-error" role="status">
                <h3>Model preview unavailable</h3>
                <p>
                  Check that the GLB file exists at <code>{product.modelPath}</code>.
                </p>
              </div>
            ) : null}

            <model-viewer
              ref={viewerRef}
              src={product.modelPath}
              alt={`${product.name} 3D model`}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              exposure="1"
              environment-image="neutral"
              reveal="auto"
            >
              <button className="ar-button" slot="ar-button" type="button">
                Start AR
              </button>
            </model-viewer>
          </div>

          {mode === 'ar' ? (
            <p className="viewer-note">Use the Start AR button inside the viewer on a supported mobile device.</p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
