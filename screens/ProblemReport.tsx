import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import packageJson from '../package.json'; // Relative path to your package.json
import { ProblemReportType, ProblemReportRouteParams } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useDataContext } from "../context/DataContext";
const ProblemReport: React.FC<ProblemReportType> = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'ProblemReport'>>();
    const route = useRoute<any>(); // Using any type for route parameter
    
    const {theme} = useTheme();
    const appVersion = packageJson.version;
    const [cameFrom, setCameFrom] = useState<string>();
    const [appVersionValue, setAppVersionValue] = useState<string>(appVersion);
    const [deviceIdValue, setDeviceIdValue] = useState<string>('');
    const [systemVersionValue, setSystemVersionValue] = useState<string>('');
    const [osValue, setOsValue] = useState<string>('');
    const {getArrayOfDropDownCategories} = useDataContext();
    useEffect(() => {
        const bringAllDetails = async () => {
            const deviceId: string = DeviceInfo.getDeviceId();
            const systemVersion: string = DeviceInfo.getSystemVersion();
            const baseOs: string = await DeviceInfo.getBaseOs();
            const arrayOfCategories: string[] = await getArrayOfDropDownCategories();
            setDeviceIdValue(deviceId);
            setSystemVersionValue(systemVersion);
            setOsValue(baseOs);
        };

        bringAllDetails();

        if (route.params && route.params.cameFrom) {
            setCameFrom(route.params.cameFrom);
        }
    }, [route.params]);
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleandarrowcon}>
            <Icon
            onPress={() => navigation.goBack()}
            name="arrow-left"
            size={30}
            /> 
            <Text style={{color: theme.textColor, fontWeight: '600'}}>Report A Problem</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%'
    },
    titleandarrowcon: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default ProblemReport;
