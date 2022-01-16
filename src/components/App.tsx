import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history';
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Spaces } from "./spaces/Spaces"
import { DataService } from "../services/DataService";
import { CreateSpace } from "./spaces/CreateSpace";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();


  constructor(props: any) {
    super(props);

    this.setUser = this.setUser.bind(this);
    this.state = {
      user: undefined,
    };
  }

  private async setUser(user: User) {
    this.setState({
      user: user,
    });
    await this.authService.getAWSTemporaryCreds(user.cognitoUser);
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
              <Route exact path='/spaces'>
                <Spaces dataService={this.dataService}/>
              </Route>
              <Route exact path='/createSpace'>
                <CreateSpace dataService={this.dataService}/>
              </Route>
            </Switch>
          </div>

        </Router>
      </div>
    );
  }
}