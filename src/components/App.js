import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Components for react-router
import { /* BrowserRouter, */ Router, Route, Switch } from 'react-router-dom'

// Actions
import { fetchConfigurations } from '../actions/configActions'

// Custom components
import Header from './Header'
import history from '../history'
import MainPage from './MainPage'
import Config from './Config'

const App = (props) => {
  const { fetchConfigurations } = props

  useEffect(() => {
    fetchConfigurations().then(() => {
      console.log('Config loaded')
    }).catch((e) => {
      console.error('Cannot load config', e)
    })
  }, [fetchConfigurations])

  return (
    <div className='ui container'>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/config' exact component={Config} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    config: state.config
  }
}

export default connect(
  mapStateToProps,
  {
    fetchConfigurations
  }
)(App)
