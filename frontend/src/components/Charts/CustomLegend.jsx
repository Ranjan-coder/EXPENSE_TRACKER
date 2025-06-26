import React from 'react' 

const CustomLegend = ({ payload }) => {
    // console.log('Legend Payload:1 : ',payload.map((entry, index) => (entry.value)))
    // console.log('Legend Payload:', payload); // Debug
    // if (!payload) return null;
    return (
        <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
            {payload.map((entry, index) => (
                <div key={`legend-${index}`}
                    className='flex items-center space-x-2' >
                    <div className='w-2.5 h-2.5 rounded-full'
                        style={{ backgroundColor: entry.color }}>
                    </div>
                    <span className='text-xs text-gray-700 font-medium'>
                        {entry.value}
                        </span>
                </div>
            ))}
        </div>
    )
}

export default CustomLegend







// import React from 'react'

// const CustomLegend = ({ payload }) => {
//     console.log('Legend Payload:1 : ',payload.map((entry, index) => (entry.value)))
//     // console.log('Legend Payload:', payload); // Debug
//     if (!payload) return null;
    
//     const firstItem = payload[0]?.payload;
//     console.log('Legend Payload:', firstItem.name, firstItem.amount); // Debug
//     return (
//         <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
//             {payload.map((entry, index) => (
//                 <div key={`legend-${index}`}
//                     className='flex items-center space-x-2' >
//                     <div className='w-2.5 h-2.5 rounded-full'
//                         style={{ backgroundColor: entry.color }}>
//                     </div>
//                     <span className='text-xs text-gray-700 font-medium'>
                        
//                         </span>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default CustomLegend



// import React from 'react';

// const CustomLegend = ({ payload }) => {
//   if (!payload || payload.length === 0) return null;

//   const firstItem = payload[0]?.payload;

//   return (
//     <div className='flex flex-col items-center mt-4'>
//       {/* ✅ Circle with first item data */}
//       <div className='flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-gray-300'>
//         <span className='text-xs text-gray-500'>{firstItem?.name}</span>
//         <span className='text-lg font-semibold text-gray-800'>${firstItem?.amount}</span>
//       </div>

//       {/* ✅ Regular Legend below */}
//       <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
//         {payload.map((entry, index) => (
//           <div key={`legend-${index}`} className='flex items-center space-x-2'>
//             <div
//               className='w-2.5 h-2.5 rounded-full'
//               style={{ backgroundColor: entry.color }}
//             ></div>
//             <span className='text-xs text-gray-700 font-medium'>
//               {entry.payload?.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomLegend;
