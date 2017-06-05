'use strict';


import React, {Component, PropTypes} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    View,
} from 'react-native';

import CarouselPager   from './CarouselPager';

class Carousel extends Component {
    static defaultProps = {
        hideIndicators: false,
        indicatorColor: '#000000',
        indicatorSize: 17,
        inactiveIndicatorColor: '#E9E9E9',
        indicatorAtBottom: true,
        indicatorText: '•',
        inactiveIndicatorText: '•',
        width: null,
        initialPage: 0,
        indicatorSpace: 200,
        loop: true
    }

    constructor(props) {
        super(props);

        /* -- binding -- */
        this._onAnimationEnd = this._onAnimationEnd.bind(this);

        this.state = {
            activePage: this.props.initialPage > 0 ? this.props.initialPage : 0,
        }
    }

    getWidth() {
        if (this.props.width !== null) {
            return this.props.width;
        } else {
            return Dimensions.get('window').width;
        }
    }

    componentDidMount() {
        if (this.props.initialPage > 0) {
            this.refs.pager.scrollToPage(this.props.initialPage, false);
        }
    }

    indicatorPressed(activePage) {
        this.setState({activePage});
        this.refs.pager.scrollToPage(activePage);
    }

    renderPageIndicator() {
        if (this.props.hideIndicators === true) {
            return null;
        }

        var indicators = [], style;

        for (var i = 0, l = this.props.children.length; i < l; i++) {
            if (typeof this.props.children[i] === "undefined") {
                continue;
            }
            style = i === this.state.activePage ? {color: this.props.indicatorColor} : {color: this.props.inactiveIndicatorColor};
            indicators.push(
                <Text
                    style={[style, { fontSize: this.props.indicatorSize,width:13 }]}
                    key={i}
                    onPress={this.indicatorPressed.bind(this,i)}
                >
                    { i === this.state.activePage ? this.props.indicatorText : this.props.inactiveIndicatorText }
                </Text>
            );
        }

        if (indicators.length === 1) {
            return null;
        }

        return (
            <View style={[styles.pageIndicator]}>
                {indicators}
            </View>
        );
    }

    _onAnimationEnd(activePage) {
        this.setState({activePage:activePage});
        if (this.props.onPageChange) {
            this.props.onPageChange(activePage);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CarouselPager
                    ref="pager"
                    width={this.getWidth()}
                    contentContainerStyle={styles.container}
                    onBegin={this._onAnimationBeginPage}
                    onEnd={this._onAnimationEnd}
                >
                    {this.props.children}
                </CarouselPager>
                {this.renderPageIndicator()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageIndicator: {
        position: 'absolute',
        height:5,
        left:60,
        top: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'transparent',
    },
});

module.exports = Carousel;