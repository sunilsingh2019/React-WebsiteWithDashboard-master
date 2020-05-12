import React, { Component, Fragment } from "react";
import { firebase } from "./../../firebase";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";

class Fileuploader extends Component {
  state = {
    name: "",
    isUploading: false,
    fileURL: ""
  };
  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  };
  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = filename => {
    console.log(filename);
    this.setState({
      name: filename,
      isUploading: false
    });

    // get recently upload image-url from the firebase storage
    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url
        });
      });

    // pass argument filename to storeFilename() function at addEditPlayers.js
    this.props.filename(filename);
  };

  // get default image:: edit player
  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg
      });
    }
    // getDerivedStateFromProps() needs to return something
    return null;
  }
  // Remove image
  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      fileURL: ""
    });
    this.props.resetImage();
  };
  render() {
    return (
      <Fragment>
        {!this.state.fileURL ? (
          <Fragment>
            <div className="label-input">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </Fragment>
        ) : null}
        {this.state.isUploading ? (
          <div className="progress">
            <CircularProgress
              style={{
                color: "#98c6e9"
              }}
              thickness={7}
            />
          </div>
        ) : null}
        {this.state.fileURL ? (
          <div
            className={
              this.props.className ? this.props.className : "utl-form-field"
            }
          >
            <div className="player-img">
              <img src={this.state.fileURL} alt="player" />
            </div>
            <button className="btn btn-remove-img" onClick={this.uploadAgain}>
              Remove image
            </button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
export default Fileuploader;
