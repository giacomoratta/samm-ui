import React from 'react'

const ConfigFieldTODO = (props) => {
  const { configProp, labelText, inputWidth } = props

  const inputStyle = {
    width: inputWidth ? inputWidth + 'em' : 'auto'
  }

  return (
    <div className='inline fields'>
      <div className='field' style={{ position: 'relative' }}>
        <label>{labelText}</label>
        <div className='ui right labeled input'>
          <input type='text' name={configProp} style={inputStyle} />
          <div className='ui basic label'>samples</div>
        </div>
        <div className='ui tiny loader xactive' style={{ left: '105%' }} />
      </div>
    </div>
  )
}

export default ConfigFieldTODO
