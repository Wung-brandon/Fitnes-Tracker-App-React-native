import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ProgressChart = ({ data }) => {
  return (
    <View>
      <LineChart
        data={{
          labels: data.map((item) => item.date),
          datasets: [{ data: data.map((item) => item.value) }],
        }}
        width={400}
        height={220}
        yAxisLabel=""
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default ProgressChart;