import { Route,Routes } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import { Home } from "./_root/pages"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "./components/ui/toaster"
import {
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "../src/_root/pages/index";


function App() {


  return (
    <main className="flex h-screen">
      <Routes>


      {/* public routes */}
      <Route element={<AuthLayout/>}>
      <Route path="/sign-in" element={<SignInForm/>} />
      <Route path="/sign-up" element={<SignUpForm/>} />
      </Route>


      {/* private routes */}
      <Route path="" element={<RootLayout/>}>

      <Route  path="/" index element={<Home/>}/>
      <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Route>

     </Routes>
     <Toaster/>
    </main>
  )
}

export default App
