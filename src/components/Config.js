import React from 'react'
import { connect } from 'react-redux'
import ConfigTextField from './fields/configTextField'
import ConfigFieldTODO from './fields/configFieldTODO'

const Config = (props) => {

  const { configurations } = props

  if (configurations.lastError) {
    return (
      <div>
        <h2>Configuration</h2>
        <div className="ui negative message">Unexpected error: cannot load the configuration</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Configuration</h2>
      <form className="ui form">
        <ConfigFieldTODO
          configProp="SamplesDirectory"
          inputWidth="16"
          labelText="Samples directory"
        />

        <ConfigTextField
          name="LookRandomCount"
          inputWidth="6"
          labelText="Number of samples for each random set"
          validate={(value) => {
            if (!(/^[0-9]+$/i).test(value)) {
              return [{ message: 'Only numbers!' }]
            }
          }}
        />

        <ConfigTextField
          name="LookRandomSameDirectory"
          inputWidth="6"
          labelText="Maximum number of samples from the same directory"
        />

        <ConfigFieldTODO
          configProp="SamplesDirectoryExclusions"
          inputWidth="16"
          labelText="Directories to be skipped"
        />

        <ConfigFieldTODO
          configProp="ExcludedExtensionsForSamples"
          inputWidth="16"
          labelText="File extensions to be skipped"
        />

        <ConfigFieldTODO
          configProp="IncludedExtensionsForSamples"
          inputWidth="16"
          labelText="File extensions to be included"
        />

        <ConfigTextField
          name="ExtensionsPolicyForSamples"
          inputWidth="6"
          labelText="Policy for samples scan"
        />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    configurations: state.configurations
  }
}

export default connect(
  mapStateToProps,
  null
)(Config)