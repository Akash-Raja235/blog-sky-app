

// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import axios from 'axios';
// import React, { useState } from 'react'
// import { NavLink, useParams,Link, useSearchParams } from 'react-router-dom';
// import { Category } from '../assets/Data';
// const Search = () => {

//   const [Catdata, setCatData] = useState('')

//  const nagivate = useParams()
//   // const getPostBtcat = async(e)=>{
    
//   //   setCatData(e.target.value);
      
//   //   }
//   //   console.log(Catdata);

//   //    onChange = { getPostBtcat };
   
//   const [searchParam] = useSearchParams()
//   const path = searchParam.get("category");
 
 

//   return (
//     <>
//       <FormControl sx={{ m: 1, minWidth: 400 }}>
//          <InputLabel> All post</InputLabel>
//         <Select>
//           {Category.map((categoryItem)=>{

//            return (
//              <MenuItem
//                component={Link}
//                to={`/home/search?category=${path}`}
//                key={categoryItem}
//                value={categoryItem}
//              >
//                {categoryItem}
//              </MenuItem>
//            );


//           })}
          
//         </Select>
//       </FormControl>
//     </>
//   );
// }

// export default Search