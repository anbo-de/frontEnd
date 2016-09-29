/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageComponent.scss';
import $ from 'jquery';

class ImageComponent extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {  image : "" };
  }


  componentDidMount() {
  }

  render() {
    return (
      <div className={s.container}>
        <img src={this.props.image}></img>
      </div>
    );
  }

}
export default withStyles(ImageComponent, s);
