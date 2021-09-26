import React from 'react';
import PropTypes from 'prop-types';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import "./input-field.scss"

InputField.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,

   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
};
InputField.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
   disabled: false
};

function InputField(props: any) {

   const {
      field, form,
      type, label, placeholder, disabled
   } = props;
   const {name} = field;
   const {errors, touched} = form
   const showError = errors[name] && touched[name]
   return (
      <FormGroup className="input-field">
         {label && <Label for={name}>{label}</Label>}
         <Input
            id={name}
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            invalid={showError}
         />
         {showError &&  <FormFeedback>{errors[name]}</FormFeedback>}
      </FormGroup>
   );
}

export default InputField;

