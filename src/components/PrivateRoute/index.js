import LayoutComponent from 'pages/Layout'
import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {hasToken} from 'utils/storage'
export default class PrivateRoute extends Component {
  render() {
    const {component:Component, ...rest} = this.props
    return (
      <Route path={rest.path} render={(props) => {
        if(hasToken()) {
          return <Component {...props}></Component>
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              search: '?id=123',
              state: {
                from: props.location.pathname
              }
            }
          }></Redirect>
        }
      }}></Route>
    )
  }
}
