import Dispatcher from '../dispatchers/racefinder-dispatcher'

const FilterActions = {

  updateParam: function( key, val ) {
    Dispatcher.dispatch({
      type: 'filter_update_param',
      key: key,
      val: val
    })
  }

}

export default FilterActions
