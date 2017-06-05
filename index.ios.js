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

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

import Carousel from './Carousel'
import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = false;

var innerArray = [];

const CARD_HEIGHT = 300;

const Realm = require('realm');


const TitleSchema = {
    name: 'Title',
    primeKey: 'title',
    properties: {
        title: 'string',
        user: 'string',
        memos: {
            type: 'list', objectType: 'Memo'
        }
    }
};

const MemoSchema = {
    name: 'Memo',
    properties: {
        title: 'string',
        number: 'int',
        description: 'string'
    }
};

const realm = new Realm({schema: [TitleSchema, MemoSchema]});

export default class interactableTest1 extends Component {

    constructor(props) {
        super(props)

        /* -- binding -- */
        this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
        this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
        this.resetKeyboardView = this.resetKeyboardView.bind(this);
        this.hideKeyboardView  = this.hideKeyboardView.bind(this);
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
            keyboardShowing: false,
            specificDataTitle:{},
            specificDataMemo:{}
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

    componentDidMount() {
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
        return (
            this.getSpecificDataMemo().map((obj,i)=><View key={i} style={{paddingTop:100,paddingLeft:60,width:SCREEN_WIDTH}}>
                <Text style={{color:'#393939'}}>{obj.description}</Text></View>))
    }

    getSpecificDataTitle(){
        var specificDataTitle = realm.objects('Title');

        return specificDataTitle;

    }

    getSpecificDataMemo(){

        var theDateis = '2017. 6. 6'
        var specificDataMemo = realm.objects('Memo').filtered('title = ' + `'` + theDateis + `'`);

        return specificDataMemo;

    }
    getCardView() {
        const fontTermA = (SCREEN_WIDTH / 2) * 1.6;
        const fontTermB = 100;

        const opaTermA = (SCREEN_WIDTH / 2) * 1.6;
        const opaTermB = 200;

        var updateSize = [], updateOpacity = [];

        console.log("this.getSpecificDataTitle()>>",this.getSpecificDataTitle().length);
        var i =0;
        while(i < this.getSpecificDataTitle().length){
            console.log("updateSize>>",updateSize.length);
            console.log("updateOpacity>>",updateOpacity.length);

            updateSize.push(this.state.scrollY.interpolate({
                inputRange: [fontTermA * i, fontTermA * i + fontTermB],
                outputRange: [20, 10],
                extrapolate: 'clamp',
            }));

            console.log("opaTermA * i",opaTermA * i);

            updateOpacity.push(this.state.scrollY.interpolate({
                inputRange: [opaTermA * i, opaTermA * i + opaTermB],
                outputRange: [1, 0.2],
                extrapolate: 'clamp',
            }));

            i++;
        }

        return (
            this.getSpecificDataTitle().map((obj,i) => <View
                key={i}
                style={{backgroundColor:'transparent', alignItems:'center',justifyContent:'flex-end',height:CARD_HEIGHT}}
                scrollEventThrottle={10}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  )}>
                <Animated.Text
                    style={[styles.cardTitle,{fontSize:updateSize[i]}]}>{obj.title}</Animated.Text>
                <Animated.View style={[styles.card,{opacity:updateOpacity[i]}]}>
                    <Carousel width={SCREEN_WIDTH}>
                        {this.getInnderCardView()}
                    </Carousel>
                </Animated.View>
                <View
                    style={{position:'absolute',justifyContent:'center',borderBottomWidth:0.4,width:SCREEN_WIDTH*0.7,borderBottomColor:'white',height:0}}/>
            </View>))
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
                onPress: () => this.hideKeyboardView(),
            },
        ];
    }

    hideKeyboardView(){
        this.setState({customKeyboard: {}});
        this.setState({keyboardShowing: false});
        this.resetTextInput();
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

    realmToWrite() {
        this.realmDataRead();


        var theDateis = '2017. 6. 6';

        var specificDataTitle;
        var specificDataMemo;

        specificDataTitle = realm.objects('Memo').filtered('title=' + `'` + theDateis + `'`);

        if (specificDataTitle.length == 1);
        else {
            realm.write(() => {
                realm.create('Title', {
                        title: theDateis,
                        user: 'user1'
                    }
                )
            });
        }

        // realm.write(() => {
        //
        //     realm.delete(realm.objects('Memo'));
        // })
        specificDataMemo = realm.objects('Memo').filtered('title = ' + `'` + theDateis + `'`);

        var num = 0;
        for (var i in specificDataMemo) {
            if (num == specificDataMemo[i].number)
                num++;
        }

        realm.write(() => {

            realm.create('Memo', {
                title: theDateis,
                number: num,
                description: this.state.textValue,
            });
        });

        this.realmDataRead();
    }

    realmDataRead() {

        var specificDataTitle;
        var specificDataMemo;

        specificDataTitle = realm.objects('Title');
        specificDataMemo = realm.objects('Memo');

        this.setState({specificDataTitle:specificDataTitle, specificDataMemo:specificDataMemo});

        for (var i in specificDataTitle) {
            console.log("specificDataTitle.title=", specificDataTitle[i].title);
        }

        for (var i in specificDataMemo) {
            console.log("specificDataMemo.title=", specificDataMemo[i].title, specificDataMemo[i].number, specificDataMemo[i].description);
        }
    }

    inputTextSave() {
        this.realmToWrite();
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

    onActionButtonPress() {
        this.setState({keyboardShowing: true});
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
        color: 'white',
        fontSize: 1
    }
});

AppRegistry.registerComponent('interactableTest1', () => interactableTest1);
