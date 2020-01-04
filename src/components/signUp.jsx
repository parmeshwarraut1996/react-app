import React, { Component } from 'react';
import { Card, TextField, createMuiTheme, MuiThemeProvider, Snackbar, Link } from "@material-ui/core";
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {

                boxShadow: "0px 1px 3px 3px gainsboro"


            }
        }
    }
})
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
            confirmPassword: "",
            fields: {},
            errors: {},
            snackBarOpen: false,
            snackBarMessage: ''


        }
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // First Name validation
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "* required fist name";
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["firstName"] = " enter only letters";
            }
        }
        //Last Name validation                      
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "* required last name";
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["lastName"] = " enter only letters";
            }
        }
        //Email validation              
        if (!fields["emailId"]) {
            formIsValid = false;
            errors["emailId"] = "* required  valid mail id";
        }
        // Check if email_id contain @ symbol and .
        if (typeof fields["emailId"] !== "undefined") {
            let lastAtPos = fields["emailId"].lastIndexOf('@');
            let lastDotPos = fields["emailId"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["emailId"].indexOf('@') === -1 && lastDotPos > 2 && (fields["emailId"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["emailId"] = "Email is not valid";
            }
        }
        //Password validation                     
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "* required password";
        }

        //Confirm Password validation                      
        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "* required confirm password";
        }

        // Compare Password and Confirm Password are match or not

        if (fields["password"] !== fields["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "password does not match";
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
    handleSignUp() {
        if (this.handleValidation()) {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: "sign successfully"
            })

        }
        else {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: "sign in unsuccessfully"
            })

        }


    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="signUpContainer">
                    <Card id="signUpCard">
                        <div className="nameDiv">
                            <TextField
                                className="name"
                                variant="outlined"
                                label="First Name"
                                type="text"
                                placeholder="first name"
                                value={this.state.fields["firstName"]}
                                error={this.state.emailId["firstName"]}
                                helperText={this.state.errors["firstName"]}
                                onChange={this.handleChange.bind(this, "firstName")}
                            />
                            <TextField
                                className="name"
                                variant="outlined"
                                label="Last Name"
                                type="text"
                                placeholder="last name"
                                value={this.state.fields["lastName"]}
                                error={this.state.emailId["lastName"]}
                                helperText={this.state.errors["lastName"]}
                                onChange={this.handleChange.bind(this, "lastName")}
                            />
                        </div>
                        <TextField
                            className="textfield"
                            variant="outlined"
                            label="Email Id"
                            type="text"
                            placeholder="email Id"
                            value={this.state.fields["emailId"]}
                            error={this.state.emailId["emailId"]}
                            helperText={this.state.errors["emailId"]}
                            onChange={this.handleChange.bind(this, "emailId")}
                        />
                        <TextField
                            className="textfield"
                            variant="outlined"
                            label="Password"
                            type="password"
                            placeholder="password"
                            value={this.state.fields["password"]}
                            error={this.state.emailId["password"]}
                            helperText={this.state.errors["password"]}
                            onChange={this.handleChange.bind(this, "password")}
                        />
                        <TextField
                            className="textfield"
                            variant="outlined"
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.fields["confirmPassword"]}
                            error={this.state.emailId["confirmPassword"]}
                            helperText={this.state.errors["confirmPassword"]}
                            onChange={this.handleChange.bind(this, "confirmPassword")}
                        />

                        <button
                            id="btnSignUp"
                            onClick={() => this.handleSignUp()}>
                            Sign Up
                        </button>
                        <div>
                            <span>Have an account with us? </span>
                            <Link to="/login">
                                Login
                            </Link>
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
export default SignUp;