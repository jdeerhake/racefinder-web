import React, { PureComponent } from 'react'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import FilterDialog from './filter-dialog.jsx'

const { object, func } = React.PropTypes

class Header extends PureComponent {

  static propTypes = {
    filter: object,
    onFilterChange: func,
    onTitleClick: func
  };

  state = {
    filterOpen: false
  };

  showFilter = () => {
    this.setState({ filterOpen: true })
  };

  closeFilter = () => {
    this.setState({ filterOpen: false })
  };

  renderFilterActions = () => {
    return [
      <FlatButton
        key={ 0 }
        label='OK'
        onTouchTap={ this.closeFilter } />
    ]
  };

  renderFilterButton = () => {
    return (
      <IconButton tooltip='Filter results' tooltipPosition='bottom-left' touch onClick={ this.showFilter }>
        <FilterIcon />
      </IconButton>
    )
  };

  render() {
    const { filter: { options, selected }, onFilterChange, onTitleClick } = this.props

    return (
      <span>
        <AppBar
          title='RaceFinder'
          onTitleTouchTap={ onTitleClick }
          showMenuIconButton={ false }
          iconElementRight={ this.renderFilterButton() } />
        <Dialog
          actions={ this.renderFilterActions() }
          title='Filter Races'
          modal={ false }
          open={ this.state.filterOpen }>
          <FilterDialog
            onChange={ onFilterChange }
            options={ options }
            selected={ selected } />
        </Dialog>
      </span>
    )
  }

}

export default Header
