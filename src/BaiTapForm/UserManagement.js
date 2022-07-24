import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMemberAction,
  editMemberAction,
} from "../Store/Actions/BaiTapFormAction";

export default function UserManagement() {
  const [state, setState] = useState({
    keyword: "",
    selectedType: "All",
  });

  const { mangSinhVien } = useSelector((state) => state.BaiTapFormReducer);
  const dispatch = useDispatch();

  let data = mangSinhVien.filter((ele) => {
    return (
      ele.fullName
        .toLowerCase()
        .trim()
        .indexOf(state.keyword.toLowerCase().trim()) !== -1
    );
  }); 

  if (state.selectedType !== "All") {
    data = data.filter((ele) => ele.type === state.selectedType);
  }

  const handleChoose = (event) => {
    const { value, name } = event.target;
    setState({
        ...state,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold text-center">
          USER MANAGEMENT
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Search by full name..."
                className="form-control"
                name="keyword"
                onChange={handleChoose}
              />
            </div>
          </div>
          <div className="col-3 ml-auto">
            <div className="form-group mb-0">
              <select
                onChange={handleChoose}
                name="selectedType"
                className="form-control"
              >
                <option>All</option>
                <option>Client</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((member, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{member.userName}</td>
                    <td>{member.fullName}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNumber}</td>
                    <td>{member.type}</td>
                    <td>
                      <button
                        onClick={() => {
                          dispatch(deleteMemberAction(member.id));
                        }}
                        className="btn btn-danger"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => {
                          dispatch(editMemberAction(member));
                        }}
                        className="btn btn-warning"
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
