import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
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
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
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
import BannerTable from "../admin/Banner/BannerTable";
import Form from "../admin/Banner/Form";
import ServiceCardForm from "../admin/services/ServiceCardForm";
import ServiceTable from "../admin/services/ServiceTable";
import PermissionList from "../admin/permissions/PermissionList";
import RoleList from "../admin/roles/RoleList";
import RoleForm from "../admin/roles/RoleForm";
import SignOut from "../admin/components/SignOut";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLogin from "../admin/components/AdminLogin";
import UserList from "../admin/users/UserList";
import AchievementList from "../admin/achievement/AchievementList";
import FeatureList from "../admin/feature/FeatureList";
// import PartnerForm from "../admin/partner/PartnerForm";
import PartnerList from "../admin/partner/PartnerList";
import JoinClubList from "../admin/joinclub/JoinClubList";
import WingsList from "../admin/wings/WingsList";
import CallToActionList from "../admin/callToAction/CallToActionList";
import GameTypeList from "../admin/gameWeek/gameType/gameTypeList";
import ClubList from "../admin/gameWeek/club/ClubList";
import MatchList from "../admin/gameWeek/match/MatchList";


export const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="abroad" element={<StudyAbroad />} />
        <Route path="countryinfo" element={<CountryDetails />}>
          <Route index element={<SpecificCountry />} />
        </Route>
        <Route path="test" element={<TestPreparation />}>
          <Route path="ielts" element={<Ielts />} />
          <Route path="pte" element={<Pte />} />
          <Route path="sat" element={<Sat />} />
        </Route>
        <Route path="services" element={<OurServices />} />

        <Route element={<Blog_Events />}>
          <Route path="blogs" element={<Blogs />} />
          <Route path="events" element={<Events />} />
        </Route>
        <Route path="contactus" element={<ContactUs />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PageTable />} />
          <Route path="add-pages" element={<AddPages />} />
          <Route path="pages/:slug" element={<PageView />} />
          <Route path="/admin/pages/edit/:slug" element={<EditPage />} />
          <Route path="categories" element={<CategoryForm />} />
          <Route path="category" element={<CategoryTable />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="menu" element={<AddMenuItems />} />
          <Route path="banner/add" element={<Form />} />
          <Route path="banner" element={<BannerTable />} />
          <Route path="services" element={<ServiceTable />} />
          <Route path="services/add" element={<ServiceCardForm />} />
          <Route path="/admin/banner/edit/:id" element={<Form />} />
          <Route path="permissions" element={<PermissionList />} />
          <Route path="roles" element={<RoleList />} />
          <Route path="add/roles" element={<RoleForm />} />
          <Route path="logout" element={<SignOut />} />
          <Route path="users" element={<UserList />} />
          <Route path="components/achievements" element={<AchievementList />} />
          <Route path="components/features" element={<FeatureList />} />
          <Route path="components/partners" element={<PartnerList />} />
          <Route path="components/join" element={<JoinClubList />} />
          <Route path="components/wings" element={<WingsList />} />
          <Route path="components/cta" element={<CallToActionList />} />
          <Route path="match" element={<MatchList />} />
          <Route path="game-type" element={<GameTypeList />} />
          <Route path="club" element={<ClubList />} />
        </Route>
      </Route>
    </Route>
  )
);
