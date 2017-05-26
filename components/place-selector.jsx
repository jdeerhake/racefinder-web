import React, { PureComponent, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import { index as searchPlaces } from '../adapters/place'
import cx from 'classnames'
import debounce from 'es6-promise-debounce'
import colors from '../lib/colors'

import '../styles/place-selector.scss'

const { func } = PropTypes

const searchAPI = debounce( searchPlaces, 500 )
const MIN_QUERY_SIZE = 3

export default class PlaceSelector extends PureComponent {

  static propTypes = {
    onSelect: func
  }

  state = {
    results: [],
    listOpen: false,
    query: '',
    noResultsMessage: false
  }

  receiveResults = ( places ) => {
    this.setState({
      results: places.slice( 0, 5 ),
      searchRequest: false,
      noResultsMessage: places.length === 0
    })
  }

  handleSearchChange = ({ target: { value } }) => {
    const stateChange = {
      query: value,
      listOpen: true,
      results: []
    }

    if( value.length >= MIN_QUERY_SIZE ) {
      stateChange.searchRequest = searchAPI( value ).then( this.receiveResults )
    }

    this.setState( stateChange )
  }

  handleListClick = ( place ) => {
    this.props.onSelect( place )

    this.setState({
      listOpen: false,
      query: `${ place.name }, ${ place.stateAbbr }`
    })
  }

  handleOutsideClick = () => {
    this.setState({ listOpen: false })
  }

  handleFocus = () => {
    this.setState({ listOpen: true })
  }

  handleBlur = () => {
    this.setState({ listOpen: false })
  }

  closeNoResultsMessage = () => {
    this.setState({ noResultsMessage: false })
  }

  renderNameResult = ( place ) => {
    const { query } = this.state
    const match = new RegExp( `(${ query.split( ',' )[0] })`, 'i' )
    const hlName = place.name.replace( match, '<em>$1</em>' )
    return (
      <div dangerouslySetInnerHTML={ { __html: hlName } } />
    )
  }

  renderSearchResult = ( place ) => {
    return (
      <ListItem key={ place.id }
        onMouseDown={ () => this.handleListClick( place ) }
        primaryText={ this.renderNameResult( place ) }
        secondaryText={ place.stateAbbr } />
    )
  }

  renderSearchingItem = () => {
    const searching = (
      <div className='searching-message'>
        <CircularProgress size={ 25 } thickness={ 3 } className='progress' />
        { ' Searching...' }
      </div>
    )

    return (
      <ListItem key='searching' primaryText={ searching } />
    )
  };

  renderMoreCharacters = () => {
    return (
      <ListItem key='more' primaryText={ `Please enter at least ${ MIN_QUERY_SIZE } characters to search` } />
    )
  };

  renderNoneFound = () => {
    return (
      <ListItem key='none' primaryText='No results found.' />
    )
  };

  render() {
    const { results, query, searchRequest, listOpen, noResultsMessage } = this.state
    const textColor = { color: colors[ 'color-neutral' ] }

    return (
      <span className={ cx( 'place-selector', { 'is-searching': listOpen }) }>
        <TextField
            hintText='City, St or ZIP Code'
            hintStyle={ { fontStyle: 'italic', ...textColor } }
            inputStyle={ textColor }
            underlineFocusStyle={ { borderColor: colors[ 'color-active' ] } }
            value={ query }
            onBlur={ this.handleBlur }
            onFocus={ this.handleFocus }
            onChange={ this.handleSearchChange }
            fullWidth />
        { listOpen && <div className='overlay' /> }
        { listOpen && (
          <List className='place-search-list'>
            { !searchRequest && results.map( this.renderSearchResult ) }
            { searchRequest && this.renderSearchingItem() }
            { query.length < MIN_QUERY_SIZE && this.renderMoreCharacters() }
            { !searchRequest && !results.length && query.length >= MIN_QUERY_SIZE && this.renderNoneFound() }
          </List>
          )
        }
        <Snackbar
          open={ noResultsMessage }
          message='No places found for this query'
          autoHideDuration={ 4000 }
          onRequestClose={ this.closeNoResultsMessage } />
      </span>
    )
  }

}