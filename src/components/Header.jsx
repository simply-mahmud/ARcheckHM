export default function Header() {
  const handleCatalogClick = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="AR Product Showcase home">
        <span className="brand-mark" aria-hidden="true" />
        <span>AR Showcase</span>
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        <button className="nav-link" type="button" onClick={handleCatalogClick}>
          Products
        </button>
        <a className="nav-link" href="https://modelviewer.dev/" target="_blank" rel="noreferrer">
          model-viewer
        </a>
      </nav>
    </header>
  )
}
