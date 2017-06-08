import React, { PureComponent } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Popover from 'material-ui/Popover'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import colors from '../lib/colors'

import '../styles/help-button.scss'

export default class HelpButton extends PureComponent {

  state = {
    helpOpen: false
  };

  handleHelpClick = ({ currentTarget }) =>  {
    this.setState({
      helpOpen: !this.state.helpOpen,
      anchorEl: currentTarget
    })
  };

  closeHelp = () => {
    this.setState({
      helpOpen: false
    })
  };

  render() {
    return (
      <div className='help-button'>
        <FloatingActionButton mini
          onMouseDown={ this.handleHelpClick }
          backgroundColor={ colors.stylized }>
          <HelpIcon />
        </FloatingActionButton>

        <Popover
          className='help-wrapper'
          style={ { zIndex: 3001, marginLeft: '10px' } }
          open={ this.state.helpOpen }
          anchorEl={ this.state.anchorEl }
          onRequestClose={ this.closeHelp }
          anchorOrigin={ { horizontal: 'right', vertical: 'center' } }
          targetOrigin={ { horizontal: 'left', vertical: 'center' } }>

          <div className='help-content'>
            Please send a message to <a href='mailto:contact@racefinder.me'>contact@racefinder.me</a> for help or other inquiries.
          </div>

        </Popover>
      </div>
    )
  }
}
