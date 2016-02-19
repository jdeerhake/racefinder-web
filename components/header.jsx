import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
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

  render() {
    return (
      <span>
        <AppBar
          title='RaceFinder'
          showMenuIconButton={false}
          iconClassNameRight='icon icon-filter'
          onRightIconButtonTouchTap={this.showFilter} />
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
