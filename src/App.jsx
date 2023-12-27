import "./App.css";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom"

  import RootLayout from "./layouts/RootLayout";
  import Login from "./authentication/Login"
  import { useSelector } from "react-redux";

//components 
import Dashboard from "./components/Others/Dashboard"
import UsersList from "./components/Others/UsersList"
import Admin from "./components/Others/Admin";
import UserLeadGeneration from "./components/Others/UserLeadGeneration";
import AccountsManagement from "./components/AccountsManagement/AccountsManagement";
import LegalManagement from "./components/LegalManagement/LegalManagement";
// import LeadGeneration from "./components/LeadGeneration";
import Loader from "./components/Others/Loader";


//Tele Marketing
import TeleMarketing from "./components/TeleMarketing/TeleMarketing";
import Campaigns from "./components/TeleMarketing/Campaigns/Campaigns";
import Tasks from "./components/TeleMarketing/Tasks/Tasks";

//Tele Marketing Campaigns(India)
import MyCampaignsIndia from "./components/TeleMarketing/Campaigns/India/MyCampaignsIndia";

//Tele Marketing Campaigns(books)
import MyCampaignsBooks from "./components/TeleMarketing/Campaigns/Books/MyCampaignsBooks";

//Tele Marketing Tasks(India)
import MarketingLeadsIndia from "./components/TeleMarketing/Tasks/India/MarketingLeadsIndia";
import NewLeads from "./components/TeleMarketing/Tasks/India/NewLeads";
import FollowUp from "./components/TeleMarketing/Tasks/India/FollowUp";
import Connected from "./components/TeleMarketing/Tasks/India/Connected";
import NotConnected from "./components/TeleMarketing/Tasks/India/NotConnected";

//Tele Marketing Tasks(books)
import MarketingLeadsBooks from "./components/TeleMarketing/Tasks/Books/MarketingLeadsBooks";
import ConnectedBooksMarketing from "./components/TeleMarketing/Tasks/Books/Connected"
import NewLeadsBooksMarketing from "./components/TeleMarketing/Tasks/Books/NewLeads"
import FollowUpBooksMarketing from "./components/TeleMarketing/Tasks/Books/FollowUp"
import NotConnectedBooksMarketing from "./components/TeleMarketing/Tasks/Books/NotConnected"



//Tele Sales
import TeleSales from "./components/TeleSales/TeleSales";
import TasksTeleSales from "./components/TeleSales/Tasks/Tasks";
import CampaignsTeleSales from "./components/TeleSales/Campaigns/Campaigns";

//Tele Sales Campaigns(india)
import SalesCampaignsIndia from "./components/TeleSales/Campaigns/India/SalesCampaignsIndia";

//Tele Sales Campaigns(books)
import SalesCampaignsBooks from "./components/TeleSales/Campaigns/Books/SalesCampaignsBooks";

//Tele Sales Tasks(India)
import SalesLeadsIndia from "./components/TeleSales/Tasks/India/SalesLeadsIndia";
import NewLeadsSalesIndia from "./components/TeleSales/Tasks/India/NewLeads"
import FollowUpSalesIndia from "./components/TeleSales/Tasks/India/FollowUp"
import ConnectedSalesIndia from "./components/TeleSales/Tasks/India/Connected"
import NotConnectedSalesIndia from "./components/TeleSales/Tasks/India/NotConnected"

//Tele Sales Tasks(books)
import SalesLeadsBooks from "./components/TeleSales/Tasks/Books/SalesLeadsBooks";
import NewLeadBooksSales from "./components/TeleSales/Tasks/Books/NewLead"
import FollowUpBooksSales from "./components/TeleSales/Tasks/Books/FollowUp"
import ConnectedBooksSales from "./components/TeleSales/Tasks/Books/Connected"
import NotConnectedBooksSales from "./components/TeleSales/Tasks/Books/NotConnected"


//BDM 
import Bdm from "./components/Bdm/Bdm";
import TasksBdm from "./components/Bdm/Tasks/Tasks"
import CampaignsBdm from "./components/Bdm/Campaigns/Campaigns"

//Bdm Campaigns(India)
import BdmCampaignsIndia from "./components/Bdm/Campaigns/India/BdmCampaignsIndia";

//Bdm Campaigns(books)
import BdmCampaignsBooks from "./components/Bdm/Campaigns/Books/BdmCampaignsBooks";

//Bdm Tasks(India)
import BdmTasksIndia from "./components/Bdm/Tasks/India/BdmTasksIndia";
import NewLeadsBdmIndia from "./components/Bdm/Tasks/India/NewLeads"
import FollowUpLeadsBdmIndia from "./components/Bdm/Tasks/India/FollowUp"
import ConnectedLeadsBdmIndia from "./components/Bdm/Tasks/India/Connected"
import NotConnectedLeadsBdmIndia from "./components/Bdm/Tasks/India/NotConnected"

//Bdm Tasks(Books)
import BdmTasksBooks from "./components/Bdm/Tasks/Books/BdmTasksBooks";





import MyReport from "./components/TeleSales/MyReport";

import SalesBooks from "./components/TeleSales/SalesBooks";



//Lead Generation
import LeaadGenerationNew from "./components/LeadGeneration/LeadGenerationNew";
import Partnership from "./components/LeadGeneration/Partnership";
import PrivateLtd from "./components/LeadGeneration/PrivateLtd";
import Proprietor from "./components/LeadGeneration/Proprietor";




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

      <Route path="leadsindia" element={<MarketingLeadsIndia />} />
      <Route path="leadsbooks" element={<MarketingLeadsBooks/>} />


      <Route path="loader" element={<Loader/>} />


     

      <Route path="campaignindiaorbooks" element={<Campaigns/>} />
      <Route path="leadsindiaorbooks" element={<Tasks/>} />
      <Route path="myreport" element={<MyReport/>} />
      <Route path="taskbooks" element={<SalesBooks/>} />  


      <Route path="partnership" element={<Partnership/>} />
      <Route path="privateltd" element={<PrivateLtd/>} />
      <Route path="proprietor" element={<Proprietor/>} />   



      <Route path="salestasksindiaorbooks" element={<TasksTeleSales/>} />      
      <Route path="salescampaignindiaorbooks" element={<CampaignsTeleSales/>} /> 

      <Route path="salescampaignsindia" element={<SalesCampaignsIndia/>} />      
      <Route path="salescampaignsbooks" element={<SalesCampaignsBooks/>} /> 

      <Route path="salesleadsindia" element={<SalesLeadsIndia/>} />
      <Route path="salesleadsbooks" element={<SalesLeadsBooks/>} />

      <Route path="new_leadsindia" element={<NewLeads />} />
      <Route path="followup_leadsindia" element={<FollowUp />} />
      <Route path="connected_leadsindia" element={<Connected/>} />
      <Route path="notconnected_leadsindia" element={<NotConnected/>} />
      
      <Route path="new_leadsmarketingbooks" element={<NewLeadsBooksMarketing/>} />  
      <Route path="followup_leadsmarketingbooks" element={<FollowUpBooksMarketing/>} />          
      <Route path="connected_leadsmarketingbooks" element={<ConnectedBooksMarketing/>} />      
      <Route path="notconnected_leadsmarketingbooks" element={<NotConnectedBooksMarketing/>} />  

      <Route path="new_leadssalesindia" element={<NewLeadsSalesIndia/>} />  
      <Route path="followup_leadssalesindia" element={<FollowUpSalesIndia/>} />  
      <Route path="connected_leadssalesindia" element={<ConnectedSalesIndia/>} />  
      <Route path="notconnected_leadssalesindia" element={<NotConnectedSalesIndia/>} /> 

      <Route path="new_leadssalesbooks" element={<NewLeadBooksSales/>} /> 
      <Route path="followup_leadssalesbooks" element={<FollowUpBooksSales/>} /> 
      <Route path="connected_leadssalesbooks" element={<ConnectedBooksSales/>} /> 
      <Route path="notconnected_leadssalesbooks" element={<NotConnectedBooksSales/>} /> 



      <Route path="bdmtasksindiaorbooks" element={<TasksBdm/>} /> 
      <Route path="bdmcampaignindiaorbooks" element={<CampaignsBdm/>} /> 

      <Route path="bdmcampaignsindia" element={<BdmCampaignsIndia/>} />      
      <Route path="bdmcampaignsbooks" element={<BdmCampaignsBooks/>} /> 

      <Route path="bdmtasksbooks" element={<BdmTasksBooks/>} /> 
      <Route path="bdmtasksindia" element={<BdmTasksIndia/>} /> 


      <Route path="new_leadsbdmindia" element={<NewLeadsBdmIndia/>} /> 
      <Route path="followup_leadsbdmindia" element={<FollowUpLeadsBdmIndia/>} /> 
      <Route path="connected_leadsbdmindia" element={<ConnectedLeadsBdmIndia/>} /> 
      <Route path="notconnected_leadsbdmindia" element={<NotConnectedLeadsBdmIndia/>} /> 





      
    </Route>
    </>
  )
)





function DashboardOrUserLeadGeneration() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Loader />;
  }

  if (user.role && user.role !== "field sales executive") {
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
