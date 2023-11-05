import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
import AuthRoute from 'components/AuthRoute'
import PrivateRoute from 'components/PrivateRoute'
import { history } from 'utils/history'
const Login = React.lazy(() => import('pages/Login'))
const LayoutComponent = React.lazy(() => import('pages/Layout'))
const App = () => {
  return (
    <Suspense fallback>
      <Router history={history}>
        <div className="App">
          {/* <Link to="/login">登录</Link>
      <Link to="/home">首页</Link> */}
          <Switch>
            <Redirect from="/" to="/home" exact></Redirect>
            {/* <AuthRoute path='/home' component={Home}></AuthRoute> */}
            <PrivateRoute path="/home" component={LayoutComponent} />
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
