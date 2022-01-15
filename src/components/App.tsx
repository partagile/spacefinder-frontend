import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Routes, Route } from "react-router-dom";
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
          <Navbar user={this.state.user}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login authService={this.authService} setUser={this.setUser} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>
    );
  }
}