// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { toggleReturnBookPopup } from '../store/slices/popUpSlice'
// import { returnBook } from '../store/slices/borrowSlice'

// const ReturnBookPopup = ({bookId, email}) => {
//   const dispatch = useDispatch()
//   const handleReturnBook = (e) => {
//     e.preventDefault();
//     dispatch(returnBook({email, bookId}));
//     dispatch(toggleReturnBookPopup());
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
//           <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
//             <div className="p-6">
//               <h3 className="text-xl font-bold mb-4">Return Book</h3>
//               <form onSubmit={handleReturnBook}>
//                 <div className="mb-4">
//                   <label className="block text-gray-900 font-medium">User Email</label>
//                   <input type="email" 
//                   defaultValue={email} 
//                   placeholder="Borrower's Email"
//                   className="w-full px-4 py-2 border-2 border-black rounded-md"
//                    required
//                    disabled
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" 
//                   type="button" 
//                   onClick={()=>{dispatch(toggleReturnBookPopup())}}
//                   >
//                     Close
//                   </button>
//                   <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Return</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default ReturnBookPopup


import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleReturnBookPopup } from '../store/slices/popUpSlice';
import { returnBook } from '../store/slices/borrowSlice';

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();

  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBook({ email, bookId }));
    dispatch(toggleReturnBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3 text-[#001F3F]">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block font-medium">User Email</label>
              <input
                type="email"
                defaultValue={email}
                disabled
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-[#001F3F] rounded-md bg-gray-100 text-[#001F3F]"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-[#001F3F] rounded-md hover:bg-gray-300"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#001F3F] text-white rounded-md hover:bg-[#003366]"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
