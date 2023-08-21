import { useState } from "react";

export const [full_name_Validator_Flag, set_full_name_Validator_Flag] = useState<boolean>(false);
export const [email_Validator_Flag, set_email_Validator_Flag] = useState<boolean>(false);
export const [password_Validator_Flag, set_password_Validator_Flag] = useState<boolean>(false);
export const [confirm_password_Validator_Flag, set_confirm_password_Validator_Flag] = useState<boolean>(false);
export const [gender_Validator_Flag, set_gender_Validator_Flag] = useState<boolean>(false);
export const [device_token_Validator_Flag, set_device_token_Validator_Flag] = useState<boolean>(false);
export const [date_of_birth_Validator_Flag, set_date_of_birth_Validator_Flag] = useState<boolean>(false);