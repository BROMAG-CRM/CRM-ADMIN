import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import WifiCallingIcon from '@mui/icons-material/WifiCalling';
import GroupIcon from '@mui/icons-material/Group';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PolicyIcon from '@mui/icons-material/Policy';
import {NavLink} from "react-router-dom"


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


export const adminItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='admin' className="text-[10px] lg:text-[14px]">Admin</NavLink>, '/admin', <AdminPanelSettingsIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='users' className="text-[10px] lg:text-[14px]">Users</NavLink>, '/users', <GroupIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='telemarketing' className="text-[10px] lg:text-[14px]">Telemarketing</NavLink>, '/telemarketing', <AddIcCallIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='telesales' className="text-[10px] lg:text-[14px]">Telesales</NavLink>, '/telesales', <WifiCallingIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='bdm' className="text-[10px] lg:text-[14px]">BDM</NavLink>, '/bdm', <AddBusinessIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='legalmanagement' className="text-[10px] lg:text-[14px]">Legal Management</NavLink>, '/legalmanagement', <PolicyIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='accountsmanagement' className="text-[10px] lg:text-[14px]">Accounts Management</NavLink>, '/accountmanagemant', <ManageAccountsIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];


  
  export const marketingItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='telemarketing' className="text-[10px] lg:text-[14px]">Telemarketing</NavLink>, '/telemarketing', <AddIcCallIcon className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];



  export const salesItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='telesales' className="text-[10px] lg:text-[14px]">Telesales</NavLink>, '/telesales', <WifiCallingIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];



  export const bdmItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='bdm' className="text-[10px] lg:text-[14px]">BDM</NavLink>, '/bdm', <AddBusinessIcon className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];



  export const legalItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='legalmanagement' className="text-[10px] lg:text-[14px]">Legal Management</NavLink>, '/legalmanagement', <PolicyIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];



  export const accountsItems = [
    getItem(<NavLink to='/' className="text-[10px] lg:text-[14px]">Dashboard</NavLink>, '/', <DashboardCustomizeIcon className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='leadgeneration' className="text-[10px] lg:text-[14px]">Lead Generation</NavLink>, '/leadgeneration', <AccountCircleIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    getItem(<NavLink to='accountsmanagement' className="text-[10px] lg:text-[14px]">Accounts Management</NavLink>, '/accountmanagemant', <ManageAccountsIcon  className='!text-[17px] !text-[#CD5C08]'/>),
    // getItem(<div className='text-[10px] lg:text-[14px]'>Support</div>, 'sub3', <SupportAgentIcon className='!text-[17px] !text-[#CD5C08]' />, [
    //   getItem(<a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">Call</a>, '/call'),
    //   getItem(<a href="https://wa.me/9150289762" className="text-[10px] lg:text-[14px]">Whatsapp</a>, '/whatsapp'),
    //   getItem(<a href="mailto:example@example.com" className="text-[10px] lg:text-[14px]">Email</a>, '/email'),
    // ]),
  ];