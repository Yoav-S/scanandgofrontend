import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import { Icon, Text, ListItem } from '@rneui/themed';
const HelpAndSupportScreen: React.FC = () => {
    const [isForgotPasswordExpanded, setIsForgotPasswordExpanded] = useState(false);
    const [isEditInformationExpanded, setIsEditInformationExpanded] = useState(false);
    const [isReportAProblemExpanded, setIsReportAProblemExpanded] = useState(false);
    const [isCompleteAPurchaseExpanded, setIsCompleteAPurchaseExpanded] = useState(false);
    const [isHandleCreditCardExpanded, setIsHandleCreditCardExpanded] = useState(false);


    const forgotPassword = (
        <ListItem.Accordion
          style={styles.accordion}
          bottomDivider
          content={
            <View style={styles.accordionHeaderBlank}>
              <View style={styles.accordionHeader}>
                <Icon name={`lock`} style={styles.icon} type={'font-awesome'} />
                <Text>How To Reset Your Password</Text>
              </View>
            </View>
    
          }
          isExpanded={isForgotPasswordExpanded}
          onPress={() => { setIsForgotPasswordExpanded(!isForgotPasswordExpanded) }}
        >
          <View style={styles.explainContainer}>
            <Text style={styles.explainHeader}>Option 1: If You Know The Password: </Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1.1 - Press the settings icon on the navigation bar.</Text>
              <Text style={styles.explainText}>1.2 - Choose the Security Tab.</Text>
              <Text style={styles.explainText}>1.3 - Fill the form and click the update button</Text>
            </View>
            <Text style={styles.explainHeader}>Option 2: If You Don't Know The Password: </Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>2.1 - Press the settings icon on the navigation bar.</Text>
              <Text style={styles.explainText}>2.2 - Choose the Security Tab.</Text>
              <Text style={styles.explainText}>2.3 - Click the "Forgot Password" link below the "Repeat Password" field</Text>
              <Text style={styles.explainText}>2.4 - Enter your email address and click the "Send" button.</Text>
              <Text style={styles.explainText}>2.5 - You'll receive a 4 digits code to your email (wait up to 1 minute)</Text>
              <Text style={styles.explainText}>2.6 - Enter the digits and press the "Verify OTP" button.</Text>
              <Text style={styles.explainText}>2.7 - Enter the new password and repeat it exactly.</Text>
              <Text style={styles.explainText}>2.8 - Click the button and you're done.</Text>
            </View>
          </View>
    
    
        </ListItem.Accordion>
      );
      const editInformation = (
        <ListItem.Accordion
          bottomDivider
          style={styles.accordion}
    
          content={
            <View style={styles.accordionHeaderBlank}>
              <View style={styles.accordionHeader}>
                <Icon name={'edit'} solid={false} style={styles.icon} type={'font-awesome'} />
                <Text>How To Edit Your Information</Text>
              </View>
            </View>
          }
          isExpanded={isEditInformationExpanded}
          onPress={() => { setIsEditInformationExpanded(!isEditInformationExpanded) }}
        >
          <View style={styles.explainContainer}>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1 - Press the settings icon on the navigation bar. </Text>
              <Text style={styles.explainText}>2 - Choose the "Edit Profile" tab.</Text>
              <Text style={styles.explainText}>3 - Fill the form and click the "Submit" button.</Text>
            </View>
          </View>
        </ListItem.Accordion>
      );
      const reportAProblem = (
        <ListItem.Accordion
          bottomDivider
          style={styles.accordion}
          content={
            <View style={styles.accordionHeaderBlank}>
              <View style={styles.accordionHeader}>
                <Icon name={`bug`} style={styles.icon} type='font-awesome' />
                <Text>How To Report a Problem</Text>
              </View>
            </View>
          }
          isExpanded={isReportAProblemExpanded}
          onPress={() => { setIsReportAProblemExpanded(!isReportAProblemExpanded) }}
        >
         <View style={styles.explainContainer}>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1 - Press the settings icon on the navigation bar. </Text>
              <Text style={styles.explainText}>2 - Choose the "Report a Problem" tab.</Text>
              <Text style={styles.explainText}>3 - Select the problem Type.</Text>
              <Text style={styles.explainText}>4 - Add a screenshot from gallery (optional)</Text>
              <Text style={styles.explainText}>5 - Describe the problem in the text field and press the report button</Text>
            </View>
          </View>
        </ListItem.Accordion>
      );
      const howToCompleteAPurchase = (
        <ListItem.Accordion
          style={styles.accordion}
          bottomDivider
          content={
            <View style={styles.accordionHeaderBlank}>
              <View style={styles.accordionHeader}>
                <Icon name={'cart-outline'} style={styles.icon} type='ionicon' />
                <Text>How To Complete a Purchase</Text>
              </View>
            </View>
          }
          isExpanded={isCompleteAPurchaseExpanded}
          onPress={() => { setIsCompleteAPurchaseExpanded(!isCompleteAPurchaseExpanded) }}
        >
          <View style={styles.explainContainer}>
            <Text style={styles.explainHeader}>Step 1: Scan An Item And Add To Cart: </Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1.1 - Enable NFC in your device.</Text>
              <Text style={styles.explainText}>1.2 - Press the NFC  button on the navigation bar and hold the back of the phone near the tag.</Text>
              <Text style={styles.explainText}>1.3 - After the scan the item will appear on the screen.</Text>
              <Text style={styles.explainText}>1.4 - Press the cart icon below the image of the item.</Text>
              <Text style={styles.explainText}>1.5 - Repeat the process to add more items.</Text>
              <Text style={styles.explainText}>1.6 - If you noticed an error message <Text onPress={() => setIsReportAProblemExpanded(!isReportAProblemExpanded)} style={styles.clickHere} >click here</Text> and refer to  "How To Report a Problem" Tab below.</Text>
            </View>
            <Text style={styles.explainHeader}>Step 2: Checkout And Payment:</Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>2.1 - Press the cart icon on the navigation bar.</Text>
              <Text style={styles.explainText}>2.2 - View your  items and press the Checkout button. </Text>
              <Text style={styles.explainText}>2.3 - Choose the credit card for the payment.</Text>
              <Text style={styles.explainText}>2.4 - If you haven't added a credit card <Text onPress={() => setIsHandleCreditCardExpanded(!isHandleCreditCardExpanded)} style={styles.clickHere} >click here</Text> and refer to  "How To Add/Remove a Credit Card" Tab below. </Text>
              <Text style={styles.explainText}>2.5 - Enter a coupon to the field if you have one.</Text>
              <Text style={styles.explainText}>2.6 - Click the Pay Now button.</Text>
            </View>
          </View>
        </ListItem.Accordion>
      );
      const howToHandleCreditCard = (
        <ListItem.Accordion
          style={styles.accordion}
          bottomDivider
          content={
            <View style={styles.accordionHeaderBlank}>
              <View style={styles.accordionHeader}>
                <Icon name={`credit-card`} style={styles.icon} type='font-awesome' />
                <Text>How To Add / Remove a Credit Card</Text>
              </View>
            </View>
          }
          isExpanded={isHandleCreditCardExpanded}
          onPress={() => { setIsHandleCreditCardExpanded(!isHandleCreditCardExpanded) }}
        >
           <View style={styles.explainContainer}>
            <Text style={styles.explainHeader}>Add a New Credit Card: </Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1 - Press the settings icon on the navigation bar. </Text>
              <Text style={styles.explainText}>2 - Choose the "Payment Methods" tab.</Text>
              <Text style={styles.explainText}>3 - On the top right corner press the "Add New" button.</Text>
              <Text style={styles.explainText}>4 - Fill the form with your credit card details.</Text>
              <Text style={styles.explainText}>5 - Choose as default payment method (optional)</Text>
              <Text style={styles.explainText}>6 - Click the "Add Card" button.</Text>
            </View>
            <Text style={styles.explainHeader}>Remove an Existing Credit Card: </Text>
            <View style={styles.explainContainer}>
              <Text style={styles.explainText}>1 - Press the settings icon on the navigation bar. </Text>
              <Text style={styles.explainText}>2 - Choose the "Payment Methods" tab.</Text>
              <Text style={styles.explainText}>3 - Click the trash icon on the card you wish to remove.</Text>
              <Text style={styles.explainText}>4 - Click "Remove" on the pop up message.</Text>
            </View>
          </View>
        </ListItem.Accordion>
      );
    
      const list = (
        <ScrollView>
          {howToCompleteAPurchase}
          {forgotPassword}
          {editInformation}
          {reportAProblem}
          {howToHandleCreditCard}
        </ScrollView>
      );


      return (
        <View style={styles.container}>
          {list}
        </View>
      );
}
export default HelpAndSupportScreen
const styles = StyleSheet.create({
    clickHere:{
      color:'blue',
      fontWeight:'bold'
    },
    explainContainer: {
      marginLeft: 10,
      marginRight: 5,
      marginBottom:7,
    },
    explainHeader: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      marginTop:10,
    },
    explainText: {},
    container: {
      flex: 1,
    },
    accordion: {
      marginBottom: 8,
    },
    icon: {
      marginRight: 0,
      width: 50,
  
    },
    accordionHeaderBlank: {
      width: '90%',
    },
    accordionHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
  
    }
  
  });


//   <View style={styles.explainContainer}>
//         <Text style={styles.explainHeader}> </Text>
//         <View style={styles.explainContainer}>
//           <Text style={styles.explainText}>1.1 - </Text>
//           <Text style={styles.explainText}>1.2 - </Text>
//           <Text style={styles.explainText}>1.3 - </Text>
//           <Text style={styles.explainText}>1.4 - </Text>
//           <Text style={styles.explainText}>1.5 - </Text>
//         </View>
//    </View>