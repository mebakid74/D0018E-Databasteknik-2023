import React from "react";
import axios from "axios";
import { clientParsedRoutes as routes } from "../constants"
import { getToken } from "../tools/validation"
import { Navigate } from "react-router-dom";

class RedirectUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, valid: false };
    }

    componentDidMount() {
        var t = getToken();
        if (t == null) {this.setState({ loading: false, valid: false }); }
        else {            
            axios.post(routes.validate_user_login, { token: t
            }).then((res) => {
                this.setState({ loading: false, valid: res.data["status"] === "success"});
            }).catch((err) => {
                console.log(err);
                console.log(err.response.data);
            });
        }
    }

    render() {
        const { loading, valid } = this.state;
        if (loading) {
            return <h1>Loading...</h1>
        } else {
            if (!valid) {
                return <Navigate to={this.props.link}/>;
            } else {
                return <this.props.pageFunc userValid={valid}/>
            }
        }
    }
}
export default RedirectUserPage;