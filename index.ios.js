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
    PixelRatio,
    Platform,
    TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class interactableTest1 extends Component {

    constructor(props) {
        super(props)

        /* -- binding -- */
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
        this.resetKeyboardView = this.resetKeyboardView.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

        this.state = {
            scrollX: new Animated.Value(0),
            scrollY: new Animated.Value(0),

            customKeyboard: {
                component: undefined,
                initialProps: undefined,
            },
            receivedKeyboardData: undefined,
        }
    }

    onKeyboardItemSelected(keyboardId, params) {
        const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
        this.setState({receivedKeyboardData});
    }

    getToolbarButtons() {
        return [
            {
                text: 'show1',
                testID: 'show1',
                onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1 (passed prop)'),
            },
            {
                text: 'show2',
                testID: 'show2',
                onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
            },
            {
                text: 'reset',
                testID: 'reset',
                onPress: () => this.resetKeyboardView(),
            },
        ];
    }

    resetKeyboardView() {
        this.setState({customKeyboard: {}});
        this.resetTextInput();
    }

    resetTextInput() {
        this.textInputRef.setNativeProps({text: ''});
    }

    onKeyboardResigned() {
        this.resetKeyboardView();
    }

    showKeyboardView(component, title) {
        this.setState({
            customKeyboard: {
                component,
                initialProps: {title},
            },
            textValue: 'My initial\nText'
        });
    }

    inputTextSave() {
        console.log("it is going to be saved!>> ", this.state.textValue);
    }

    onTextChange(event) {
        this.setState({textValue: event.nativeEvent.text || ''});
        console.log("onTextChagne!> ", this.state.textValue)
    }

    keyboardAccessoryViewContent() {
        const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;
        return (
            <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
                <View style={{borderTopWidth: styles.hairlineWidth, borderColor: '#bbb'}}/>
                <View style={styles.inputContainer}>
                    <AutoGrowingTextInput
                        maxHeight={200}
                        style={styles.textInput}
                        ref={(r) => {
              this.textInputRef = r;
            }}
                        onChange={(event) => this.onTextChange(event)}
                        placeholder={'Message'}
                        underlineColorAndroid="transparent"
                        onFocus={() => this.resetKeyboardView()}
                        testID={'input'}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => {KeyboardUtils.dismiss();
                                                                                this.inputTextSave();}}>
                        <Text>Action</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    {
                        this.getToolbarButtons().map((button, index) =>
                            <TouchableOpacity onPress={button.onPress} style={{paddingLeft: 15, paddingBottom: 10}}
                                              key={index} testID={button.testID}>
                                <Text>{button.text}</Text>
                            </TouchableOpacity>)
                    }
                </View>
            </InnerContainerComponent>
        );
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
                    keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
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
                <KeyboardAccessoryView
                    renderContent={this.keyboardAccessoryViewContent}
                    onHeightChanged={IsIOS ? height => this.setState({keyboardAccessoryViewHeight: height}) : undefined}
                    trackInteractive={TrackInteractive}
                    kbInputRef={this.textInputRef}
                    kbComponent={this.state.customKeyboard.component}
                    kbInitialProps={this.state.customKeyboard.initialProps}
                    onItemSelected={this.onKeyboardItemSelected}
                    onKeyboardResigned={this.onKeyboardResigned}
                    revealKeyboardInteractive
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

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingTop: 50,
        paddingBottom: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    blurContainer: {
        width: SCREEN_WIDTH,
        ...Platform.select({
            ios: {
                flex: 1,
            },
        }),
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 5,
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 0.5 / PixelRatio.get(),
        borderRadius: 18,
    },
    sendButton: {
        paddingRight: 15,
        paddingLeft: 15,
    },
});

AppRegistry.registerComponent('interactableTest1', () => interactableTest1);
