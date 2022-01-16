import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history';
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Login } from "./Login";
import { Profile } from "./Profile";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);

    this.setUser = this.setUser.bind(this);
    this.state = {
      user: undefined,
    };
  }

  private setUser(user: User) {
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <div className="wrapper">
          {/* 
          * react-router-dom v6 code below
          */}
          
          {
          /* <Navbar user={this.state.user}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login authService={this.authService} setUser={this.setUser} />} />
            <Route path="/profile" element={<Profile authService={this.authService} {this.state.user />} />
          </Routes> */
          }

          {/* 
          * react-router-dom v5 code below
          */}

        <Router history={history}>
          <div>
            <Navbar user={this.state.user}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/login'>
                <Login authService={this.authService} setUser={this.setUser}/>
              </Route>
              <Route exact path='/profile'>
                <Profile authService={this.authService} user={this.state.user}/>
              </Route>
            </Switch>
          </div>

        </Router>
      </div>
    );
  }
}