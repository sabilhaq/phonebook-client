import { Component } from 'react';
import { addPhonebook } from '../actions';
import { connect } from 'react-redux';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', phone: '', isShowForm: false };
  }

  handleInputName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleInputPhone = (event) => {
    this.setState({ phone: event.target.value });
  };

  onEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.handleSubmit(event);
    }
  };

  handleSubmit = (event) => {
    if (this.state.name) {
      this.setState({ name: '', phone: '' });
      this.props.add(this.state.name, this.state.phone);
    }
    event.preventDefault();
  };

  render() {
    if (!this.state.isShowForm) {
      return (
        <button
          onClick={() => this.setState({ isShowForm: true })}
          type="button"
          className="btn btn-primary mb-3 d-flex align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add</span>
        </button>
      );
    }

    return (
      <div className="card mb-3">
        <div className="card-header">Adding Form</div>

        <div className="card-body">
          <form className="row mb-3" action="">
            <div className="col-auto d-flex align-items-center">
              <label htmlFor="name" className="fw-bold me-2">
                Name
              </label>

              <input
                value={this.state.name}
                onChange={this.handleInputName}
                onKeyDown={this.hanleEnterPress}
                placeholder="name"
                type="text"
                className="form-control"
                id="searchName"
              />
            </div>

            <div className="col-auto d-flex align-items-center">
              <label htmlFor="phone" className="fw-bold me-2">
                Phone
              </label>

              <input
                value={this.state.phone}
                onChange={this.handleInputPhone}
                onKeyDown={this.hanleEnterPress}
                pattern="[0-9]*"
                placeholder="phone"
                type="tel"
                className="form-control"
                id="searchPhone"
              />
            </div>

            <div className="ps-0 col-auto d-flex align-items-center">
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-success d-flex align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="me-1 icon icon-tabler icon-tabler-circle-check"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>

                <span>Save</span>
              </button>
            </div>

            <div className="p-0 col-auto d-flex align-items-center">
              <button
                onClick={() => this.setState({ isShowForm: false })}
                type="submit"
                className="btn btn-warning d-flex align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="me-1 icon icon-tabler icon-tabler-circle-minus"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <line x1="9" y1="12" x2="15" y2="12"></line>
                </svg>

                <span className="text-white">Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (name, phone) => dispatch(addPhonebook(name, phone)),
});

export default connect(null, mapDispatchToProps)(AddForm);
