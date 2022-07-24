import {
  ADD_MEMBER,
  DELETE_MEMBER,
  EDIT_MEMBER,
  UPDATE_MEMBER,
} from "../Types/BaiTapFormType";

const DEFAULT_STATE = {
  mangSinhVien: [
    {
      passWord: 123456,
      userName: "cuongvo",
      fullName: "vominhcuong",
      email: "123@gmail.com",
      phoneNumber: "0939383480",
      type: "Admin",
    },
    {
      passWord: 123456,
      userName: "tungle",
      fullName: "leminhtung",
      email: "456@gmail.com",
      phoneNumber: "0703888805",
      type: "Client",
    },
  ],
  selected: null,
};

export const BaiTapFormReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case ADD_MEMBER: {
      let mangSinhVienNew = [...state.mangSinhVien];
      mangSinhVienNew.push(payload);
      state.mangSinhVien = mangSinhVienNew;
      state.selected = null;
      return { ...state };
    }

    case DELETE_MEMBER: {
      state.mangSinhVien = state.mangSinhVien.filter(
        (ele) => ele.userName !== payload
      );
      return { ...state };
    }

    case EDIT_MEMBER: {
      state.selected = payload;
      return { ...state };
    }

    case UPDATE_MEMBER: {
      //   let data = [...state.mangSinhVien];
      //   let index = data.findIndex(
      //     (sinhVien) => sinhVien.userName === payload.userName
      //   );
      //   if (index !== -1) {
      //     data[index] = payload;
      //   }
      //   state.mangSinhVien = data;
      state.mangSinhVien = state.mangSinhVien.map((ele) =>
        ele.userName === payload.userName ? payload : ele
      );
      state.selected = null;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
