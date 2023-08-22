import AdminNavbar from "@/components/shared/Header/Admin/AdminNavbar";
import Head from "next/head";
import Link from "next/link";

const AdminLayout = ({children,title}) => {
    return (
       <div className="w-full container mx-auto">
        <Head>
            <title>{title}</title>
        </Head>
        <AdminNavbar />
         <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex p-4">
          {children}
         
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="admin-drawer" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><Link href={'/admin'}>Dashboard</Link></li>
            <li><Link href={'/admin/subcategory'}>Subcategory</Link></li>
            <li><Link href={'/admin/category'}>Category</Link></li>
            <li><Link href={'/admin/company'}>Company</Link></li>
            <li><Link href={'/admin/image'}>Image</Link></li>
          </ul>
        
        </div>
      </div>
       </div>
    );
};

export default AdminLayout;