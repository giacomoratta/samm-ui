import React from 'react'
import { connect } from 'react-redux'

class MainPage extends React.Component {

  render () {
    return (
      <div>
        <h2>Main Page</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config
  }
}

export default connect(
  mapStateToProps,
  {
    // fetchStreams
  }
)(MainPage)
