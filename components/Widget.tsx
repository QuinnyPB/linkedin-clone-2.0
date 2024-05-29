function Widget() {
  return (
    <div className="ml-6 h-[790px] max-h-[790px]">
      {/* <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:share:7186102330092638208"
        title="Embedded post"
        className="w-fit 2xl:min-w-[400px] h-full"
      /> */}
      <div className="flex flex-col justify-center items-center overflow-hidden bg-white mr-6 rounded-lg border py-4 ">
        <h1 className="text-lg self-start px-4">
          <b>LinkedIn-2.0 News</b>
        </h1>
        <h2 className="text-gray-400 self-start px-4">
          <b>Top Stories</b>
        </h2>

        <ul className="self-start text-sm items-center overflow-hidden">
          <div className="cursor-pointer wm-full">
            <li className="py-2 px-4 hover:bg-gray-200">
              AI becoming more advanced
            </li>
          </div>
          <div className="cursor-pointer wm-full">
            <li className="py-2 px-4  hover:bg-gray-200">
              When will something interesting happen?
            </li>
          </div>
          <div className="cursor-pointer wm-full">
            <li className="py-2 px-4  hover:bg-gray-200">
              Insufficient microchips in markets?
            </li>
          </div>
          <div className="cursor-pointer wm-full">
            <li className="py-2 px-4  hover:bg-gray-200">
              New generation of laptops upon us?
            </li>
          </div>
          <div className="cursor-pointer wm-full">
            <li className="py-2 px-4  hover:bg-gray-200">How to get gud</li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Widget;
