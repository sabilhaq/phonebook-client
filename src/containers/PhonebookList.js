import React, { Component } from 'react';
import PhonebookItem from './PhonebookItem';
import { loadPhonebook, fetchPhonebook, loadMorePhonebook } from '../actions';
import { connect } from 'react-redux';

class PhonebookList extends Component {
  constructor(props) {
    super(props);
    this.listInnerRef = React.createRef();
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);

    const refreshing = true;
    this.props.fetch(refreshing);
    this.props.load({ page: 1 });
  }

  componentDidUpdate() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    if (this.isBottom(wrappedElement)) {
      if (!this.props.noData) {
        const refreshing = true;
        this.props.fetch(refreshing);
        setTimeout(() => {
          this.props.loadMore({ page: this.props.page + 1, offset: this.props.offset });
        }, 1000)
        document.removeEventListener('scroll', this.trackScrolling);
      }
    }
  };

  render() {
    const nodeList = this.props.data.map((item, index) => {
      return (
        <PhonebookItem
          key={item.id}
          index={index + 1}
          id={item.id}
          name={item.name}
          phone={item.phone}
          sent={item.sent}
        />
      );
    });

    return (
      <tbody id="header" onScroll={this.trackScrolling} ref={this.listInnerRef}>
        {nodeList}

        {this.props.requestInProgress && !this.props.refreshing && (
          <tr>
            <td colSpan="4">
              <div className="mb-5 d-flex flex-column justify-content-center align-items-center">
                <div className="spinner-border text-primary m-5 mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <strong>Loading...</strong>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.phonebooks.phonebooks,
  offset: state.phonebooks.offset,
  requestInProgress: state.phonebooks.requestInProgress,
  refreshing: state.phonebooks.refreshing,
  phonebooks: state.phonebooks.phonebooks,
  page: state.phonebooks.page,
  noData: state.phonebooks.noData,
});

const mapDispatchToProps = (dispatch) => ({
  load: (queryString) => dispatch(loadPhonebook(queryString)),
  loadMore: (queryString) => dispatch(loadMorePhonebook(queryString)),
  fetch: () => dispatch(fetchPhonebook()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookList);
