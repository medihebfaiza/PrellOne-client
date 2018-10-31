import React from 'react';
import PropTypes from  'prop-types'

const Member = ({id, userName, photo}) => (
  <img src={photo} alt={userName} className={"img-fluid rounded-circle"}/>
)

Member.propTypes={
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
}
export default Member