import { Asset } from "react-native-image-picker";
import {TextInput} from 'react-native'
export interface Theme {
    colors:
    {
      primary: string;
      secondary:string;
      background: string;
      text:{
        primary: string;
        secondary: string;
      }
    },
    fonts:
    {
      regular: string;
      bold: string; 
    },
  
  }
export interface PaginationResponse<T> {
    list: T[];
    pageNumber: number;
    isMore: boolean
}
export interface CurrentUserType {

    _id: string;

    fullName: string;

    roles: string[]

    email: string;

    creditCards: creditCardType[];

    password: string;

    cart: IteminCartType[]

    gender: string

    birthDate: Date

    isActive: boolean

    schemaVersion: number

    deviceToken: string

    createdAt: Date

    transactionsAmount: number

    lastActivity: Date

    recentItems: recentItemType[]

    recentTransactions: recentTransaction[]
}
export  interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    lightTheme: Theme;
    darkTheme: Theme;
    buttonTheme:IButtonTheme

}
export interface IText{
    primary: string;
    secondary: string;
}
export interface IButtonTheme{
    buttonMain:{
      background: string; 
      text: string; 
    },
    buttonAlt:{
      background: string; 
      text: string; 
    },
  }
  export interface StyleButton{
    background: string; 
    text: string; 
  }
export interface Props {
    children?: React.ReactNode
}
export interface CouponType{
_id: string;
discountPercentage: number;
}
export interface IStats {
    year?: number
    label: string
    value: number
    date?: Date
}
export interface TransactionFormType{
    userId: string;
    cardId: string;
    totalAmount: number;
    products: productInTransaction[];
    couponId: string;
}

export interface recentTransaction {
    _id: string;
    totalAmount: number
    formattedDate: string
    cardType: string
    cardNumber: string
    couponDiscountAmount?: number
}
export interface ItemHorizontalType{
cartItem: IteminCartType;
totalAmount: number;
}
export interface recentItemType{
imageSource: string;
itemId: string;
name: string;
}
export interface DataContextType {
    currentUser: CurrentUserType | null;
    isMessageModalVisible: boolean;
    isAreYouSureModalOpen: boolean;
    cardId: string;
    isTermsModal: boolean;
    isTermsButtonPressed: boolean;
    setisTermsButtonPressed: (isTermsButtonPressed: boolean) => void;
    setisTermsModal: (isTermsModal: boolean) => void;
    setcardId: (cardId: string) => void;
    setisAreYouSureModalOpen: (value: boolean) => void;
    getMoreAttemt: (pageNumber: string) => Promise<any>;
    getItemAttempt: (itemId: string) => Promise<any>;
    fetchStatsDataAttempt: (userId: string) => Promise<any>;
    setisMessageModalVisible: (value: boolean) => void;
    isLogoutModal: boolean;
    updatedCurrentUserCart: IteminCartType[] | undefined;
    setupdatedCurrentUserCart: (updatedCurrentUserCart:(IteminCartType[] | undefined)) => void;
    setisLogoutModal: (value: boolean) => void;
    setCurrentUser: (user: CurrentUserType | null) => void;
    getArrayOfDropDownCategories: () => Promise<string[]>;
    getFullTransaction: (id: string) => Promise<[boolean,recentTransaction?]>;
    authenticated: boolean;
    addCreditCardAttempt: (values: creditCardFormType) => Promise<[boolean, string | null]>
    PaymentAttempt: (transactionObject: TransactionFormType) => Promise<boolean>;
    verifyCouponAttempt: (coupon: string) => Promise<[boolean, CouponType | null]>;
    setamountofitemsvariable: (amount: number) => void;
    amountofitemsvariable: number;
    AddItemToCartAttempt: (userId: string, itemInCart: {itemId: string, nfcTagCode: string}) => Promise<[boolean, IteminCartType | null]>;
    deleteCardAttempt: (cardId: string, userId: string) => Promise<[boolean, string | null]>;
    handleLogOut: () => void;
    deleteItemAttempt: (userId: string, nfcTagCode: string) => Promise<[boolean,IteminCartType[]?]>;
    changeDefaultCardAttempt: (cardId: string) => Promise<boolean>;
    updatePasswordAttempts: (password: string, newpassword: string) => Promise<[boolean, string | null]>;
    updateDetailsAttempt: (email: string, fullName: string, gender: string, birthDate: string) => Promise<boolean>;
    resetPassword: (password: string, userId: string) => Promise<boolean>;
    signupAttempt: (newUser: Registergion_Form_Props) => Promise<[boolean, string, string?]>;
    verifyEmail: (email: string) => Promise<[boolean, string, Date?, string?]>;
    showToast: (message: string, status: string, header: string) => void;
    token: string;
    isVisibleStatus: boolean;
    setisVisibleStatus: React.Dispatch<React.SetStateAction<boolean>>;
    uploadReport: (currentAsset : Asset | null, currentCategoryValue : string, appVersionValue: string , description : string, osValue : string, systemVersionValue : string, deviceModel: string) => Promise<[boolean, string]>;
    uploadFile: (currentAsset : Asset) => Promise<string>;
    getUserById: (id: string, token: string) => Promise<CurrentUserType | null>; // get a user by Id and set CurrantUser state.
    setToken: React.Dispatch<React.SetStateAction<string>>;
    updateDeviceToken: (userId: string) => Promise<void>;
    autoLoginNewUser: (newToken: string) => Promise<void>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
}
export interface BottomNavbarInterface {
}
export interface ImageCarouselProps{
    data: recentItemType[];

}
export interface TransactionCompType{
transaction: recentTransaction;
handleshowToast: () => void;
}
// interfaces/interfaces.tsx
export interface CreditCardAbstractCompType {
    creditCard: creditCardType;
    onPress?: (cardId: string) => void | undefined; // Make onPress an optional function
    isChecked?: boolean; // Add the isChecked prop
}
export interface CreateTransactionDto {
    userId: string;
    cardId: string;
    couponId?: string;
    totalAmount: number;
    products: ITransactionItem[]
    couponDiscountAmount?: number;
}
export interface ITransactionItem {
    itemId: string
    nfcTagCode: string
    imageSource: string
    name: string
    price: number
 }
export interface ITransaction {
    _id?: string;
    userId: string
    cardNumber: string
    cardType: string
    totalAmount: number
    products: ITransactionItem[]
    schemaVersion: number
    formattedDate: string
    createdAt: Date
    couponDiscountAmount?: number

}
export interface Itemprop{
_id: string
name: string;
category: string;
price: number;
imageSource: string;
fabric: string;
gender: string;
season: string;
colors: string[]
createdAt: Date 
} 
export interface productInTransaction{
nfcTagCode: string;
itemId: string;
name: string;
imageSource: string;
price: number;    
}
export interface IteminCartType{
nfcTagCode: string;
itemId: string;
name: string;
imageSource: string;
price: number;
category: string;
}
export interface ItemCompInterface{
itemObj: IteminCartType;
handleDeleteItem?: (userId: string, nfcTagCode: string) => void;
}
export interface creditCardRegisterionType{
    userId: string;
    creditCard: creditCardFormType;
}
export interface creditCardFormType{
cardNumber: string;
expirationDate: string;
cardholderName: string;
cvv: string;
cardType: string;
isDefault?: boolean; 
}
export interface creditCardType{
    _id: string;
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
    cardType: cardType | string;
    isDefault: boolean;
}
export enum cardType {
MASTERCARD = 'mastercard',
VISA = 'visa',
AMERICAN_EXPRESS = 'amex',
DISCOVER = 'discover'
}
export interface LoginScreenType {

}
export interface HomeScreenType {
}
export interface SignupScreenType {
    
}
export interface BigTitleType {
    title: string;
}
export interface DayNightSwitcherProps {

}
export interface FormInputType{
    label: string;
    setInput: (value: string) => void;
    validator?: boolean;
    errorMessage?: string | undefined;
    startValue?: string;
    isApplied?: boolean;
    isAttempted?: boolean;
    focus?: boolean;
    onPress: () => void;  // Changed this line
    value?: string;
    numeric?: boolean;
    onChangeText?: (value: string) => void;
    ref?: React.RefObject<TextInput>;
}

  
export interface StatsScreenType{

}
export interface ProfileScreenType{

}
export interface SettingsScreenType{
    
}
export interface AuthenticatedStackType{

}
export interface TokenContextType {
    token: Token | null;
    setToken: (token: Token | null) => void;
}
export interface Token {
    exp: number;
    iat: number;
    id: string;
    roles: Role[];
}
export enum Role {
    USER = "user",
    ADMIN = "admin",
}
export interface StyledButtonType {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  bigbutton?: boolean;
  isApplied?: boolean;
  isAttempted?: boolean;
  smallbutton?: boolean;
}
export interface StyledBarrierProps{
    text: string;
}
export interface TitleAndBtnConProps {
    text: string;
    btnlabel: string;
    textbold?: boolean;
    btnbold?: boolean;
    onPress?: () => void; 
    btntextcolor?: string;
}
export interface AllCheckBoxCategoriesProps {
    title: string;
    categories: string[];
    isSingleCategory?: boolean; // Optional prop to determine single or multiple selection
    setSelectedCategories: (value: string | string[]) => void;
    selectedCategories: string | string[];
    validator?: boolean | undefined;
    value: string;
    errorMessage?: string | undefined;
}
export interface EmailVerifyCompProps{
    isLoadingForm: boolean;
    handleFormSubmit: (value: {email: string}) => Promise<void>;
  }
export interface ResetPasswordCompProps{
    handleChangePassword: (value: {password: string}) => Promise<void>;
}
export interface OtpCompProps{
verifyOtpCode: (value: {otpCode: string}) => Promise<void>;
isOneMinuteBind: boolean;
emailSended: boolean;
resendEmail: () => void;
formatTime: (time: number) => string;
remainingTime: number;
isLoadingResendEmail: boolean;
}
export interface Registergion_Form_Props{
fullName: string;
email: string;
password: string;
confirmPassword?: string;
gender: string;
birthDate?: string;
deviceToken?: string | null;
termsAndConditions? : boolean;
}
export interface ForgotPasswordProps{

}
export interface IHttpResponse<T> {
    success:boolean;
    data?:T;
    message:string;
    error?:string;
    tokenError?:boolean;
}
export  interface Token{
    exp: number;
    iat: number;
    id: string;
  }

export interface UserEmailVerificationDetails{
    userId: string;
    digits: string;
    email: string;
    expireIn: Date;
}
export interface ProblemReportType{
    
} 
export interface DeviceInfo {
    os: string;
    deviceModel: string;
    systemVersion: string;
    appVersion: number;
}  
export interface ProblemReportRouteParams  {
    cameFrom?: string;
}  
export interface TitleAndArrowBackProps{
    text: string;
    onPress?: () => void;
} 
export interface CouponCompProps{
    isCouponValid: boolean;
    isAttempted: boolean;
    isLoading: boolean;
    handleCouponCheck: () => void;
    btnLabelText: string;
    changeInputHandler: (input: string) => void;
    startValue: string;
}  