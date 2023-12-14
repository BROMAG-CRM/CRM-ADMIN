import "./App.css";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom"

  import RootLayout from "./layouts/RootLayout";
  import Login from "./authentication/Login"
  import { useSelector } from "react-redux";

//components 
import Dashboard from "./components/Dashboard"
import UsersList from "./components/UsersList"
import MyCampaigns from "./components/MyCampaigns";
import AssignedCampaigns from "./components/AssignedCampaigns";
import MyLeads from "./components/MyLeads";
import NewLeadsList from "./components/NewLeadsList";
import FollowUpLeads from "./components/FollowUpLeads";
import Admin from "./components/Admin";
import UserLeadGeneration from "./components/UserLeadGeneration";
import AccountsManagement from "./components/AccountsManagement";
import Bdm from "./components/Bdm";
import LegalManagement from "./components/LegalManagement";
import TeleMarketing from "./components/TeleMarketing";
import TeleSales from "./components/TeleSales";
import LeadGeneration from "./components/LeadGeneration";
import Loader from "./components/Loader";
import ConnectedLeads from "./components/ConnectedLeads";
import NotConnectedLeads from "./components/NotConnectedLeads";



const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayout/>}>
      <Route index path="/" element={<DashboardOrUserLeadGeneration/>}/>
      <Route  path="admin" element={<Admin />}/>
      <Route  path="leadgeneration" element={<LeadGeneration/>}/>
      <Route  path="accountsmanagement" element={<AccountsManagement/>}/>
      <Route  path="bdm" element={<Bdm/>}/>
      <Route  path="legalmanagement" element={<LegalManagement/>}/>
      <Route  path="telemarketing" element={<TeleMarketing/>}/>
      <Route  path="telesales" element={<TeleSales/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="users" element={<UsersList/>} />
      <Route path="campaigns" element={<MyCampaigns/>} />
      <Route path="assigned/:city" element={<AssignedCampaigns />} />
      <Route path="leads" element={<MyLeads />} />
      <Route path="new_leads" element={<NewLeadsList />} />
      <Route path="followup_leads" element={<FollowUpLeads />} />
      <Route path="loader" element={<Loader/>} />
      <Route path="connected_leads" element={<ConnectedLeads/>} />
      <Route path="notconnected_leads" element={<NotConnectedLeads/>} />


    </Route>
    </>
  )
)





function DashboardOrUserLeadGeneration() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Loader />;
  }

  if (user.name && user.name.toLowerCase().startsWith('admin@')) {
    console.log('Admin logged in');
    return <Dashboard />;
  }

  console.log('Regular user logged in');
  return <UserLeadGeneration />;
}


function App() {
  return(
    <RouterProvider router={router}/>  

  )
}

export default App;
