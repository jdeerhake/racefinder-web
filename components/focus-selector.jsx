import React, { PureComponent } from 'react'
import { arrayOf, func, string } from 'prop-types'
import cx from 'classnames'

import '../styles/focus-selector.scss'

export default class FocusSelector extends PureComponent {

  static propTypes = {
    activeEventIDs: arrayOf( string ),
    highlightEvent: func,
    highlightedEventID: string
  }

  focusIndex = () => {
    const { activeEventIDs, highlightedEventID } = this.props
    return Math.max( activeEventIDs.indexOf( highlightedEventID ), 0 )
  };

  moveFocus = ( offset ) => {
    const { activeEventIDs, highlightEvent } = this.props
    highlightEvent({ id: activeEventIDs[ this.focusIndex() + offset ] })
  };

  next = () => !this.isLast() && this.moveFocus( +1 );

  prev = () => !this.isFirst() && this.moveFocus( -1 );

  isLast = () => this.focusIndex() + 1 === this.props.activeEventIDs.length;

  isFirst = () => this.focusIndex() === 0;

  render() {
    return (
      <span className='focus-selector'>
        <a className={ cx( 'prev', { enabled: !this.isFirst() }) } onClick={ this.prev }>‹</a>
        <span className='page'>{ this.focusIndex() + 1 } / { this.props.activeEventIDs.length }</span>
        <a className={ cx( 'next', { enabled: !this.isLast() }) } onClick={ this.next }>›</a>
      </span>
    )
  }
}
