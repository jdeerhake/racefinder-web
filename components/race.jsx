import React from 'react'

import  '../styles/race.scss'

class Race extends React.Component {

  static propTypes = {
    name: React.PropTypes.string
  };

  render() {
    return (
      <li className='race'>
        <span className='name'>{ this.props.name }</span>
      </li>
    )
  }

}

export default Race
