import React, { Fragment } from "react";

const FormField = ({ id, formData, change, className }) => {
  const showError = () => {
    let errorMessage = (
      <div className="input-validation-msg">
        {formData.validation && !formData.valid
          ? formData.validationMessage
          : null}
      </div>
    );
    return errorMessage;
  };
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case "input":
        formTemplate = (
          <Fragment>
            {formData.showLabel ? (
              <div className="label-input">{formData.config.label}</div>
            ) : null}
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
              className="utl-input"
            />
            {/* Error message:: if invalid E-mail-format or Submit empty input */}
            {showError()}
          </Fragment>
        );
        break;
      case "select":
        formTemplate = (
          <Fragment>
            {formData.showLabel ? (
              <div className="label-input">{formData.config.label}</div>
            ) : null}
            <select
              value={formData.value}
              onChange={event => change({ event, id })}
            >
              <option value="">Select one</option>
              {formData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </Fragment>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return (
    <div className={`${className ? className : "utl-form-field"}  `}>
      {renderTemplate()}
    </div>
  );
};

export default FormField;
