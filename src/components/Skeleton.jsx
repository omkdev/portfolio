import PropTypes from 'prop-types'

export default function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer ${className}`}
    />
  )
}

Skeleton.propTypes = {
  className: PropTypes.string,
}
