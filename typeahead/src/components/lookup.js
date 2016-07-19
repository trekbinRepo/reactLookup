import React, { PropTypes } from 'react'

export class Lookup extends React.Component {
  static propTypes = {
    selectedObject: PropTypes.object,
    label: PropTypes.string,
    remove: PropTypes.func,
    searchSobject: PropTypes.func.isRequired,
    chooseOption: PropTypes.func.isRequired,
    options: PropTypes.array,
    recordIconImagePath: PropTypes.string
  };

  typeaheadSearch (event) {
    if (event.target.value.length > 2) {
      if (timer) {
        clearTimeout(timer)
      }

      let timer = setTimeout(this.props.searchSobject(event.target.value), 400)
    } else {
      this.props.searchSobject('')
    }
  }

  componentWillMount () {
  	this.props.searchSobject('')
  }

  render () {
    return (
      <div className={'slds-lookup ' + (Object.getOwnPropertyNames(this.props.selectedObject).length > 0 ? 'slds-has-selection' : '')}
           style={{'marginBottom': '5px'}} data-select='single' data-scope='single' data-typeahead='true'>
        <div className='slds-form-element'>
          <label className='slds-form-element__label' htmlFor='lookup'>{this.props.label}</label>
          <div className='slds-form-element__control slds-input-has-icon slds-input-has-icon--right'>
            <img src={window.searchImgPath} aria-hidden='true' className='slds-input__icon'/>
            <div className={'slds-pill_container ' + (Object.getOwnPropertyNames(this.props.selectedObject).length > 0 ? 'slds-show' : 'slds-hide')}>
              <a href='#void' className='slds-pill'>
                <img src={this.props.recordIconImagePath} aria-hidden='true' className='slds-icon slds-icon-standard-account slds-pill__icon'/>
                <span className='slds-pill__label'>{this.props.selectedObject.Name}</span>
                <button onClick={e => this.props.remove()} style={{'visibility': 'hidden'}}>
                  <img src={window.closeImgPath} aria-hidden='true' className='slds-button__icon'/>
                  <span className='slds-assistive-text'>Remove</span>
                </button>
                <button className='slds-button slds-button--icon-bare slds-pill__remove' onClick={e => this.props.remove()}>
                  <img src={window.closeImgPath} aria-hidden='true' className='slds-button__icon'/>
                  <span className='slds-assistive-text'>Remove</span>
                </button>
              </a>
            </div>
            <input id='lookup' className={'slds-input ' + (Object.getOwnPropertyNames(this.props.selectedObject).length > 0 ? 'slds-hide' : 'slds-show')}
                   type='text' aria-autocomplete='list' role='combobox' aria-expanded='false' aria-activedescendant='' onChange={e => this.typeaheadSearch(e)}/>
          </div>
        </div>
        <div className={'slds-lookup__menu ' + (Object.getOwnPropertyNames(this.props.selectedObject).length > 0 || this.props.options.length === 0 ? 'slds-hide' : 'slds-show')} role='listbox'>
          <ul className='slds-lookup__list' role='presentation'>
            {this.props.options.map((item, index) => {
              return (<li key={item.Id} className='slds-lookup__item'>
                        <a id={this.props.label + index} href='#' role='option' onClick={e => this.props.chooseOption(item)}>
                          <img src={window.accountImgPath} aria-hidden='true' className='slds-icon slds-icon-standard-account slds-icon--small'/>
                            {item.Name}
                        </a>
                      </li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}
