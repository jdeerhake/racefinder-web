import React, { PureComponent, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import { index as searchPlaces } from '../adapters/place'
import debounce from 'es6-promise-debounce'
import colors from '../lib/colors'

import '../styles/place-selector.scss'

const { func, string, bool } = PropTypes

const searchAPI = debounce( searchPlaces, 500 )

export default class PlaceSelector extends PureComponent {

  static propTypes = {
    listOpen: bool,
    onSearchChange: func,
    onSelect: func,
    search: string
  }

  static defaultProps = {
    listOpen: false
  }

  state = {
    results: []
  }

  componentWillReceiveProps({ search }) {
    if( search && search.length > 2 && search !== this.props.search ) {
      searchAPI( search ).then( places => this.setState({ results: places.slice( 0, 5 ) }) )
    }
  }

  renderNameResult = ( place ) => {
    const { search } = this.props
    const match = new RegExp( `(${ search.split( ',' )[0] })`, 'i' )
    const hlName = place.name.replace( match, '<em>$1</em>' )
    return (
      <div dangerouslySetInnerHTML={ { __html: hlName } } />
    )
  }

  renderSearchResult = ( place ) => {
    const { onSelect } = this.props
    return (
      <ListItem key={ place.id }
        onClick={ () => onSelect( place ) }
        primaryText={ this.renderNameResult( place ) }
        secondaryText={ place.stateAbbr } />
    )
  }

  render() {
    const { search, onSearchChange, listOpen } = this.props
    const { results } = this.state
    const textColor = { color: colors[ 'color-neutral' ] }

    return (
      <span className='place-selector'>
        <TextField
            hintText='City, St or ZIP Code'
            hintStyle={ { fontStyle: 'italic', ...textColor } }
            inputStyle={ textColor }
            underlineFocusStyle={ { borderColor: colors[ 'color-active' ] } }
            value={ search }
            onChange={ onSearchChange }
            fullWidth />
        { listOpen &&
          <List className='place-search-list'>
            { results.map( this.renderSearchResult ) }
          </List>
        }
      </span>
    )
  }

}
