import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDataContext } from '../../context/DataContext';
import { AuthenticatedStackScreen } from '../../navigation/AuthenticatedStack';
import { NotAuthenticatedStackScreen } from '../../navigation/NotAuthenticatedStack';

const Main: React.FC = () => {
  const { authenticated } = useDataContext();

  return (
    <View style={styles.container}>
        {authenticated ? (
                    <AuthenticatedStackScreen />
        ) : (
          <NotAuthenticatedStackScreen />
        )}

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default Main;
