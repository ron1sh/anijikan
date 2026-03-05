export default function Footer(){
    return(
        
        <div className="text-white py-4  bg-[#282a36] w-full flex justify-between px-8 items-center ">
            <div className="list-none flex text-2xl gap-3 mx-auto">
                <li className="hover:cursor-pointer">Contact</li>
                <li className="hover:cursor-pointer">About us</li>
                <li className="hover:cursor-pointer">Queries</li>
            </div>
            <div className="flex items-end h-full ">Powered by Ronish</div>
        </div>
    );
}