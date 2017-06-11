import React, { PureComponent } from 'react'
import { arrayOf } from 'prop-types'
import cx from 'classnames'
import { validate as validMarket } from '../adapters/market'
import { validate as validFilterPreset } from '../adapters/filter-preset'
import { Link } from 'react-router'

import '../styles/search-links.scss'

export default class Event extends PureComponent {

  static propTypes = {
    filterPreset: validFilterPreset,
    markets: arrayOf( validMarket )
  }

  state = {
    showMore: false
  }

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  renderLink = ( market ) => {
    const { filterPreset } = this.props
    return (
      <li key={ market.id }>
        <Link to={ `/map/${ market.slug }/${ filterPreset.slug }` }>
          { filterPreset.name } in <em>{ market.name }</em>
        </Link>
      </li>
    )
  }

  render() {
    const { filterPreset, markets } = this.props
    const { showMore } = this.state

    return (
      <div className='search-links'>
        <h4>{ filterPreset.name }</h4>
        <div className={  cx( 'overflow-container', { 'with-more': showMore }) }>
          <ul>
            { markets.map( this.renderLink ) }
          </ul>
        </div>
        <a className='show-more' onClick={ this.toggleShowMore }>
          Show { showMore ? 'fewer' : 'more...' }
        </a>
      </div>
    )
  }
}
