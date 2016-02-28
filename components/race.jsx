import React from 'react'

import  '../styles/race.scss'

const { string } = React.PropTypes

class Race extends React.Component {

  static propTypes = {
    description: string,
    name: string
  };

  defaultProps = {
    description: ''
  };

  hasShortDescription = () => {
    return this.props.description && this.props.description.length < 20
  };

  render() {
    const info = [ this.props.name ]
    if( this.hasShortDescription() ) {
      info.push( this.props.description )
    }

    return (
      <li className='race'>
        <span className='name'>{ info.join( ', ' ) }</span>
      </li>
    )
  }

}

export default Race
