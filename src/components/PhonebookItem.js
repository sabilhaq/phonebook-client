import React from "react";

export default function PhonebookItem(props) {
  return (
    <tr>
      <td>{props.index}</td>

      <td>{props.name}</td>

      <td>{props.phone}</td>

      <td>
        {!props.sent && (
          <button onClick={props.resend} type="button" className="btn btn-warning me-1">
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

        {props.sent && (
          <React.Fragment>
            <button type="button" className="btn btn-success me-1">
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
            <button onClick={props.remove} type="button" className="btn btn-danger">
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
