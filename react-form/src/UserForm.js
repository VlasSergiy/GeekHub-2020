import React, {PureComponent} from 'react';

const ruleName = /^[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+$/;
const ruleEmail = /^(?!\.)([a-zA-Z0-9-.]+)(?<!\.)@(?!\.)([a-zA-Z0-9-.]+)\.([a-zA-Z0-9-.]+)(?<!\.)$/;
const rulePass = /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;
const ruleHomePhone = / /;
const ruleMobPhone = / /;

export default class UserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.user = props.user;
  }
  render(){
    return (
      <div className="container p-5">
        <form id="user-form">
          <Name name={this.user.name}/>
          <Email name={this.user.email}/>
          {/*<Password name={this.user.password}/>*/}
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
  constructor(props) {
    super(props);
    this.name=props.name;
  }
render() {
    if (this.name && !this.validate(name)){
      // this.style.backgroundColor = '#F9D0C4';
    }
    return (
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="full_name" className="form-control" value={name}/>
        <small className="form-text text-muted">
          Обовʼязково прізвище, імʼя та по батькові. Тільки літерами українскього алфавіту
        </small>
      </div>
    );
}
validate(name) {
    return ruleName.test(name);
}
}
class Email extends PureComponent {
  constructor(props) {
    super(props);
    this.name=props.name;
  }
  render() {
    if (this.email && !this.validate(name)){
      // this.style.backgroundColor = '#F9D0C4';
    }
    return (
      <div className="form-group">
        <label>Email</label>
        <input type="text" name="full_name" className="form-control" value={name}/>
        <small className="form-text text-muted">
          Адреса електронної пошти
        </small>
      </div>
    );
  }
  validate(email) {
    return ruleEmail.test(email);
  };
}
// class Password extends PureComponent {}
// class Phones extends PureComponent {}