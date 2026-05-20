import { useEffect, useState } from 'react'
import ProductGrid from './components/ProductGrid.jsx'
import ProductViewer from './components/ProductViewer.jsx'
import { products } from './data/products.js'

export default function App() {
  const [viewerState, setViewerState] = useState({ product: null, mode: '3d' })
  const [arSupport, setArSupport] = useState({ status: 'checking', label: 'Checking AR support...' })

  const openViewer = (product, mode) => {
    setViewerState({ product, mode })
  }

  useEffect(() => {
    let isMounted = true

    const checkArSupport = async () => {
      if (!('xr' in navigator) || !navigator.xr?.isSessionSupported) {
        if (isMounted) {
          setArSupport({
            status: 'unknown',
            label: 'AR support could not be confirmed on this browser.',
          })
        }
        return
      }

      try {
        const supported = await navigator.xr.isSessionSupported('immersive-ar')

        if (isMounted) {
          setArSupport({
            status: supported ? 'supported' : 'unsupported',
            label: supported ? 'AR is supported on this device.' : 'AR is not supported on this device.',
          })
        }
      } catch {
        if (isMounted) {
          setArSupport({
            status: 'unknown',
            label: 'AR support could not be confirmed on this browser.',
          })
        }
      }
    }

    checkArSupport()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="app-shell">
      <main className="page">
        <section className="page-intro" aria-labelledby="page-title">
          <p className="eyebrow">Interactive model preview</p>
          <h1 id="page-title">Test AR & 3D Experiences</h1>
          <p>Choose a model below to preview it in 3D or launch it in AR on a supported device.</p>
          <div className={`support-check support-${arSupport.status}`} role="status">
            <span className="support-dot" aria-hidden="true" />
            <span>{arSupport.label}</span>
          </div>
          <p className="developer-credit">Developed with ❤️ by Mahmud</p>
        </section>

        <ProductGrid products={products} onOpenViewer={openViewer} />
      </main>
      <ProductViewer
        mode={viewerState.mode}
        product={viewerState.product}
        onClose={() => setViewerState({ product: null, mode: '3d' })}
      />
    </div>
  )
}
