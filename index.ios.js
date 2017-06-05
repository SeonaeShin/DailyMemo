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
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

import Carousel from './Carousel'

import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = false;

var innerArray = [];

const CARD_HEIGHT = 300;

export default class interactableTest1 extends Component {

    constructor(props) {
        super(props)

        /* -- binding -- */
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
        this.resetKeyboardView = this.resetKeyboardView.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
        this.onActionButtonPress = this.onActionButtonPress.bind(this);

        this.state = {
            scrollX: new Animated.Value(0),
            scrollY: new Animated.Value(0),

            customKeyboard: {
                component: undefined,
                initialProps: undefined,
            },
            receivedKeyboardData: undefined,
            keyboardShowing:false,
        }
    }

    componentWillMount() {
        var tempString;
        var i = 1;
        while (i < 7) {
            tempString = '2017. 6. ' + i;
            innerArray.push({'date': tempString, 'memo': ['주말 여행 계획해보기', '점심약속좀 잡자', '친구들한테 회비알림 잊지말기!!!!!!!']});
            i++;
            console.log("tempString", tempString);
        }
    }

    onKeyboardItemSelected(keyboardId, params) {
        const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
        this.setState({receivedKeyboardData});
    }

    getInnderCardView() {
        return [
            <View key={1} style={{paddingTop:100,paddingLeft:60,width:SCREEN_WIDTH}}><Text style={{color:'#393939'}}>{innerArray[0].memo[0]}</Text></View>,
            <View key={2} style={{paddingTop:100,paddingLeft:60,width:SCREEN_WIDTH}}><Text style={{color:'#323232'}}>{innerArray[0].memo[1]}</Text></View>,
            <View key={3} style={{paddingTop:100,paddingLeft:60,width:SCREEN_WIDTH}}><Text style={{color:'#FDEC4F'}}>{innerArray[0].memo[2]}</Text></View>
        ]

    }

    getCardView() {
        const fontTermA = (SCREEN_WIDTH / 2) * 1.6;
        const fontTermB = 100;

        const opaTermA = (SCREEN_WIDTH / 2) * 1.6;
        const opaTermB = 200;

        var updateFontSize1 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 0, fontTermA * 0 + fontTermB],
            outputRange: [20, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize2 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 1, fontTermA * 1 + fontTermB],
            outputRange: [20, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize3 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 2, fontTermA * 2 + fontTermB],
            outputRange: [20, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize4 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 3, fontTermA * 3 + fontTermB],
            outputRange: [20, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize5 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 4, fontTermA * 4 + fontTermB],
            outputRange: [20, 10],
            extrapolate: 'clamp',
        });

        var updateFontSize6 = this.state.scrollY.interpolate({
            inputRange: [fontTermA * 5, fontTermA * 5 + fontTermB],
            outputRange: [20, 10],
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

        return [
            <View
                key={1}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize1}]}>2017. 6. 1</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity1}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,

            <View
                key={2}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize2}]}>2017. 6. 2</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity2}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,

            <View
                key={3}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize3}]}>2017. 6. 3</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity3}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,

            <View
                key={4}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize4}]}>2017. 6. 4</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity4}]}>
                    <Carousel>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,

            <View
                key={5}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize5}]}>2017. 6. 5</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity5}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,

            <View
                key={6}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateFontSize6}]}>2017. 6. 6</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity6}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>,
        ]
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
                text: '숨기기',
                testID: 'reset',
                onPress: () => this.resetKeyboardView(),
            },
        ];
    }

    resetKeyboardView() {
        this.setState({customKeyboard: {}});
        this.setState({keyboardShowing:false});
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
        var kbShowing = this.state.keyboardShowing === true ? null : 0
        return (
            <InnerContainerComponent blurType="xlight" style={[styles.blurContainer,{height:kbShowing}]}>
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
                        <Text>Enter</Text>
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

    onActionButtonPress(){
        this.setState({keyboardShowing:true});
    }

    render() {

        return (
            <View style={{flex:1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
                    indicatorStyle={'white'}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
                    scrollEventThrottle={10}>
                    {this.getCardView()}
                </ScrollView>
                <ActionButton
                    buttonColor="white"
                    type={'tab'}
                    position={'right'}
                    offsetY={35}
                    onPress={() => this.onActionButtonPress()}
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

}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

    card: {
        height: CARD_HEIGHT,
        backgroundColor: '#469EEE',
        width: SCREEN_WIDTH,
        marginVertical: 0,
        borderRadius: 0,
        alignItems: 'center',
    },

    Inndercard: {
        height: CARD_HEIGHT,
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
    cardTitle: {
        top: 38,
        left: 60,
        zIndex: 5,
        position: 'absolute',
        color:'white',
        fontSize:1
    }
});

AppRegistry.registerComponent('interactableTest1', () => interactableTest1);
