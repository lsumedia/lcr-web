import React, { Component } from 'react';

class Login extends Component{
    render(){
        return (
            <div className="container login-container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Login</h5>
                        <form method="post" action="/startsession">
                            <div className="form-group">
                                <label for="email">Email address</label>
                                <input name="username" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input name="password" type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;