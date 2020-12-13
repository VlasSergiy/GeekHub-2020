import React, {PureComponent} from 'react';

const ruleName = /^[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+$/;
const ruleEmail = /^(?!\.)([a-zA-Z0-9-.]+)(?<!\.)@(?!\.)([a-zA-Z0-9-.]+)\.([a-zA-Z0-9-.]+)(?<!\.)$/;
const rulePass = /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;
const ruleHomePhone = /^(?!0)\d{6}$/;
const ruleMobPhone = /(^0\d{9}$)|(^3\d{11}$)/;

export default class UserForm extends PureComponent {

  state = {
    full_name: '',
    email: '',
    pass: '',
    formErrors: {full_name: '', email: '', pass: ''},
    full_nameValid: false,
    emailValid: false,
    passValid: false
  };

  setInputValue = (name, value) => {
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let full_nameValid = this.state.full_nameValid;
    let emailValid = this.state.emailValid;
    let passValid = this.state.passValid;

    switch(fieldName) {
      case 'full_name':
        full_nameValid = value.match(ruleName);
        fieldValidationErrors.full_name = full_nameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid  = value.match(ruleEmail);
        fieldValidationErrors.email = emailValid ? '': ' is too short';
        break;
      case 'pass':
        passValid  = value.match(rulePass);
        fieldValidationErrors.pass = passValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      full_nameValid: full_nameValid,
      emailValid: emailValid,
      passValid: passValid,

    });//, this.validateForm);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

  render(){
    return (
      <div className="container p-5">
        <form id="user-form" role="form">
          <Name onChangedValue={this.setInputValue} isError={this.errorClass(this.state.formErrors.full_name)}/>
          <Email onChangedValue={this.setInputValue} isError={this.errorClass(this.state.formErrors.email)}/>
          <Password onChangedValue={this.setInputValue} isError={this.errorClass(this.state.formErrors.pass)}/>
          {/*<div>*/}
          {/*  <label>Phones</label>*/}
          {/*  <Phones name={this.user.phones}/>*/}
          {/*  <button type="submit" className="btn btn-primary">Submit</button>*/}
          {/*</div>*/}
        </form>
      </div>
    );
  }
}

class Name extends PureComponent {

  changedValue = (e) => {
    this.props.onChangedValue(e.target.name, e.target.value);
  }

  render() {

    return (
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="full_name"
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className="form-text text-muted">
          Обовʼязково прізвище, імʼя та по батькові. Тільки літерами українскього алфавіту
        </small>

      </div>
    );
  }
}

class Email extends PureComponent {

  changedValue = (e) => {
    this.props.onChangedValue(e.target.name, e.target.value);
  }

  render() {

    return (
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className="form-text text-muted">
          Адреса електронної пошти
        </small>

      </div>
    );
  }
}
class Password extends PureComponent {

  changedValue = (e) => {
    this.props.onChangedValue(e.target.name, e.target.value);
  }

  render() {

    return (
      <div className="form-group">
        <label>Password</label>
        <input
          type="text"
          name="pass"
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className="form-text text-muted">
          Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери англійського алфавіту та числа
        </small>

      </div>
    );
  }
}

// class Phones extends PureComponent {}