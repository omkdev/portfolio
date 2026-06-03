import PropTypes from 'prop-types'

export const architectureBranchPropType = PropTypes.shape({
  label: PropTypes.string,
  path: PropTypes.arrayOf(PropTypes.string),
})

export const architecturePropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.shape({
    trunk: PropTypes.arrayOf(PropTypes.string).isRequired,
    branches: PropTypes.arrayOf(architectureBranchPropType).isRequired,
  }),
])

export const projectLinksPropType = PropTypes.shape({
  github: PropTypes.string,
  live: PropTypes.string,
})

export const projectPropType = PropTypes.shape({
  id: PropTypes.string,
  featured: PropTypes.bool,
  shortName: PropTypes.string.isRequired,
  headerLabel: PropTypes.string.isRequired,
  headerIcon: PropTypes.string,
  title: PropTypes.string.isRequired,
  period: PropTypes.string,
  badge: PropTypes.string,
  problem: PropTypes.string.isRequired,
  built: PropTypes.string.isRequired,
  impact: PropTypes.string.isRequired,
  architecture: architecturePropType,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: projectLinksPropType.isRequired,
  image: PropTypes.string,
  headerAccent: PropTypes.string,
})
