import SideNav from '@/app/ui/components/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-screen overflow-hidden flex-col md:flex-row md:overflow-hidden bg-dashboard">
      <div className=" flex-none w-1/5 bg-white border-r-2 border-y-dashboard-separator" >
        <SideNav />
      </div>
      <div className="flex-grow h-screen overflow-hidden w-4/5">{children}</div>
    </div>
  );
}