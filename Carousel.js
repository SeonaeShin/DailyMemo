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
        indicatorSize: 20,
        inactiveIndicatorColor: '#999999',
        indicatorAtBottom: true,
        indicatorOffset: 250,
        indicatorText: '•',
        inactiveIndicatorText: '•',
        width: null,
        initialPage: 0,
        indicatorSpace: 25,
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

        var indicators = [],
            indicatorStyle = this.props.indicatorAtBottom ? {bottom: this.props.indicatorOffset} : {top: this.props.indicatorOffset},
            style, position;

        position = {
            width: this.props.children.length * this.props.indicatorSpace,
        };

        position.left = (this.getWidth() - position.width) / 1.3;

        for (var i = 0, l = this.props.children.length; i < l; i++) {
            if (typeof this.props.children[i] === "undefined") {
                continue;
            }
            style = i === this.state.activePage ? {color: this.props.indicatorColor} : {color: this.props.inactiveIndicatorColor};
            indicators.push(
                <Text
                    style={[style, { fontSize: this.props.indicatorSize }]}
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
            <View style={[styles.pageIndicator,position]}>
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
        top:0,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

module.exports = Carousel;