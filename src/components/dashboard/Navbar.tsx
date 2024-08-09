const Navbar = () => {
    return (
        <div className="bg-white border-l-2 h-[50px] ps-[35px] gap-10 text-gray-700 hidden md:flex items-center justify-start w-full text-sm">
            <div className="cursor-pointer">
                Blogs
            </div>
            <div className="cursor-pointer">
                News
            </div>
            <div className="cursor-pointer">
                Help center
            </div>
            <div className="cursor-pointer">
                Customer care
            </div>
        </div>
    )
}

export default Navbar