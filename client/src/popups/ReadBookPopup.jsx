// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { toggleReadBookPopup } from '../store/slices/popUpSlice';

// const ReadBookPopup = ({book}) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
//       <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3 ">
//         <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
//           <h2 className="text-lg font-bold" >View Book Info</h2>
//           <button className="text-white text-lg font-bold" onClick={()=> dispatch(toggleReadBookPopup())}>&times;</button>
//         </div>

//         <div className="p-6">

//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold">Author</label>
//             <p className="border border-gray-300 px-4 py-2 bg-gray-100">
//               {book && book.author}
//             </p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold">Book Title</label>
//             <p className="border border-gray-300 px-4 py-2 bg-gray-100">
//               {book && book.title}
//             </p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold">Description</label>
//             <p className="border border-gray-300 px-4 py-2 bg-gray-100">
//               {book && book.description}
//             </p>
//           </div>
//         </div>
//         <div className="flex jusify-end px-6 py-4 bg-gray-100 rounded-b-lg">
//           <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" type="button" onClick={()=> dispatch(toggleReadBookPopup())} >Close</button>
//         </div>



//       </div>
//     </div>
//   )
// }

// export default ReadBookPopup


import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleReadBookPopup } from '../store/slices/popUpSlice';

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3 text-[#001F3F]">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#001F3F] text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">View Book Info</h2>
          <button
            className="text-white text-lg font-bold"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block font-semibold">Author</label>
            <p className="border-2 border-[#001F3F] px-4 py-2 bg-[#F0F4F8] rounded-md">
              {book?.author}
            </p>
          </div>

          <div>
            <label className="block font-semibold">Book Title</label>
            <p className="border-2 border-[#001F3F] px-4 py-2 bg-[#F0F4F8] rounded-md">
              {book?.title}
            </p>
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <p className="border-2 border-[#001F3F] px-4 py-2 bg-[#F0F4F8] rounded-md">
              {book?.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-[#F0F4F8] rounded-b-lg">
          <button
            className="px-4 py-2 bg-[#001F3F] text-white rounded-md hover:bg-[#003366]"
            type="button"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
