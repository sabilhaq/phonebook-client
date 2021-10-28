import PhonebookList from './PhonebookList';
import AddForm from './AddForm';
import SearchForm from './SearchForm';
import './AddForm.scss'

export default function PhonebookBox(props) {
  return (
    <div className="PhonebookBox container">
      <div className="Header card mb-4">
        <div className="p-4 card-header d-flex justify-content-center align-items-center">
          <h1>Phone Book Apps</h1>
        </div>
      </div>

      <AddForm />

      <SearchForm />

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <PhonebookList />
      </table>
    </div>
  );
}
