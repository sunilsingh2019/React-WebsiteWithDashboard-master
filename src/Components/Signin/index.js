import React, { Component } from "react";

import { firebase } from "./../../firebase";
import FormField from "./../ui/formFields";
import { validateForm } from "./../ui/misc";

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your Email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your Password"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };
  updateForm = element => {
    const newFormData = { ...this.state.formData };

    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;
    let validData = validateForm(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <main className="main sign-in">
        <div className="container">
          <div className="signin-wrapper">
            <h2 className="heading-secondary signin-title ">
              Login to dashboard
            </h2>
            <form
              className="signin-form"
              onSubmit={event => this.submitForm(event)}
            >
              <FormField
                id={"email"}
                formData={this.state.formData.email}
                change={element => this.updateForm(element)}
                className="signin-form__input"
              />
              <FormField
                id={"password"}
                formData={this.state.formData.password}
                change={element => this.updateForm(element)}
                className="signin-form__input"
              />
              {this.state.formError ? (
                <div className="input-auth-msg">
                  Something is wrong, try again
                </div>
              ) : null}
              <button
                className="signin-form__submit-btn btn btn-secondary"
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
export default SignIn;
