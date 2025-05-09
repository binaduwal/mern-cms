import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import Introduction from "../pages/Introduction";
import StudyAbroad from "../pages/StudyAbroad";
import Ielts from "../pages/Ielts";
import Pte from "../pages/Pte";
import Sat from "../pages/Sat";
import TestPreparation from "../pages/TestPreparation";
import ContactUs from "../pages/ContactUs";
import Blogs from "../pages/Blogs";
import Events from "../pages/Events";
import Blog_Events from "../pages/Blog_Events";
import UserDashboard from "../Userdashboard/UserDashboard";
import UserProfile from "../Userdashboard/UserProfile";
import SignUp from "../auth/SignUp";
import Landing from "../Userdashboard/Landing";
// import AdminLayout from "../layout/AdminLayout";
// import AdminDashboard from "../admins/AdminDashboard";
// import AddBlogs from "../admins/AddBlogs";
// import AddEvents from "../admins/AddEvents";
// import BlogForm from "../admins/BlogForm";
// import AppointmentDetails from "../admins/AppointmentDetails";
// import EventForm from "../admins/EventForm";
// import InquiryDetails from "../admins/InquiryDetails";
import Login from "../auth/Login";
// import AddUserForm from "../admins/AddUserForm";
// import Permissions from "../admins/Permissions";
// import Roles from "../admins/Roles";
import OurServices from "../pages/OurServices";
import CountryDetails from "../pages/CountryDetails";
import SpecificCountry from "../components/SpecificCountry";
import AdminLayout from "../admin/components/AdminLayout";
import Dashboard from "../admin/components/Dashboard";
import PageView from "../admin/pages/[slug]";
import PageTable from "../admin/pages/PageTable";
import EditPage from "../admin/pages/EditPage";
import AddPages from "../admin/pages/AddPages";
import CategoryForm from "../admin/categories/CategoryForm";
import CategoryTable from "../admin/categories/CategoryTable";
import MediaLibrary from "../admin/media/MediaLibrary";
import AddMenuItems from "../admin/menu/AddMenuItems";
// import BannerTable from "../admin/Banner/BannerTable";
import Form from "../admin/Banner/Form";
// import HomePageMgmt from "../admins/HomePageMgmt";
// import Sidebar from "../admin/components/Sidebar";

export const MainRouter=createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="introduction" element={<Introduction/>}/>
            <Route path="abroad" element={<StudyAbroad/>}/>
            <Route path="countryinfo" element={<CountryDetails/>}>
            <Route index element={<SpecificCountry/>}/>
            </Route>
            <Route path="test" element={<TestPreparation/>}>
                <Route path="ielts" element={<Ielts/>}/>
                <Route  path="pte" element={<Pte/>}/>
                <Route  path="sat" element={<Sat/>}/>
            </Route>
            <Route path="services" element={<OurServices/>}/>

            <Route element={<Blog_Events/>}>
            <Route path="blogs" element={<Blogs/>}/>
            <Route path="events" element={<Events/>}/>
            </Route>
            <Route path="contactus" element={<ContactUs/>}/>
            <Route path="userdashboard" element={<UserDashboard/>}>
            <Route index element={<Landing/>}/>
            <Route path="userprofile" element={<UserProfile/>}/>
            </Route>
            </Route>
            {/* <Route path="admins" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard />} />
            <Route path="addblogs" element={<AddBlogs />} />
            <Route path="blogform" element={<BlogForm />} />
            <Route path="inquirydetails" element={<InquiryDetails />} />
            <Route path="addevents" element={<AddEvents />} />
            <Route path="eventform" element={<EventForm />} />
            <Route path="appointment" element={<AppointmentDetails />} />
            <Route path="createuser" element={<AddUserForm />} />       
            <Route path="permissions" element={<Permissions />} />       
            <Route path="roles" element={<Roles />} />       
            <Route path="home-page" element={<HomePageMgmt />} />       
            </Route> */}

            <Route path="admin" element={<AdminLayout/>} >
            <Route index element={<Dashboard/>} />
            <Route path="pages" element={<PageTable/>} />
            <Route path="add-pages" element={<AddPages/>} />
            <Route path="pages/:slug" element={<PageView/>} />
            <Route path="/admin/pages/edit/:slug" element={<EditPage/>} />
            <Route path="categories" element={<CategoryForm/>} />
            <Route path="category" element={<CategoryTable/>} />
            <Route path="media" element={<MediaLibrary/>} />
            <Route path="menu" element={<AddMenuItems/>} />
            <Route path="banner" element={<Form/>} />
            {/* <Route path="banner" element={<BannerTable/>} /> */}
            </Route>

        </Route>
    )
)