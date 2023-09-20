import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  publicBlogs: {
    loaded: false,
    blogs: [],
  },
  myBlogs: {
    private: [],
    public: [],
    liked:[],
    loaded: true,
  },
};

let host = "http://localhost:5000";
// const authtoken = localStorage.getItem("token");

export const getPublicBlogs = createAsyncThunk(
  "blogSlice/getPublicBlogs",
  async () => {
    let url = `${host}/api/blogs/publicBlogs`;
    try {
      let response = await fetch(url);
      // {
      //   "success": true,
      //   "blogs": [
      //     {
      //       "_id": "650836c555a27f1489e1219d",
      //       "title": "daadtahaf",
      //       "user": "64feed7b4235b415a4366907",
      //       "tag": [],
      //       "description": "\nLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ipsam totam cumque laborum repellendus atque quaerat cum est eveniet laboriosam, corporis eaque quibusdam nulla repellat consequatur? Ipsum, at excepturi! Eius!",
      //       "public": true,
      //       "author": "Anonymous",
      //       "date": "2023-09-18T11:38:45.687Z",
      //       "__v": 0
      //     },
      //   ]
      // }
      let data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const addBlog = createAsyncThunk("blogSlice/addBlogs", async () => {
  let url = `${host}/api/blogs/addBlog`;
  try {
    console.log("Adding blog");
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: "jaya@gmail.com",
        name: "Naniiaafifadfadf",
        user: "nani",
        title: "daadtahaf",
        description:
          "fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        author: "Nanii",
        tags: ["hello", "mellow", "jello"],
      }),
    });
    let nblog = await response.json();
    return nblog;
  } catch (error) {
    return error;
  }
});
export const getMyBlogs = createAsyncThunk("blogSlice/getMyBlogs", async () => {
  let url = `${host}/api/blogs/myBlogs`;
  console.log(url);
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return error;
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublicBlogs.fulfilled, (state, action) => {
      // state.publicBlogs.loaded=true;
      console.log(action.payload);
      console.log("allBlogs", action.payload);
      state.publicBlogs.blogs = action.payload;
      state.publicBlogs.loaded = true;
      console.log("state public blogs", state.publicBlogs.blogs);
    });
    builder.addCase(getPublicBlogs.rejected, (state, action) => {
      state.publicBlogs.loaded = true;
    });
    builder.addCase(getMyBlogs.fulfilled, (state, action) => {
      // state.publicBlogs.loaded=true;
      console.log("action", action.payload);
      console.log("myBlogs", action.payload);
      state.myBlogs.private = action.payload.private;
      state.myBlogs.public = action.payload.public;
      console.log("state myBlogs blogs", state.myBlogs);
    });
    builder.addCase(getMyBlogs.rejected, (state, action) => {
      state.publicBlogs.loaded = false;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      if(action.payload.success){
        if(action.payload.blog.public){
          state.publicBlogs.blogs = state.publicBlogs.blogs.concat(action.payload.blog);
          state.myBlogs.public = state.myBlogs.public.concat(action.payload.blog);
          console.log(state.myBlogs.public);
          console.log(state.publicBlogs.blogs);
        
        }else{
          state.myBlogs.private = state.myBlogs.private.concat(action.payload.blog);
          console.log(state.myBlogs.private);
        }
      }
    });
  },
});

export const myPrivateBlogs = (state) => state.blogs.myBlogs.private;
export const myPublicBlogs = (state) => state.blogs.myBlogs.public;
export const allPublicBlogs = (state) => state.blogs.publicBlogs;
export default blogSlice.reducer;
