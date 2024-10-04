import { View, StyleSheet } from 'react-native';
import { Button } from '@components/button';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Header } from '@components/header';
import { useState } from 'react';
import { TabItem, Tabs } from '@components/tab';

export const Home: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    const users = ['OLA P', 'KAMIL S'];

    // const tabs: Array<TabItem> = [
    //     { isExpanded: true, text: 'Wydarzenia', icon: 'plus' },
    //     { isExpanded: true, text: 'Zdjęcia', icon: 'minus' },
    //     { isExpanded: true, text: 'Tab', icon: 'minus' },
    //     { isExpanded: true, text: 'Tab', icon: 'minus' },
    //     { isExpanded: true, text: 'Tab', icon: 'minus' },
    //     { isExpanded: true, text: 'Tab', icon: 'minus' },
    //     { isExpanded: true, text: 'Tab', icon: 'minus' },
    // ];

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const changeActiveTab = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <Layout
            navigation={navigation}
            route={'Home'}
            hasHeader
            isHeaderCentered={false}
            title="Witaj, Natalcia!"
            subtitle="Dziś jest wspaniały dzień do działania :)"
        >
            <View style={styles.controlPanel}>
                <View style={styles.double_button_container}>
                    <Button
                        icon="addLesson"
                        onClick={() =>
                            navigation.navigate('Lessons', {
                                screen: 'Create',
                                initial: true,
                            })
                        }
                        label="Dodaj zajęcia"
                        width={160}
                    />
                    <Button
                        icon="addStudent"
                        onClick={() =>
                            navigation.navigate('Students', {
                                screen: 'Create',
                                initial: true,
                            })
                        }
                        label="Dodaj ucznia"
                        width={160}
                    />
                </View>
                <View style={styles.double_button_container}>
                    <Button
                        icon="addPayment"
                        onClick={() =>
                            navigation.navigate('Payments', {
                                screen: 'List',
                                initial: true,
                                activeTab: 2,
                            })
                        }
                        label="Dodaj płatność"
                        width={160}
                    />
                    <Button
                        icon="notes"
                        onClick={() => 1}
                        label="Dodaj notatkę"
                        disabled={true}
                        width={160}
                    />
                </View>
            </View>

            <View style={styles.timeline}>
                <Header
                    rightIcon={'addLesson'}
                    rightAction={() => 1}
                    title={'Dzisiejszy plan'}
                />
            </View>

            {/* <View>
                <Tabs
                    tabs={tabs}
                    activeTabIndex={activeTabIndex}
                    changeActiveTab={changeActiveTab}
                />
            </View> */}

            {/* {users.map((user, i) => (
                <CustomButton
                    key={`user-${i}`}
                    icon="minus"
                    label={`Go to ${user} Page`}
                    onClick={() =>
                        navigation.navigate('Profile', { name: user })
                    }
                />
            ))} */}
        </Layout>
    );
};

const styles = StyleSheet.create({
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    controlPanel: {
        gap: 5,
    },
    timeline: {},
});
