// import { StripeProvider } from '@stripe/stripe-react-native';
// import React, { useState, useEffect } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import PaymentScreen from './PaymentScreen';
// import CheckoutScreen from './CheckoutScreen';

// const Stack = createStackNavigator();

// function StripeInitialization() {
//   const [publishableKey, setPublishableKey] = useState('');

//   const fetchPublishableKey = async () => {
//     const key = await fetchKey('http://10.0.0.242:4242/config'); // fetch key from your server here
//     setPublishableKey(key);
//   };

//   useEffect(() => {
//     fetchPublishableKey();
//   }, []);

//   return (
//     <StripeProvider
//       publishableKey={publishableKey}
//     >
//        <NavigationContainer>
//         <Stack.Navigator initialRouteName="PaymentScreen">
//           <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//           <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
      
//     </StripeProvider>
//   );
// }

// export default StripeInitialization;