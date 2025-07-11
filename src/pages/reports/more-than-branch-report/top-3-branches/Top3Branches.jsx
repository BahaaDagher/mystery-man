import React from 'react'

const Top3Branches = () => {
  const ApiData = [
    { name: "branch 1", value: 60 },
    { name: "branch 2", value: 100 },
    { name: "branch 3", value: 50 },
  ];



  return (
    <div className='bg-white rounded-[12px] p-6 '>
        <div className=' font-bold text-[22px] leading-[28px] '> Top 3 branches in terms of rating</div>
        <hr className='border-gray_l'/>
        <div className="flex flex-col gap-4 mt-8">
          {ApiData.map((branch, idx) => (
            <div key={idx} className="w-full">
              <div className="text-black font-bold text-[14px]">{branch.name}</div>
              <div
                className="bg-[#3734CA] rounded-md h-8 "
                style={{
                  width: `${branch.value}%`, // 250px is the max bar width
                  minWidth: "1px",
                  transition: "width 0.3s"
                }}
              ></div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Top3Branches