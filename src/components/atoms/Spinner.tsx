import logo from "../../../public/monifai.svg";

export const Spinner = () => {
  return (
    <div className="relative w-28 h-28 flex justify-center items-center p-6">
      <img src={logo} alt="logo" className="w-full h-full object-contain" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="animate-spin duration-75 rounded-full w-full h-full border-t-4 border-[#0f28b8]"></div>
      </div>
    </div>
  );
};
