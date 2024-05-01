import { View, Text, ScrollView } from 'react';
import { StyleSheet } from 'react-native';

const Container = ( {children }) => {
    return(
        <ScrollView>
            <View style={styles.wrapper}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    }
}
)

export default Container;

