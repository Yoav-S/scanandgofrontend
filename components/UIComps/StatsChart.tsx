/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import { IStats} from '../../interfaces/interfaces';
import {
  LineChart,
} from 'react-native-chart-kit';
import axios from 'axios';
interface Props {
    userId: string
  }
const StatsChart: React.FC<Props> = ({userId}) => {
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
          try {
            const queryParams = {
              id: userId,
            };
            const response = await axios.get('https://scan-and-go.onrender.com/transactions/allStats', { params: queryParams });
            if (response.status === 200) {
              const { weekly, monthly, yearly } = response.data;
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
    
          } catch (error: any) {
            if (error.response) {
              if (error.response.status === 500) {
                console.error('500 Internal Server Error:', error.response.data.message);
              }
              else if (error.response.status === 404) {
                console.error('404 Not Found:', error.response.data.message);
              }
              else {
                // Handle other status codes
                console.error('Other Error:', error.response.status, error.response.data);
              }
            }
          }
        };
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
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#0D0000',
          backgroundGradientFrom: '#ffa726',
          backgroundGradientTo: '#E3823C',
          decimalPlaces: 2, // optional, defaults to 2dp
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
        }}
      />

    </>
  );

}

const styles = StyleSheet.create({
});
export default StatsChart;