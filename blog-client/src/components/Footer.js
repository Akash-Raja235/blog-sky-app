import { Stack, Typography,Link } from '@mui/material'
import React from 'react'

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" sx={{m:0,p:0}}>
        <Typography sx={{mt:1}} variant="body2">Copyright@2022</Typography>
       
        <Stack direction="row" spacing={2}><Link href="https://github.com/Akash-Raja235"> <GitHubIcon/></Link>
        <Link href="https://www.facebook.com/profile.php?id=100034510329034"> <FacebookIcon/></Link>
        <Link href="https://www.linkedin.com/in/akash-raja-best-codder/"> <LinkedInIcon/></Link></Stack>
      </Stack>
    </>
  );
}

export default Footer