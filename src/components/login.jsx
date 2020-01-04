import React, { Component } from 'react';
import { Card, TextField, createMuiTheme, MuiThemeProvider, Snackbar, InputAdornment } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login } from '../services/userServices';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {

                boxShadow: "0px 1px 3px 3px gainsboro"


            }
        }
    }
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fields: {},
            errors: {},
            snackBarOpen: false,
            snackBarMessage: '',
            show: false


        }
    }
    handleValidation() {
       
        
        let fields = this.state.fields;
        console.log("handle validation",fields);
        let errors = {};
        let formIsValid = true;


        //Email validation              
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "* required  valid mail id";
        }
        // Check if email_id contain @ symbol and .
        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 3 && (fields["email"].length - lastDotPos) > 3)) {
                formIsValid = false;
                errors["emailId"] = "Email is not valid";
            }
        }
        //Password validation                     
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "* required password";
        }


        //handle error message
        this.setState({ errors: errors });

        return formIsValid;
    }
    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });

    }
    handleLogin = async () => {
        console.log("in sign in",this.state.fields);

        if (this.handleValidation()) {
            await login(this.state.fields).then((res) => {
                console.log("res",res);
                
                this.setState({
                    snackBarOpen: true,
                    snackBarMessage: res.data.message
                })
            })

        }
        else {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: "login unsuccessfully"
            })

        }
    }
    handleClickShowPassword() {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="signUpContainer">
                    <Card id="signUpCard">
                        <div className="innerCardDiv">
                            <div className="inputDiv">
                                <TextField
                                    className="textfield"
                                    variant="outlined"
                                    label="Email Id"
                                    type="text"
                                    placeholder="email Id"
                                    value={this.state.fields["email"]}
                                    error={this.state.errors["email"]}
                                    helperText={this.state.errors["email"]}
                                    onChange={this.handleChange.bind(this, "email")}
                                />

                                <TextField
                                    className="textfield"
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    placeholder="password"
                                    value={this.state.fields["password"]}
                                    error={this.state.errors["password"]}
                                    helperText={this.state.errors["password"]}
                                    onChange={this.handleChange.bind(this, "password")}
                                    type={!this.state.show ? 'password' : 'text'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div onClick={() => this.setState({ show: !this.state.show })}>
                                                    {this.state.show ? <VisibilityOff /> : <Visibility />}
                                                </div>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <button
                                id="btnLogin"
                                onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>
                        <div className="signUpDiv">
                            <span>Dont have an account with us? </span>
                            <button
                                id="btnSign"
                                onClick={() => this.props.history.push('/signUp')}>

                                Signup
                        </button>
                        </div>
                    </Card>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={5}
                        message={this.state.snackBarMessage}>
                    </Snackbar>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Login;