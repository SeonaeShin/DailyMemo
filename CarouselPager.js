'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions,
    View,
} from 'react-native';


class CarouselPager extends Component {

    constructor(props) {
        super(props)
    }

    scrollToPage(page, animated) {
        if (typeof animated === 'undefined') {
            animated = true;
        }
        this.refs.scrollView.scrollTo({x: page * this.props.width, y: 0, animated: animated});
    }

    _onMomentumScrollEnd(e) {
        var activePage = e.nativeEvent.contentOffset.x / this.props.width;
        this.props.onEnd(activePage);
    }

    render() {
        return <ScrollView ref="scrollView"
                           contentContainerStyle={this.props.contentContainerStyle}
                           automaticallyAdjustContentInsets={false}
                           horizontal={true}
                           pagingEnabled={true}
                           showsHorizontalScrollIndicator={false}
                           bounces={false}
                           onScrollBeginDrag={this.props.onBegin}
                           onMomentumScrollEnd={(e)=>this._onMomentumScrollEnd(e)}
                           scrollsToTop={false}
                           indicatorColor="#FFFFFF"
        >
            {this.props.children}
        </ScrollView>;
    }
}

module.exports = CarouselPager;