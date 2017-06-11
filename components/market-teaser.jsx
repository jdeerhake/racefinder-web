import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import { validate as validMarket } from '../adapters/market'
import { validate as validFilterPreset, index as getFilterPresets } from '../adapters/filter-preset'

import '../styles/market-teaser.scss'

const { arrayOf } = PropTypes

export default class MetaInfo extends PureComponent {

  static propTypes = {
    filterPresets: arrayOf( validFilterPreset ),
    market: validMarket
  }

  static defaultProps = {
    filterPresets: getFilterPresets()
  }

  renderLink = ( filterPreset ) => {
    const { market } = this.props

    return (
      <li key={ filterPreset.id }>
        <Link to={ `/map/${ market.slug }/${ filterPreset.slug }` }>
          { filterPreset.name } in <em>{ market.name }</em>
        </Link>
      </li>
    )
  }

  render() {
    const { filterPresets, market } = this.props

    return (
      <li className='market-teaser'>
        <h2>More in { market.name }</h2>
        <ul>
          { filterPresets.map( this.renderLink ) }
        </ul>
      </li>
    )
  }

}
