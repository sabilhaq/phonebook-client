import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPhonebook, removePhonebook, resendPhonebook } from '../actions';

class PhonebookItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name, phone: this.props.phone, isShowForm: false };
  }

  handleInputName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleInputPhone = (event) => {
    this.setState({ phone: event.target.value });
  };

  handleEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.handleSubmit(event);
    }
  };

  handleSubmit = (event) => {
    this.props.edit(this.state.name, this.state.phone);
    this.setState({ isShowForm: false })
    event.preventDefault();
  };

  render() {
    if (!this.state.isShowForm) {
      return (
        <tr>
          <td>{this.props.index}</td>

          <td>{this.props.name}</td>

          <td>{this.props.phone}</td>

          <td>
            {!this.props.sent && (
              <button onClick={this.props.resend} type="button" className="btn btn-warning me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-rotate-clockwise-2"
                  width="24"
                  height="24"
                  viewBox="0 2 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
                  <line x1="5.63" y1="7.16" x2="5.63" y2="7.17"></line>
                  <line x1="4.06" y1="11" x2="4.06" y2="11.01"></line>
                  <line x1="4.63" y1="15.1" x2="4.63" y2="15.11"></line>
                  <line x1="7.16" y1="18.37" x2="7.16" y2="18.38"></line>
                  <line x1="11" y1="19.94" x2="11" y2="19.95"></line>
                </svg>

                <span>Resend</span>
              </button>
            )}

            {this.props.sent && (
              <React.Fragment>
                <button
                  onClick={() => this.setState({ isShowForm: true })}
                  type="button"
                  className="btn btn-success me-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pencil"
                    width="20"
                    height="20"
                    viewBox="0 2 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                  </svg>

                  <span>Update</span>
                </button>
                <button onClick={this.props.remove} type="button" className="btn btn-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-trash"
                    width="20"
                    height="20"
                    viewBox="0 2 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>

                  <span>Delete</span>
                </button>
              </React.Fragment>
            )}
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{this.props.index}</td>

        <td>
          <input
            style={{ width: "250px" }}
            value={this.state.name}
            onChange={this.handleInputName}
            onKeyDown={this.handleEnterPress}
            placeholder="name"
            type="text"
            className="form-control"
            id="searchName"
          />
        </td>

        <td>
          <input
            style={{ width: "200px" }}
            value={this.state.phone}
            onChange={this.handleInputPhone}
            onKeyDown={this.handleEnterPress}
            pattern="[0-9]*"
            placeholder="phone"
            type="tel"
            className="form-control"
            id="searchPhone"
          />
        </td>

        <td>
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="btn btn-primary me-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-check"
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

          <button
            onClick={() => this.setState({ isShowForm: false })}
            type="submit"
            className="btn btn-warning"
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
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  edit: (name, phone) => dispatch(editPhonebook(ownProps.id, name, phone)),
  resend: () => dispatch(resendPhonebook(ownProps.id, ownProps.name, ownProps.phone)),
  remove: () => dispatch(removePhonebook(ownProps.id)),
});

export default connect(
  null,
  mapDispatchToProps
)(PhonebookItem);
