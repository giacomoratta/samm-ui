import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeConfiguration } from '../../actions/configActions'

const renderErrors = ({ inputErrors }) => {
  if (!inputErrors || inputErrors.length === 0) return
  return (
    <div className='ui left pointing label' style={{ opacity: '0.6' }}>
      {inputErrors.map((item) => item.message).join('; ')}
    </div>
  )
}

const renderComponent = ({ props, value, setValue, isBusy, inputErrors, setInputErrors }) => {
  const { name, labelText, inputWidth, validate } = props
  const inputStyle = {
    width: inputWidth ? inputWidth + 'em' : 'auto'
  }

  const validateAndShowErrors = (value) => {
    setInputErrors([])
    if (!validate) return true
    const errors = validate(value)
    if (!errors) return true
    setInputErrors(errors)
    return false
  }

  const isLoading = value === undefined || isBusy

  return (
    <div className={`inline fields ${isLoading ? 'disabled' : ''}`}>
      <div className='field' style={{ position: 'relative' }}>
        <label>{labelText}</label>
        <input
          autoComplete='off'
          type='text'
          name={name}
          style={inputStyle}
          value={isLoading ? '' : value}
          onChange={(e) => {
            validateAndShowErrors(e.target.value)
            setValue(e.target.value)
          }}
        />
        <div className={`ui tiny loader ${isLoading ? 'active' : ''}`} style={{ left: '105%' }} />
        {renderErrors({ inputErrors })}
      </div>
    </div>
  )
}

const ConfigTextField = (props) => {
  const { configurations, name, changeConfiguration } = props
  const loadedValue = configurations[name]

  const [value, setValue] = useState()
  const [debouncedValue, setDebouncedValue] = useState()
  const [storedValue, setStoredValue] = useState()
  const [isBusy, setIsBusy] = useState(true)
  const [inputErrors, setInputErrors] = useState([])

  // Effectively send the data to API
  useEffect(() => {
    console.log('debouncedValue', debouncedValue)
    if (!debouncedValue) return
    setIsBusy(true)
    changeConfiguration(name, debouncedValue)
  }, [debouncedValue, name, changeConfiguration])

  // Capture value from input + debounce
  useEffect(() => {
    console.log('value', value)
    const timerId = setTimeout(() => {
      if (!value) return
      if (value === storedValue) return
      if (inputErrors && inputErrors.length > 0) return
      setDebouncedValue(value)
    }, 700)
    return () => { clearTimeout(timerId) }
  }, [value, storedValue, inputErrors])

  // Wait for loading data
  useEffect(() => {
    console.log('loadedValue', loadedValue)
    setStoredValue(loadedValue)
    setValue(loadedValue)
    setIsBusy(false)
  }, [loadedValue])

  return renderComponent({ props, value, setValue, isBusy, inputErrors, setInputErrors })
}

const mapStateToProps = (state) => {
  return {
    configurations: state.configurations
  }
}

export default connect(
  mapStateToProps,
  {
    changeConfiguration
  }
)(ConfigTextField)
