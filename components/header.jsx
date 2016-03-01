import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import FilterIcon from 'material-ui/lib/svg-icons/content/filter-list'
import Filter from './filter.jsx'
import FilterActions from '../actions/filter-actions'

class Header extends React.Component {

  static propTypes = {
    filters: React.PropTypes.object
  };

  state = {
    filterOpen: false
  };

  createUpdateFilters( key, val ) {
    FilterActions.updateParam( key, val )
  }

  showFilter = () => {
    console.log('click')
    this.setState({ filterOpen: true })
  };

  closeFilter = () => {
    this.setState({ filterOpen: false })
  };

  renderFilterActions = () => {
    return [
      <FlatButton
        label='OK'
        onTouchTap={this.closeFilter} />
    ]
  };

  renderFilterButton = () => {
    return (
      <IconButton tooltip='Filter results' tooltipPosition='bottom-left' touch onClick={this.showFilter}>
        <FilterIcon />
      </IconButton>
    )
  };

  render() {
    return (
      <span>
        <AppBar
          title='RaceFinder'
          showMenuIconButton={false}
          iconElementRight={this.renderFilterButton()} />
        <Dialog
          actions={this.renderFilterActions()}
          title='Filter Races'
          modal={false}
          open={this.state.filterOpen}>
          <Filter
            key='filter'
            onChange={this.createUpdateFilters}
            {...this.props.filters} />
        </Dialog>
      </span>
    )
  }

}

export default Header
