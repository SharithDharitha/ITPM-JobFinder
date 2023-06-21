import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";


import {
  Home,
  UserLogin,
  AdminLogin,
  UserRegister,
  AddJob,
  CompanyRegister,
  CompanyLogin,
  AddApplication,
  ViewAllJob,
  ApplyJob,
  UserDashboard,
  CompanyDashboard,
  AdminDashboard,
  UserViewInquiry,
  EditJob,
  CompanyEdit,
  MyApplication,
  InquaryMain,
  AddInquary,
  AdminCompanyManagement,
  AdminUserManagement,
  AdminJobManagement,
  AdminReportGenerate,
  UserReportGenerate,
  CompanyReportGenerate,
  UserEditProfile,
  CompanyInquary,
} from "../pages";


import Header from "../components/Header";


const AppRoutes = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />


          {/*Applicant Register Route*/}
          <Route path="/user/register" element={<UserRegister />} />

          {/*Applicant Login Status Check*/}
          <Route exact path="/user/login" element={<CheckLoginStatus />}> 
            <Route exact path="/user/login" element={<UserLogin />} />
         </Route>

         {/*Applicant Private Routes */}
         <Route exact path="/user" element={<PrivateRoute permissionLevel="APPLICANT" />}>
             { /* After Applicant Login, Applicant routes add here */}
              <Route exact path="/user" element={<UserDashboard />} />
              <Route exact path="/user/view/inquiry" element={<UserViewInquiry />} />




              <Route exact path="/user/report" element={<UserReportGenerate/>}/>
              <Route exact path="/user/edit/:id" element={<UserEditProfile/>}/>

           </Route>
           <Route exact path="/inquary/main" element={<InquaryMain/>} />
           <Route exact path="/inquary/add/:id" element={<AddInquary/>} />
           <Route exact path="/inquiry/company" element={<CompanyInquary />} />



        
          {/*Admin Login Status Check*/}
          <Route exact path="/admin/login" element={<CheckLoginStatus />}> 
          <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

           {/*Admin Private Routes */}
         <Route exact path="/admin" element={<PrivateRoute permissionLevel="ADMIN" />}>
             { /* After Applicant Login, Applicant routes add here */}
              <Route exact path="/admin" element={<AdminDashboard />} />
              <Route exact path="/admin/company/management" element={<AdminCompanyManagement/>}/>
              <Route exact path="/admin/user/management" element={<AdminUserManagement/>}/>
              <Route exact path="/admin/job/management" element={<AdminJobManagement/>}/>
              <Route exact path="/admin/report" element={<AdminReportGenerate/>}/>

           </Route>

        

          {/*Job Route*/}
          <Route path="/job/add" element={<AddJob />} />
          <Route path="/job/view" element={<ViewAllJob/>} />
          <Route path="/job/apply" element={<ApplyJob/>} />
          <Route path="/job/edit/:id" element={<EditJob/>} />


          {/*Job Route*/}
          <Route path="/application/add/:id" element={<AddApplication />} />
          <Route path="/application/myapplications" element={<MyApplication />} />


          {/*Company Register Route*/}
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/edit/:id" element={<CompanyEdit />} />


          {/*Company Login Status Check*/}
          <Route exact path="/company/login" element={<CheckLoginStatus />}> 
            <Route exact path="/company/login" element={<CompanyLogin />} />
         </Route>

          {/*Company Private Routes */}
          <Route exact path="/company" element={<PrivateRoute permissionLevel="COMPANY" />}>
             { /* After Company Login, Companies routes add here */}
              <Route exact path="/company" element={<CompanyDashboard />} />
              <Route exact path="/company/report" element={<CompanyReportGenerate/>}/>

           </Route>


        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
