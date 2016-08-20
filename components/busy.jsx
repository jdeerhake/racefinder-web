import React from 'react'

import '../styles/busy.scss'

const { bool } = React.PropTypes

class Busy extends React.Component {

  static propTypes = {
    active: bool
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
