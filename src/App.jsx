import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider,Outlet,Navigate } from 'react-router-dom'
import Searchpage from "./components/Searchpage";
import Footer from "./components/Footer";

function Layout(){
    return(
        <div className="min-h-screen w-screen bg-[#151721] flex flex-col items-center gap-[2rem]  ">
            <Navbar />
            <main className="flex-1 w-full flex flex-col items-center"> 
                <Outlet />
            </main>
            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    )
}
export default function App(){
    const router=createBrowserRouter([{
        path:"/",
        element:<Layout />,
        children:[
            {index: true, element: <Navigate to="/anime" replace />},
            {path:"anime",element:<Searchpage type="anime"/>},
            {path:"manga",element:<Searchpage type="manga"/>},
            {path:"anime/:query",element:<Searchpage type="anime"/>},
            {path:"manga/:query",element:<Searchpage type="manga"/>}
        ]
    }])
    return(
        <>
            <RouterProvider router={router}/>
        </>
    );
}