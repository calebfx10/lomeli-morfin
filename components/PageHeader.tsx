import Link from 'next/link'

interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
  breadcrumb: string
}

export default function PageHeader({ label, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        {/* Breadcrumb */}
        <nav className="page-breadcrumb">
          <Link href="/" className="breadcrumb-link">Inicio</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{breadcrumb}</span>
        </nav>

        {/* Label */}
        <p className="page-header-label">{label}</p>

        {/* Title */}
        <h1 className="page-header-h1">{title}</h1>

        {/* Subtitle */}
        {subtitle && <p className="page-header-sub">{subtitle}</p>}
      </div>

      {/* Gold bottom line */}
      <div className="page-header-line" />
    </header>
  )
}
