import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  loggedin: false,
  user: "",
  name: "",
  success: false,
  email: "",
  error: "",
};
let host = "http://localhost:5000";

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (credentials) => {
    console.log("Login from slice");
    let url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let res = await response.json();
    return res;
  }
);

export const logout = createAsyncThunk(
  "userSlice/logout",
  ()=>{
    localStorage.removeItem('token');
    return {success:true};
  }
)

export const getUser = createAsyncThunk("userSlice/getUser", async () => {
  console.log("Getting user from slice");
  let url = `http://localhost:5000/api/auth/verify`;
  try {
    console.log("fetching",url, localStorage.getItem('token'));
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    let data = await response.json();
    console.log("verify response", data);
    return data;
  } catch(error) {
    console.log("error in the get user fetch",error);
    return { success: false, error};
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.loggedin = true;
        state.authtoken = action.payload.authtoken;
        state.name = action.payload.data.name;
        state.user = action.payload.data.id;
        state.email = action.payload.data.email;
        console.log("state variables", state.user);
      } else {
        console.log("error", action.payload);
        state.error = action.payload.error;
      }
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      // {
      //     "success": true,
      //     "id": "64feed7b4235b415a4366907",
      //     "name": "jayavardhan",
      //     "email": "jaya@gmail.com"
      //   }
      // {
      //     "success": false,
      //     "error": {
      //       "name": "JsonWebTokenError",
      //       "message": "invalid token"
      //     }
      //   }
      //   {
      //     "success": false,
      //     "error": "No auth token"
      //   }
      console.log("Get user fulfilled is running");
      if (action.payload.success) {
        state.loggedin = true;
        state.name = action.payload.name;
        state.user = action.payload.id;
        state.email = action.payload.email;
        console.log("state loggedin ", state.loggedin);
      } else {
        console.log("error", action.payload);
        state.error = action.payload.error;
      }
    });
    builder.addCase(logout.fulfilled, (state,action)=>{
      state.loggedin=false;
    })
  },
});

export const logged = (state) => state.users.loggedin;
export const authtoken = (state) => state.users.authtoken;
export default userSlice.reducer;
