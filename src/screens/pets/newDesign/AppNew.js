// import  React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import GuardianDetailsScreen from './screens/GuardianDetails';
// import VetDetailsScreen from './screens/VetDetails';
// import { MaterialCommunityIcons } from 'react-native/vector-icons';
// import { Feather } from 'react-native/vector-icons';
// import { FontAwesome5 } from 'react-native/vector-icons';
// import InsuranceScreen from './screens/Insurance';
// import BreederScreen from './screens/Breeder';
// import DrawerItems from './constants/DrawerItems';



// const Drawer = createDrawerNavigator();

// export default function AppNew() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator 
//         drawerType="front"
//         initialRouteName="VetDetailsScreen"
//         drawerContentOptions={{
//           activeTintColor: '#e91e63',
//           itemStyle: { marginVertical: 10 },
//         }}
       
//       >
       
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }


// <Drawer.Navigator 
//         drawerType="front"
//         initialRouteName="VetDetails"
//         drawerContentOptions={{
//           activeTintColor: '#e91e63',
//           itemStyle: { marginVertical: 10 },
//         }}
       
//       >
//         {
//           DrawerItems.map(drawer=><Drawer.Screen 
//             key={drawer.name}
//             name={drawer.name} 
//             options={{
//             drawerIcon:({focused})=>
//              drawer.iconType==='Material' ? 
//               <MaterialCommunityIcons 
//                   name={drawer.iconName}
//                   size={24} 
//                   color={focused ? "#e91e63" : "black"} 
//               />
//             :
//             drawer.iconType==='Feather' ?
//               <Feather 
//                 name={drawer.iconName}
//                 size={24} 
//                 color={focused ? "#e91e63" : "black"} 
//               /> 
//             :
//               <FontAwesome5 
//                 name={drawer.iconName}
//                 size={24} 
//                 color={focused ? "#e91e63" : "black"} 
//               />
//             ,
//                 headerShown:true,
//                 header: ({ scene }) => {
//                   const { options } = scene.descriptor;
//                   const title =
//                     options.headerTitle !== undefined
//                       ? options.headerTitle
//                       : options.title !== undefined
//                       ? options.title
//                       : scene.route.name;
                
//                   return (
//                     <Header screen={title}/>
//                   );
//                 }
          
//             }} 
//             component={
//               drawer.name==='VetDetails' ? VetDetailsScreen
//                 : drawer.name==='GuardianDetails' ? GuardianDetailsScreen 
//                   : drawer.name==='Insurance' ? InsuranceScreen
//                     : ReferScreen
//             } 
//           />)
//         }
//       </Drawer.Navigator>