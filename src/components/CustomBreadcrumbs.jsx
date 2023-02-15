// import { tokens } from "@/theme/theme";
// import { Box, Breadcrumbs, useTheme } from "@mui/material";
// import Link from "next/link";
// // import { usePathname } from "next/navigation";
// import React from "react";

// const CustomBreadcrumbs = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   // const pathname = usePathname();

//   // let routes = pathname.split("/");
//   // let str = "";
//   // let hlinks = [];
//   // routes.forEach((i, index, arr) => {
//   //   if (i.charAt(0) == "[") {
//   //     i = i.slice(1);
//   //     i = i.slice(0, i.length - 1);
//   //     arr[index] = pathname[i];
//   //   }
//   //   str = str + arr[index] + "/";
//   //   hlinks.push(str);
//   // });


//   return (
//     <Box bgcolor={colors.secondary[100]} p={1.5} borderRadius={1} mb={2} mt={1}>
//       <Breadcrumbs aria-label="breadcrumb">
//         {routes.map((item, index) => {
//           return (
//             item !== "" && (
//               <Link to={hlinks[index]} key={index} style={{ color: colors.secondary[500] , textDecoration : "none" }}>
//                 {item}
//               </Link>
//             )
//           );
//         })}
//       </Breadcrumbs>
//     </Box>
//   );
// };

// export default CustomBreadcrumbs;
