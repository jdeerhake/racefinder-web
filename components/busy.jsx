import React from 'react'

import '../styles/busy.scss'

class Busy extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool
  };

  static defaultProps = {
    active: false
  };

  classes() {
    return [
      'busy',
      this.props.active && 'visible'
    ].filter( Boolean ).join( ' ' )
  }

  render() {
    return <div className={this.classes()} />
  }

}

export default Busy