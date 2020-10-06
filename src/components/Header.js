import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends React.Component {

  render () {
    return (
      <div className="ui stackable menu">
        <Link className="item" to="/">Look</Link>
        <Link className="item" to="/config">Configure</Link>
        <Link className="item" to="/about">About</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // streams: Object.values(state.streams),
    // currentUserId: state.auth.userId,
    // isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  {
    // fetchStreams
  }
)(Header)
