import { Component } from 'react';
import { loadPhonebook, fetchPhonebook } from '../actions';
import { connect } from 'react-redux';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', phone: '' };
  }

  handleInputName = (event) => {
    this.setState({ name: event.target.value });
    const refreshing = true;
    this.props.fetch(refreshing);
    this.props.load({ page: this.props.page, phone: this.state.phone, name: event.target.value });
  };

  handleInputPhone = (event) => {
    this.setState({ phone: event.target.value });
    const refreshing = true;
    this.props.fetch(refreshing);
    this.props.load({ page: this.props.page, name: this.state.name, phone: event.target.value });
  };

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">Search Form</div>

        <div className="card-body">
          <form className="row mb-3" action="">
            <div className="col-auto d-flex align-items-center">
              <label htmlFor="name" className="fw-bold me-2">
                Name
              </label>

              <input
                onKeyUp={this.handleInputName}
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
                onKeyUp={this.handleInputPhone}
                pattern="[0-9]*"
                placeholder="phone"
                type="tel"
                className="form-control"
                id="searchPhone"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.phonebooks.page,
  noData: state.phonebooks.noData,
});

const mapDispatchToProps = (dispatch) => ({
  load: (queryString) => dispatch(loadPhonebook(queryString)),
  fetch: () => dispatch(fetchPhonebook()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
