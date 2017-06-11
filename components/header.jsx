import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import FilterDialog from './filter-dialog.jsx'
import { validate as validFilter } from '../adapters/filter'

class Header extends PureComponent {

  static propTypes = {
    onFilterChange: func,
    selectedFilter: validFilter
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
    const { selectedFilter, onFilterChange } = this.props

    return (
      <span>
        <AppBar
          title={ <Link className='title-link' to='/'>RaceFinder</Link> }
          showMenuIconButton={ false }
          iconElementRight={ this.renderFilterButton() } />
        <Dialog
          actions={ this.renderFilterActions() }
          title='Filter Races'
          modal={ false }
          open={ this.state.filterOpen }>
          <FilterDialog
            onChange={ onFilterChange }
            selected={ selectedFilter } />
        </Dialog>
      </span>
    )
  }

}

export default Header
