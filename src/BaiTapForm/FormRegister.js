import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMemberAction,
  updateMemberAction,
} from "../Store/Actions/BaiTapFormAction";

export default function FormRegister() {
  const [state, setState] = useState({
    values: {
      userName: "",
      fullName: "",
      passWord: "",
      email: "",
      phoneNumber: "",
      type: "Client",
    },
    errors: {
      userName: "",
      fullName: "",
      passWord: "",
      email: "",
      phoneNumber: "",
      type: "",
    },
  });

  // lấy thông tin từ store reducer
  const { selected, mangSinhVien } = useSelector(
    (state) => state.BaiTapFormReducer
  );

  // xét nếu selectd trên reducer tồn tại thì setState nó selectedReducer === valaues
  useEffect(() => {
    if (selected)
      setState((preState) => ({
        ...preState,
        values: selected,
      }));
  }, [selected]);

  // gửi action lên store
  const dispatch = useDispatch();

  // sử dụng trong form để lấy event.target
  const formRef = useRef();

  // thực hiện onChange dữ liệu
  const handleChange = (event) => {
    //  các thuộc tính kia của event nên check console.log(event)
    const {
      name,
      value,
      title,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;
    let message = "";
    if (patternMismatch) {
      message = `${title} is invalid patttern`;
    }
    if (tooShort || tooLong) {
      message = `${title} is from ${minLength} - ${maxLength} characters`;
    }
    if (valueMissing) {
      message = `${title} is required`;
    }

    setState({
      errors: { ...state.errors, [name]: message },
      values: { ...state.values, [name]: value },
    });
  };

  // thực hiện click add thong tin
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    for (let i = 0; i < mangSinhVien.length; i++) {
      if (state.values.userName === mangSinhVien[i].userName) {
        alert("Username already exists!!!");
        return;
      }
    }

    if (selected) {
      dispatch(updateMemberAction(state.values));
    } else {
      dispatch(addMemberAction(state.values));
    }

    setState({
      values: {
        userName: "",
        fullName: "",
        passWord: "",
        email: "",
        phoneNumber: "",
        type: "Client",
      },
      errors: {
        userName: "",
        fullName: "",
        passWord: "",
        email: "",
        phoneNumber: "",
        type: "",
      },
    });
  };

  // hiển thị thông tin khi bấm sửa
  const { userName, fullName, email, phoneNumber, type, passWord } =
    state.values;

  return (
    <div className="w-75 mx-auto mt-5">
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold text-center">
          REGISTER FORM
        </div>
        <div className="card-body">
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    required
                    onChange={handleChange}
                    name="userName"
                    type="text"
                    className="form-control"
                    maxLength={10}
                    minLength={5}
                    value={userName}
                    title="Username"
                  />
                  {state.errors.userName && (
                    <span className="text-danger">{state.errors.userName}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    required
                    onChange={handleChange}
                    name="fullName"
                    type="text"
                    className="form-control"
                    pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                    title="Fullname"
                    value={fullName}
                  />
                  {state.errors.fullName && (
                    <span className="text-danger">{state.errors.fullName}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    required
                    onChange={handleChange}
                    name="passWord"
                    type="text"
                    className="form-control"
                    value={passWord}
                    title="Password"
                  />
                  {state.errors.passWord && (
                    <span className="text-danger">{state.errors.passWord}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    required
                    onChange={handleChange}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    title="Phone number"
                    pattern="^[0-9]+$"
                    value={phoneNumber}
                  />
                  {state.errors.phoneNumber && (
                    <span className="text-danger">
                      {state.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    onChange={handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                    title="Email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    value={email}
                  />
                  {state.errors.email && (
                    <span className="text-danger">{state.errors.email}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={type}
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option>Client</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              disabled={!formRef.current?.checkValidity()}
              type="submit"
              className="btn btn-warning mr-2"
            >
              SAVE
            </button>
            <button
              onClick={(e) => {
                setState({
                  values: {
                    userName: "",
                    fullName: "",
                    passWord: "",
                    email: "",
                    phoneNumber: "",
                    type: "Client",
                  },
                  errors: {
                    userName: "",
                    fullName: "",
                    passWord: "",
                    email: "",
                    phoneNumber: "",
                    type: "",
                  },
                });
              }}
              type="reset"
              className="btn btn-outline-dark"
            >
              RESET
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
