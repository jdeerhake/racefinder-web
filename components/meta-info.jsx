import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { validate as validFilterPreset, index as getFilterPresets } from '../adapters/filter-preset'
import { validate as validMarket } from '../adapters/market'

const DEFAULT_TITLE = 'RaceFinder - The search engine for marathons, triathlons, 5Ks, century rides, and more'
const DEFAULT_DESC = 'RaceFinder is the search engine for marathons, triathlons, 5Ks, 10Ks, century rides, adventure ' +
                     'races, and more in your area.  Every race in the country on one convenient map.'
const DEFAULT_KEYWORDS = [
  'race', 'running', 'cycling', 'duathlons', 'mountain bike', 'SUP', 'adventure race', 'swimming', 'search',
  ...getFilterPresets().map( fp => fp.name.toLowerCase() )
]

export default class MetaInfo extends PureComponent {

  static propTypes = {
    filterPreset: validFilterPreset,
    market: validMarket
  }

  title = () => {
    const { filterPreset, market } = this.props
    if( filterPreset && market ) {
      return [ `${ filterPreset.name } in ${ market.name }`, DEFAULT_TITLE ].join( ' | ' )
    } else {
      return DEFAULT_TITLE
    }
  };

  metaDesc = () => {
    const { filterPreset, market } = this.props
    if( filterPreset && market ) {
      return `The best place to find ${ filterPreset.name.toLowerCase() } in ${ market.name }. ${ DEFAULT_DESC }`
    } else {
      return DEFAULT_DESC
    }
  };

  metaKeywords = () => {
    const { filterPreset, market } = this.props
    if( filterPreset && market ) {
      return [ filterPreset.name, market.name, ...DEFAULT_KEYWORDS ]
    } else {
      return DEFAULT_KEYWORDS
    }
  }

  render() {
    return (
      <Helmet>
        <title>{ this.title() }</title>
        <meta property='og:title' content={ this.title() } />
        <meta name='description' content={ this.metaDesc() } />
        <meta property='og:description' content={ this.metaDesc() } />
        <meta name='keywords' content={ this.metaKeywords().join( ', ' ) } />
      </Helmet>
    )
  }

}
