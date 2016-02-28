import _ from 'lodash'
import React from 'react'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FilterOptionsStore from '../stores/filter-options-store'

import '../styles/filter.scss'

let controlStyles = {
  width: '100%',
  textAlign: 'left'
}

function addIndexAsPayload( val, i ) {
  return _.extend( val, { payload: i })
}

function getStateFromStore() {
  return _.mapValues( FilterOptionsStore.getAll(), opts => opts.map( addIndexAsPayload ) )
}

class Filter extends React.Component {

  static propTypes = {
    dateRange: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    query: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  };

  constructor( props ) {
    super( props )
    this.state = getStateFromStore()
  }

  createQueryChange = ( ev ) => {
    this.props.onChange( 'query', ev.target.value )
  };

  createRaceTypeChange = ( ev, index ) => {
    this.props.onChange( 'type', this.state.types[index].val )
  };

  createDateRangeChange = ( ev, index ) => {
    this.props.onChange( 'dateRange', this.state.dateRanges[index].val )
  };

  searchField = () => {
    return (
      <TextField
        hintText='Search'
        value={this.props.query}
        onChange={this.createQueryChange}
        style={{ width: 'auto', margin: '0 24px', display: 'block' }} />
    )
  };

  raceTypeSelector = () => {
    const items = this.state.types.map(opt => <MenuItem key={opt.val} value={opt.val} primaryText={opt.text} />)

    return (
      <DropDownMenu
        value={this.props.type}
        onChange={this.createRaceTypeChange}
        style={controlStyles} >
        {items}
      </DropDownMenu>
    )
  };

  dateSelector = () => {
    const items = this.state.dateRanges.map(opt => <MenuItem key={opt.val} value={opt.val} primaryText={opt.text} />)

    return (
      <DropDownMenu
        value={this.props.dateRange}
        onChange={this.createDateRangeChange}
        style={controlStyles}>
        {items}
      </DropDownMenu>
    )
  };

  render() {
    return (
      <div className='filter'>
        <fieldset>
          {this.raceTypeSelector()}
        </fieldset>
        <fieldset>
          {this.dateSelector()}
        </fieldset>
        <fieldset>
          {this.searchField()}
        </fieldset>
      </div>
    )
  }

}

export default Filter
