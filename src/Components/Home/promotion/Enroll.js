import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "./../../ui/formFields";
import { validateForm } from "./../../ui/misc";
import { firebasePromotions } from "./../../../firebase";

class Enroll extends Component {
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
  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = "";
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ? "Congratulations" : "Already on the database"
    });
    //clear form-success message after 2 second
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
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
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() == null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  render() {
    return (
      <Fade>
        <div className="promotion-enroll">
          <form
            className="enroll-form"
            onSubmit={event => this.submitForm(event)}
          >
            <h2 className="enroll-form__heading heading-secondary">
              Enter your email
            </h2>

            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
              className="enroll-form__input"
            />
            {this.state.formError ? (
              <div className="enroll-form__error-label">Something is wrong</div>
            ) : null}
            <div className="enroll-form__success-label">
              {this.state.formSuccess}
            </div>
            <button
              className="enroll-form__btn btn btn-secondary"
              type="submit"
            >
              Enroll
            </button>
          </form>
          <div className="enroll-discl">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            interdum ut enim sit amet accumsan. Vivamus pretium sit amet velit
            at aliquam. Suspendisse facilisis lacus sit amet luctus hendrerit.
            Nullam ex arcu, scelerisque sit amet ipsum vitae.
          </div>
        </div>
      </Fade>
    );
  }
}
export default Enroll;
