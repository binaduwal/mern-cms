import React from 'react'

const ScoreScale = ({ieltsScore,pteScore,remarks}) => {
  return (
    <section className=' flex items-center ml-[1rem] relative bg-white drop-shadow border-2 border-gray-200 w-fit rounded-l-full rounded-r-full px-5'>
        <p className=' py-3 rounded-l pr-4  border-r-2 border-gray-100' >{ieltsScore}</p>
        {/* <h6 className=' bg-indigo-400 text-white h-fit py-3 pl-2.5  w-[15%] '>IELTS</h6> */}
        
        <img src='/tests/ielts.jpg' className=' h-[3.2rem] pl-2 pr-16 py-2 '/>
        <div className=' absolute -top-[45%] left-[34%]'>
          <div className=' rounded-full bg-neutral-600 size-[5.8rem] p-1 text-center content-center  drop-shadow-lg ring-4 ring-white '>
            <p className='text-white small-text'>{remarks}</p>
          </div>
        </div>
        <img src='/tests/pearson.png' className=' h-[3.2rem] pr-2 pl-16 py-2'/>
        <p className=' text-center  py-3 rounded-r pl-4 border-l-2 border-gray-100'>{pteScore}</p>
      
    </section>
  )
}

export default ScoreScale
