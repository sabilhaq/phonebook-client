import { Component } from 'react';
import PhonebookItem from './PhonebookItem';
import { loadPhonebook, fetchPhonebook } from '../actions';
import { connect } from 'react-redux';

class PhonebookList extends Component {
  componentDidMount() {
    const refreshing = true;
    this.props.fetch(refreshing);
    this.props.load();
  }

  render() {
    const { data } = this.props;
    const { requestInProgress, refreshing, phonebooks } = data;

    if (requestInProgress && !refreshing) {
      return (
        <tbody>
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
        </tbody>
      );
    }

    const nodeList = phonebooks.map((item, index) => {
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

    return <tbody>{nodeList}</tbody>;
  }
}

const mapStateToProps = (state) => ({
  data: state.phonebooks,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadPhonebook()),
  fetch: () => dispatch(fetchPhonebook()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookList);
