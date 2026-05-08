import { useState } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import ManageCategories from './pages/ManageCategories';
import AddAuthor from './pages/AddAuthor';
import ManageAuthors from './pages/ManageAuthors';
import AddBook from './pages/AddBook';
import ManageBooks from './pages/ManageBooks';
import AdminChangePassword from './pages/AdminChangePassword';
import UserSignup from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import StudentDashboard from './pages/StudentDashboard';
import StudentBooks from './pages/StudentBooks';
import StudentProfile from './pages/StudentProfile';
import StudentChangePassword from './pages/StudentChangePassword';
import ManageStudents from './pages/ManageStudents';
import IssueBook from './pages/IssueBook';
import ManageIssuedBooks from './pages/ManageIssuedBooks';
import IssuedBookDetails from './pages/IssuedBookDetails';
import StudentHistory from './pages/StudentHistroy';
import StudentIssuedBooks from './pages/StudentIssuedBooks';
import LandingPage from './pages/LandingPage';




function App() {


  return (
    <>
      <Header/>
      {/* your routes/components */}
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route path='/admin/category_add' element={<AddCategory/>}></Route>
        <Route path='/admin/category_manage' element={<ManageCategories/>}></Route>
        <Route path='/admin/author_add' element={<AddAuthor/>}></Route>
        <Route path='/admin/manage_author' element={<ManageAuthors/>}></Route>
        <Route path='/admin/book_add' element={<AddBook/>}></Route>
        <Route path='/admin/book_manage' element={<ManageBooks/>}></Route>
        <Route path='/admin/change_password' element={<AdminChangePassword/>}></Route>
        <Route path='/user/signup' element={<UserSignup/>}></Route>
        <Route path='/user/login' element={<UserLogin/>}></Route>
        <Route path='/user/dashboard' element={<StudentDashboard/>}></Route>
        <Route path='/user/books' element={<StudentBooks/>}></Route>
        <Route path='/user/profile' element={<StudentProfile/>}></Route>
        <Route path='/user/change_password' element={<StudentChangePassword/>}></Route>
        <Route path='/admin/manage_students' element={<ManageStudents/>}></Route>
        <Route path='/admin/issue-books' element={<IssueBook/>}></Route>
        <Route path='/admin/manage-issued-books' element={<ManageIssuedBooks/>}></Route>
        <Route path='/admin/issued-books/:id' element={<IssuedBookDetails/>}></Route>
        <Route path="/admin/students/:studentId/history" element={<StudentHistory/>} />
        <Route path='/user/issued-books' element={<StudentIssuedBooks/>}></Route>
      </Routes>
    </>
  )
}

export default App









