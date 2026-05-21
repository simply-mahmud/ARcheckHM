import { useEffect, useState } from 'react'
import ProductGrid from './components/ProductGrid.jsx'
import ProductViewer from './components/ProductViewer.jsx'
import { products } from './data/products.js'

export default function App() {
  const [viewerState, setViewerState] = useState({ product: null, mode: '3d' })
  const [arSupport, setArSupport] = useState({ status: 'idle', label: 'Check AR support on this device.' })

  const openViewer = (product, mode) => {
    setViewerState({ product, mode })
  }

  const checkArSupport = async () => {
    setArSupport({ status: 'checking', label: 'Checking AR support...' })

    if (!('xr' in navigator) || !navigator.xr?.isSessionSupported) {
      setArSupport({
        status: 'unsupported',
        label: 'AR is not supported on this device.',
      })
      return
    }

    try {
      const supported = await navigator.xr.isSessionSupported('immersive-ar')

      setArSupport({
        status: supported ? 'supported' : 'unsupported',
        label: supported ? 'AR is supported on this device.' : 'AR is not supported on this device.',
      })
    } catch {
      setArSupport({
        status: 'unsupported',
        label: 'AR is not supported on this device.',
      })
    }
  }

  useEffect(() => {
    let isMounted = true

    const runInitialCheck = async () => {
      setArSupport({ status: 'checking', label: 'Checking AR support...' })

      if (!('xr' in navigator) || !navigator.xr?.isSessionSupported) {
        if (isMounted) {
          setArSupport({
            status: 'unsupported',
            label: 'AR is not supported on this device.',
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
            status: 'unsupported',
            label: 'AR is not supported on this device.',
          })
        }
      }
    }

    runInitialCheck()

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
            <button className="support-button" type="button" onClick={checkArSupport}>
              Check AR
            </button>
          </div>
          <p className="developer-credit">Developed by Mahmud</p>
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
