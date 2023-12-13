import "./App.css";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom"
import { useSelector } from "react-redux";

  import RootLayout from "./layouts/RootLayout";
  import Dashboard from "./components/Dashboard"
  import Login from "./authentication/Login"


//components  
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


    </Route>
    </>
  )
)



function DashboardOrUserLeadGeneration() {
  const user = useSelector((state) => state.user.user);

  if (user && user.name && user.name.toLowerCase().startsWith("admin@")) {
    console.log("jooooooooooo");
    return <Dashboard />;
  }

  console.log("jeeeeeeeeeeee");
  return <UserLeadGeneration />;
}


function App() {
  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
