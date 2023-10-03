/* eslint-disable prettier/prettier */
import React, { useEffect, useState , useContext} from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import { ThemeContext } from '../../../context/ThemeContext';
import { IStats} from '../../../interfaces/interfaces';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import {
  LineChart,
} from 'react-native-chart-kit';
import axios from 'axios';
import { useDataContext } from '../../../context/DataContext';
interface Props {
    userId: string,
    handleShowToast: () => void;
  }
const StatsChart: React.FC<Props> = ({userId, handleShowToast}) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
      const {currentUser, fetchStatsDataAttempt} = useDataContext();
    const defaultStats: IStats[] = [
        {
          'label': 'Jan',
          'value': 0,
        },
        {
          'label': 'Feb',
          'value': 0,
        },
        {
          'label': 'Mer',
          'value': 0,
        },
        {
          'label': 'Apr',
          'value': 0,
        },
        {
          'label': 'May',
          'value': 0,
        },
        {
          'label': 'Jun',
          'value': 0,
        },
        {
          'label': 'Jul',
          'value': 0,
        },
      ];
      const [selectedIndex, setSelectedIndex] = useState(1);
      const [data, setData] = useState<IStats[]>(defaultStats);
      const [WeeklyStats, setWeeklyStats] = useState<IStats[]>([]);
      const [MonthlyStats, setMonthlyStats] = useState<IStats[]>([]);
      const [YearlyStats, setYearlyStats] = useState<IStats[]>([]);
      const labels: string[] = data.map((label) => label.label);
      const values: number[] = data.map((value) => value.value);

      useEffect(() => {
        const fetchData = async () => {
          const responseData = await fetchStatsDataAttempt(userId)
          
          if(!responseData){ handleShowToast }                    
              const { weekly, monthly, yearly } = responseData;              
              if (monthly) {
                setMonthlyStats(monthly);
              }
              if (weekly) { setWeeklyStats(weekly); }
              if (yearly) { setYearlyStats(yearly); }
    
              if (monthly) {
                setData(monthly);
                setSelectedIndex(1);
              }
              else if (weekly) {
                setData(weekly);
                setSelectedIndex(0);
              }
              else if (yearly) {
                setData(yearly);
                setSelectedIndex(2);
              }
            }
        fetchData();
      }, []);

      const handlePress = (value: number) => {
        switch (value) {
          case value = 0:
            setData(WeeklyStats);
            break;
          case value = 1:
            setData(MonthlyStats);
            break;
          case value = 2:
            setData(YearlyStats);
            break;
          default:
            setData(defaultStats);
            break;
        }
        setSelectedIndex(value);
      };

return (
    <>
      <ButtonGroup

        buttons={['Daily', 'Monthly', 'Yearly']}
        selectedIndex={selectedIndex}
        onPress={(value) => { handlePress(value); }}
        containerStyle={{ marginBottom: 0, borderRadius: 15, backgroundColor: '#141326' }}
        textStyle={{ color: 'white' }}
        selectedButtonStyle={{ backgroundColor: '#E3823C' }}
      />
      <LineChart
        data={{
          labels: [...labels],
          datasets: [
            {
              data: [...values],

            },
          ],
        }}
        width={Dimensions.get('window').width * 0.95} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#0D0000',
          backgroundGradientFrom: '#ffa726',
          backgroundGradientTo: '#E3823C',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: 'center'
        }}
      />
            <Toast/>

    </>
  );

}

const styles = StyleSheet.create({
});
export default StatsChart;