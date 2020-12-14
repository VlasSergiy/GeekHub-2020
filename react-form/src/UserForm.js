import React, { PureComponent } from 'react';

export default class UserForm extends PureComponent {
  state = {
    user: {
      full_name: '',
      email: '',
      pass: '',
      full_nameValid: true,
      emailValid: true,
      passValid: true
    },
    phones: [{ number: '', type: 'home', isValid: true }]
  };

  setInputValue = (name, value) => {
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          [name]: value
        }
      }),
      () => {
        this.validateField(name, value);
      }
    );
  };

  handleDeletePhone = index => {
    let phonesList = [...this.state.phones];
    phonesList.splice(index, 1);
    this.setState({ phones: phonesList });
  };

  handleAddPhone = () => {
    let phonesList = [...this.state.phones];
    phonesList.push({ number: '', type: 'home', isValid: true });
    this.setState({ phones: phonesList });
  };

  setPhoneValue = (index, event) => {
    const { value, type } = event.target;
    const phoneProperty = type === 'text' ? 'number' : 'type';

    let phonesList = [...this.state.phones];
    phonesList[index][phoneProperty] = value;
    this.setState({ phones: phonesList }, () => {
      this.validatePhoneField(phonesList, index);
    });
  };

  validatePhoneField(phoneList, index) {
    const ruleHomePhone = /^(?!0)\d{6}$/;
    const ruleMobPhone = /(^0\d{9}$)|(^3\d{11}$)/;

    let phoneObj = phoneList[index];
    let isValidPhone = true;
    let value = phoneObj['number'];

    switch (phoneObj['type']) {
      case 'home':
        isValidPhone = ruleHomePhone.test(value);
        break;
      case 'mobile':
        isValidPhone = ruleMobPhone.test(value);
        break;
      default:
        break;
    }

    this.setState(prevState => ({
      phones: prevState.phones.map((el, i) =>
        i === index ? { ...el, isValid: isValidPhone } : el
      )
    }));

    console.log(isValidPhone);
    console.log(value);

  }

  validateField(fieldName, value) {
    let isValid;
    const validProperty = fieldName + 'Valid';

    const ruleName = /^[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+$/;
    const ruleEmail = /^(?!\.)([a-zA-Z0-9-.]+)(?<!\.)@(?!\.)([a-zA-Z0-9-.]+)\.([a-zA-Z0-9-.]+)(?<!\.)$/;
    const rulePass = /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;

    switch (fieldName) {
      case 'full_name':
        isValid = ruleName.test(value);
        break;
      case 'email':
        isValid = ruleEmail.test(value);
        break;
      case 'pass':
        isValid = rulePass.test(value);
        break;
      default:
        break;
    }

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [validProperty]: isValid
      }
    }));
  }

  errorClass(error) {
    return error ? '' : 'is-invalid';
  }

  render() {
    return (
      <div className='container p-5'>
        <form id='user-form' role='form'>
          <Name
            onChangedValue={this.setInputValue}
            isError={this.errorClass(this.state.user.full_nameValid)}
          />
          <Email
            onChangedValue={this.setInputValue}
            isError={this.errorClass(this.state.user.emailValid)}
          />
          <Password
            onChangedValue={this.setInputValue}
            isError={this.errorClass(this.state.user.passValid)}
          />
          <Phones
            onChangedValue={this.setPhoneValue}
            onDelete={this.handleDeletePhone}
            onAdd={this.handleAddPhone}
            phones={this.state.phones}
            isError={this.errorClass}
          />
        </form>
        {/*<div style={{ marginTop: 20 }}>{JSON.stringify(this.state)}</div>*/}
      </div>
    );
  }
}

class Name extends PureComponent {
  changedValue = e => {
    this.props.onChangedValue(e.target.name, e.target.value);
  };

  render() {
    return (
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          name='full_name'
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className='form-text text-muted'>
          Обовʼязково прізвище, імʼя та по батькові. Тільки літерами
          українскього алфавіту
        </small>
      </div>
    );
  }
}

class Email extends PureComponent {
  changedValue = e => {
    this.props.onChangedValue(e.target.name, e.target.value);
  };

  render() {
    return (
      <div className='form-group'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className='form-text text-muted'>Адреса електронної пошти</small>
      </div>
    );
  }
}
class Password extends PureComponent {
  changedValue = e => {
    this.props.onChangedValue(e.target.name, e.target.value);
  };

  render() {
    return (
      <div className='form-group'>
        <label>Password</label>
        <input
          type='text'
          name='pass'
          className={`form-control ${this.props.isError}`}
          onChange={this.changedValue}
        />

        <small className='form-text text-muted'>
          Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери
          англійського алфавіту та числа
        </small>
      </div>
    );
  }
}

class Phones extends PureComponent {
  changedValue = (e, i) => {
    this.props.onChangedValue(i, e);
  };

  handleDelete = index => {
    this.props.onDelete(index);
  };

  handleAdd = () => {
    this.props.onAdd();
  };

  createPhonesSection = () => {
    let phonesSection = [];

    this.props.phones.map((x, i) => {
      phonesSection.push(
        <div className='input-group mb-3' key={i}>
          <input
            type='text'
            className={`form-control ${this.props.isError(x.isValid)}`}
            name='phone-number'
            value={x.number}
            onChange={e => this.changedValue(e, i)}
          />
          <select
            className='custom-select'
            value={x.type}
            onChange={e => this.changedValue(e, i)}
          >
            <option value='home'>Домашній</option>
            <option value='mobile'>Мобільний</option>
          </select>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              style={{
                display:
                  i >= 1 || this.props.phones.length > 1 ? 'block' : 'none'
              }}
              onClick={() => this.handleDelete(i)}
            >
              Видалити
            </button>
            {this.props.phones.length - 1 === i && (
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={() => this.handleAdd()}
              >
                Додати
              </button>
            )}
          </div>
        </div>
      );
    });

    return phonesSection;
  };

  render() {
    return this.createPhonesSection();
  }
}
