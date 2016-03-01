import React from 'react'
import _ from 'lodash'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import Popover from 'material-ui/lib/popover/popover'
import HelpIcon from 'material-ui/lib/svg-icons/action/help-outline'
import styles from '../lib/styles'

import '../styles/help-button.scss'

class HelpButton extends React.Component {

  state = {
    helpOpen: false
  };

  handleHelpClick = ({ currentTarget }) =>  {
    this.setState({
      helpOpen: !this.state.helpOpen,
      anchorEl: currentTarget
    })
  };

  render() {
    return (
      <div className='help-button'>
        <FloatingActionButton mini
          onMouseDown={ this.handleHelpClick }
          backgroundColor={ styles.color.stylized }>
          <HelpIcon />
        </FloatingActionButton>
        <Popover
          style={{ zIndex: 3001, marginLeft: '10px' }}
          useLayerForClickAway={ false }
          open={ this.state.helpOpen }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
          targetOrigin={{ horizontal: 'left', vertical: 'center' }}>
            <div className='help-content'>
              Please send a message to <a href='mailto:contact@racefinder.me'>contact@racefinder.me</a> for help or other inquiries.
            </div>
        </Popover>
      </div>
    )
  }
}

export default HelpButton