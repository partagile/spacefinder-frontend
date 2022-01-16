import React from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileState {
  userAttributes: UserAttribute[];
}

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    userAttributes: [],
  };

  async componentDidMount() {
    if (this.props.user) {
      const userAttrs = await this.props.authService.getUserAttributes(
        this.props.user
      );
      this.setState({
        userAttributes: userAttrs,
      });
    }
  }

  private renderUserAttributes() {
    const rows = [];
    for (const userAttribute of this.state.userAttributes) {
      rows.push(
        <tr key={userAttribute.Name}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {userAttribute.Name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {userAttribute.Value}
          </td>
        </tr>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let profileSpace;
    if (this.props.user) {
      profileSpace = (
        <div>
          {this.renderUserAttributes()}
        </div>
      );
    } else {
      profileSpace = (
        <div>
          Please <Link to="/login">Login</Link>
        </div>
      );
    }
    return <div>{profileSpace}</div>;
  }
}
