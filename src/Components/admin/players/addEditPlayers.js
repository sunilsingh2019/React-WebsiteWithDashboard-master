import React, { Component } from "react";
import AdminLayout from "./../../../HOC/AdminLayout";

import FormField from "./../../ui/formFields";
import { validateForm } from "./../../ui/misc";

import Fileuploader from "./../../ui/fileUploader";
import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Last name",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player number",
          name: "number_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: false
        },
        valid: true
      }
    }
  };

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: "Add player"
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit player", url);
            })
            .catch(e => {
              // If the player image doesnt exist in databse
              this.updateFields(
                {
                  ...playerData,
                  image: ""
                },
                playerId,
                "Edit player",
                ""
              );
            });
        });
    }
  }

  // updateForm:: element: input/select  element
  // updateForm:: content:  uploaded image
  updateForm(element, content = "") {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
    // get validation status and validation message
    let validData = validateForm(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    // IF VALID FORM :: do either edit player or add player
    if (formIsValid) {
      if (this.state.formType === "Edit player") {
        // EDIT PLAYER
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Update correctly");

            // if update success then after 2 second redirect to admin_players page
            setTimeout(() => {
              this.props.history.push("/admin_players");
            }, 2000);
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        // ADD PLAYER
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      // IF FORM NOT-VALID
      this.setState({
        formError: true
      });
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;

    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    console.log(this.state.formData);
    return (
      <AdminLayout>
        <div className="admin-handle-player">
          <h2 className="admin-handle-player__title">{this.state.formType}</h2>
          <form
            className="admin-handle-player__form"
            onSubmit={event => this.submitForm(event)}
          >
            <Fileuploader
              dir="players"
              tag={"Player image"}
              defaultImg={this.state.defaultImg}
              defaultImgName={this.state.formData.image.value}
              resetImage={() => this.resetImage()}
              filename={filename => this.storeFilename(filename)}
              className="form-field upload-player-img"
            />

            <FormField
              id={"name"}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
              className="form-field input-player-name"
            />

            <FormField
              id={"lastname"}
              formData={this.state.formData.lastname}
              change={element => this.updateForm(element)}
              className="form-field input-player-lastname"
            />

            <FormField
              id={"number"}
              formData={this.state.formData.number}
              change={element => this.updateForm(element)}
              className="form-field input-player-number"
            />

            <FormField
              id={"position"}
              formData={this.state.formData.position}
              change={element => this.updateForm(element)}
              className="form-field select-player-position"
            />

            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Something is wrong</div>
            ) : (
              ""
            )}
            <div className="admin-submit-form">
              <button
                className="btn btn-secondary btn-submit"
                onClick={event => this.submitForm(event)}
              >
                {this.state.formType}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
