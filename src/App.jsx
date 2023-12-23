import "./App.css";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom"

  import RootLayout from "./layouts/RootLayout";
  import Login from "./authentication/Login"
  import { useSelector } from "react-redux";

//components 
import Dashboard from "./components/Dashboard"
import UsersList from "./components/UsersList"
import MyCampaignsIndia from "./components/MyCampaignsIndia";
import MyLeadsIndia from "./components/MyLeadsIndia";
import NewLeadsListIndia from "./components/NewLeadsListIndia";
import FollowUpLeadsIndia from "./components/FollowUpLeadsIndia";
import Admin from "./components/Admin";
import UserLeadGeneration from "./components/UserLeadGeneration";
import AccountsManagement from "./components/AccountsManagement";
import Bdm from "./components/Bdm";
import LegalManagement from "./components/LegalManagement";
import TeleMarketing from "./components/TeleMarketing";
import TeleSales from "./components/TeleSales";
import LeadGeneration from "./components/LeadGeneration";
import Loader from "./components/Loader";
import ConnectedLeadsIndia from "./components/ConnectedLeadsIndia";
import NotConnectedLeadsIndia from "./components/NotConnectedLeadsIndia";
import CampaignIndiaorBooks from "./components/CampaignIndiaorBooks";
import MyCampaignsBooks from "./components/MyCampaignsBooks";
import LeadIndiaorBooks from "./components/LeadIndiaorBooks";
import MyLeadsBooks from "./components/MyLeadsBooks";
import MyReport from "./components/MyReport";
import ProgressConnected from "./components/ProgressConnected";
import LeaadGenerationNew from "./components/LeadGenerationNew";
import Partnership from "./components/Partnership";
import PrivateLtd from "./components/PrivateLtd";
import Proprietor from "./components/Proprietor";
import SalesTasksIndiaorBooks from "./components/SalesTasksIndiaorBooks";
import SalesCampaignsIndiaorBooks from "./components/SalesCampaignsIndiaorBooks";
import SalesBooks from "./components/SalesBooks";
import SalesCampaignsIndia from "./components/SalesCampaignsIndia";
import SalesCampaignsBooks from "./components/SalesCampaignsBooks";



const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayout/>}>
      <Route index path="/" element={<DashboardOrUserLeadGeneration/>}/>
      <Route  path="admin" element={<Admin />}/>
      <Route  path="leadgeneration" element={<LeaadGenerationNew/>}/>
      <Route  path="accountsmanagement" element={<AccountsManagement/>}/>
      <Route  path="bdm" element={<Bdm/>}/>
      <Route  path="legalmanagement" element={<LegalManagement/>}/>
      <Route  path="telemarketing" element={<TeleMarketing/>}/>
      <Route  path="telesales" element={<TeleSales/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="users" element={<UsersList/>} />
      <Route path="campaignsindia" element={<MyCampaignsIndia/>} />
      <Route path="campaignsbooks" element={<MyCampaignsBooks/>} />
      <Route path="leadsindia" element={<MyLeadsIndia />} />
      <Route path="new_leadsindia" element={<NewLeadsListIndia />} />
      <Route path="followup_leadsindia" element={<FollowUpLeadsIndia />} />
      <Route path="loader" element={<Loader/>} />
      <Route path="connected_leadsindia" element={<ConnectedLeadsIndia/>} />
      <Route path="notconnected_leadsindia" element={<NotConnectedLeadsIndia/>} />
      <Route path="mytasks" element={<ProgressConnected/>} />
      <Route path="campaignindiaorbooks" element={<CampaignIndiaorBooks/>} />
      <Route path="leadsindiaorbooks" element={<LeadIndiaorBooks/>} />
      <Route path="leadsbooks" element={<MyLeadsBooks/>} />
      <Route path="myreport" element={<MyReport/>} />
      <Route path="partnership" element={<Partnership/>} />
      <Route path="privateltd" element={<PrivateLtd/>} />
      <Route path="proprietor" element={<Proprietor/>} />      
      <Route path="salestasksindiaorbooks" element={<SalesTasksIndiaorBooks/>} />      
      <Route path="salescampaignindiaorbooks" element={<SalesCampaignsIndiaorBooks/>} />      
      <Route path="taskbooks" element={<SalesBooks/>} />      
      <Route path="salescampaignsindia" element={<SalesCampaignsIndia/>} />      
      <Route path="salescampaignsbooks" element={<SalesCampaignsBooks/>} />      

      

      
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
