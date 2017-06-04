import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    Animated,
    Keyboard,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';

export default class interactableTest1 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollX: new Animated.Value(0),
            scrollY: new Animated.Value(0)

        }
    }

    _childSlides() {

        var updateFontSize = this.state.scrollX.interpolate({
            inputRange: [50, 70, 100],
            outputRange: [20, 15, 10],
            extrapolate: 'clamp',
        });


        return (

            <Animated.View
                key={`carousel-item-1`}>
                <Animated.Text style={{fontSize:updateFontSize}}>
                    xxkfjsakfjaslfje;fjlxifaskdjfs
                </Animated.Text>

            </Animated.View>);

    }

    componentWillUpdate() {

    }

    handleScroll() {
        Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]);
        console.log("this.state.scrollY", this.state.scrollY);

    }

    render() {

        const fontTermA = (SCREEN_WIDTH / 2) * 1.6;
        const fontTermB = 100;

        const opaTermA = (SCREEN_WIDTH / 2) * 1.6;
        const opaTermB = 200;

        var updateFontSize1 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 0, fontTermA * 0 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize2 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 1, fontTermA * 1 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize3 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 2, fontTermA * 2 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize4 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 3, fontTermA * 3 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize5 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 4, fontTermA * 4 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize6 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 5, fontTermA * 5 + fontTermB],
            outputRange: [30, 10],
            extrapolate: 'clamp',
        });

        var updateOpacity1 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 0, opaTermA * 0 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        var updateOpacity2 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 1, opaTermA * 1 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        var updateOpacity3 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 2, opaTermA * 2 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        var updateOpacity4 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 3, opaTermA * 3 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        var updateOpacity5 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 4, opaTermA * 4 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        var updateOpacity6 = this.state.scrollY.interpolate({
            inputRange: [opaTermA * 5, opaTermA * 5 + opaTermB],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
        });

        return (
            <View style={{flex:1}}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    indicatorStyle={'white'}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
                    scrollEventThrottle={10}>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize1}}>2017. 6. 1</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity1,}]}>
                        </Animated.View>
                    </View>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize2}}>2017. 6. 2</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity2}]}>
                        </Animated.View>
                    </View>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize3}}>2017. 6. 3</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity3}]}>
                        </Animated.View>
                    </View>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize4}}>2017. 6. 4</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity4}]}>
                        </Animated.View>
                    </View>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize5}}>2017. 6. 5</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity5}]}>
                        </Animated.View>
                    </View>

                    <View
                        style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:300}}
                        scrollEventThrottle={10}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        overScrollMode={'never'}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                        <Animated.Text
                            style={{top:0,zIndex:5,position:'absolute',fontSize:updateFontSize6}}>2017. 6. 6</Animated.Text>
                        <Animated.View style={[styles.card,{opacity:updateOpacity6}]}>
                        </Animated.View>
                    </View>

                </ScrollView>
                <ActionButton
                    buttonColor="white"
                    type={'tab'}
                    position={'right'}
                    offsetY={35}
                    onPress={() => {}}
                    icon={<Ionicons name="ios-create-outline" style={{ alignItems:'center',fontSize: 26,height: 22, color: 'black', opacity: 1}}/>}
                />
            </View>
        );
    }

    renderItem(item) {
        return (

            <Interactable.View
                key="fifth"
                horizontalOnly={true}
                snapPoints={[
            {x: 360},
            {x: 0, damping: 0.8},
            {x: -360}
          ]}>
                <View style={styles.Inndercard}>
                    <Text style={{color:'red', fontSize:35}}>{item.key}</Text>
                </View>
            </Interactable.View>
        );
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

    card: {
        height: 280,
        backgroundColor: '#469EEE',
        width: SCREEN_WIDTH,
        marginVertical: 1,
        alignItems: 'center',
    },

    Inndercard: {
        height: 280,
        width: SCREEN_WIDTH,
        backgroundColor: '#FFFF00',
        borderRadius: 8,
        marginVertical: 6
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

});

AppRegistry.registerComponent('interactableTest1', () => interactableTest1);
