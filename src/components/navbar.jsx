import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full min-h-[60px] bg-white drop-shadow flex items-center px-4 justify-between text-black">
      <Link href="/">
        <p className="font-[15px] capitalize text-[#052A49] font-bold">
          my brand
        </p>
      </Link>
      <div className="flex items-center gap-x-2">
        <div className="rounded-full bg-gradient-to-r from-[#72CBEE] to-[#1BA8DF] p-1 w-8 h-8">
          <p className="text-white">CR</p>
        </div>
        <p className="text-sm">Cooper Rosser</p>
      </div>
    </div>
  );
};

export default Navbar;
