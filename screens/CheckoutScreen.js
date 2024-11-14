// import { useStripe } from "@stripe/stripe-react-native";
// import { Alert, Button } from 'react-native';
// import { useEffect, useState } from "react";
// import { Screen } from "react-native-screens";
// import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const API_URL = "http://10.0.0.242:4242";
// export default function CheckoutScreen({ route }) {
//   const { totalCost, itemName } = route.params;
//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [loading, setLoading] = useState(false);
  
//     const fetchPaymentSheetParams = async () => {
//          console.log('Total Cost:', totalCost); // Debug value
    
//       const amountInCents = Math.round(totalCost * 100); // Convert dollars to cents
    
//       if (isNaN(amountInCents) || amountInCents <= 0) {
//         console.error('Invalid amount:', amountInCents);
//         Alert.alert('Invalid amount for payment'); // User feedback
//         return;
//       }
//       const response = await fetch(`${API_URL}/payment-sheet`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: totalCost * 100, 
//         }),
//       });
//       const { paymentIntent, ephemeralKey, customer } = await response.json();

//       console.log('Payment Details:', {
//         customer,
//         ephemeralKey,
//         paymentIntent,
//         totalCost,
//       });

//       // Save the payment details in Firestore under "Payment" collection
//     await addDoc(collection(db, 'Payment'), {
//       customerId: customer,
//       ephemeralKey,
//       paymentIntent,
//       amountPaid: totalCost,
//       timestamp: Timestamp.now(),
//     });
  
//       return {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//       };

      
//     };
    
  
//     const initializePaymentSheet = async () => {
//       const {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//       } = await fetchPaymentSheetParams();
  
//       const { error } = await initPaymentSheet({
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         merchantDisplayName: 'Social Garden',
//         defaultBillingDetails: {
//           name: 'Jane Doe',
//         }
//       });
//       if (error) {
//         console.error('Init Payment Sheet Error:', error);
//         Alert.alert('Payment Initialization Failed', error.message);
//         return;
//       }
//       if (!error) {
//         console.log("Payment Sheet initialized successfully");
//         setLoading(true);
//       }
//     };
  
//     const openPaymentSheet = async () => {
//         const { error } = await presentPaymentSheet();
    
//         if (error) {
//           Alert.alert(`Error code: ${error.code}`, error.message);
//         } else {
//           Alert.alert('Success', 'Your order is confirmed!');
//         }
//       };
    
  
//     useEffect(() => {
//       initializePaymentSheet();
//       console.log(`Item Name: ${itemName}, Total Cost: ${totalCost}`);
//     }, []);
  
//     return (
//       <Screen>
//         <Button
//           variant="primary"
//           disabled={!loading}
//           title="Checkout"
//           onPress={openPaymentSheet}
//         />
//       </Screen>
//     );
//   }