import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  user:{
    is:false,
    id:null,
    name:null,
    email:null,
    error:null
  },
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


// Finds the user if there and public notes
export const getUser = createAsyncThunk(
  "userSlice/getUser",
  async () => {
  console.log("In userSlice, running getUser function");
  let url = `http://localhost:5000/api/auth/verify`;
  try {
    console.log("request to the server and token",url, localStorage.getItem('token'));
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    let data = await response.json();
    console.log("getUser return",data);
        // {
        //     "user": {
        //       "is": true,
        //       "data": {
        //         "id": "64feed7b4235b415a4366907",
        //         "email": "jaya@gmail.com",
        //         "name": "jayavardhan",
        //         "iat": 1695050932
        //       }
        //     }
        //   }
        // not present{
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "invalid token"
        //       }
        //     }
        //   }
        // not present{
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "Token not present"
        //       }
        //     }
        //   }
    console.log("getUser result", data);
    return data;
  } catch(error) {
    console.log("error in the getUser",error);
    return error;
  }
});


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout (state){
      try{ 
        localStorage.removeItem('token');
        state.user.is=false;
        state.user.email=null;
        state.user.id=null;
        state.user.name=null;
      }catch(error){
        state.user.error=error;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.user.is = true;
        // state.authtoken = action.payload.authtoken;
        localStorage.setItem()
        state.user.name = action.payload.data.name;
        state.user.id = action.payload.data.id;
        state.user.email = action.payload.data.email;
        console.log("state variables", state.user);
      } else {
        // console.log("error", action.payload);
        state.error = action.payload.error;
      }
      console.log("User in the state is",state.user);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
        // {
        //     "user": {
        //       "is": true,
        //       "data": {
        //         "id": "64feed7b4235b415a4366907",
        //         "email": "jaya@gmail.com",
        //         "name": "jayavardhan",
        //         "iat": 1695050932
        //       }
        //     }
        //   }
        // not present{
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "invalid token"
        //       }
        //     }
        //   }
        // not present{
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "Token not present"
        //       }
        //     }
        //   }
      console.log("Get user fulfilled is running");
      if (action.payload.user.is) {
        state.user.is = true;
        state.user.name = action.payload.user.data.name;
        state.user.id = action.payload.user.data.id;
        state.user.email = action.payload.user.data.email;
        // console.log("state loggedin ", state.loggedin);
      } else {
        // console.log("error", action.payload);
        state.user.error = action.payload.user.error;
      }
      console.log("User in the state user.is and user.error",state.user.is,state.user.error);
    });
  },
});

export const {logout}=userSlice.actions;
export const logged = (state) => state.users.user.is;
// export const authtoken = (state) => state.users.authtoken;
export default userSlice.reducer;
