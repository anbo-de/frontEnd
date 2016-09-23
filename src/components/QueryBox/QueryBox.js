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
import s from './QueryBox.scss';

// function queryTextChange(e){
//   this.setState({querytext: e.target.value});
// }

class QueryBox extends Component {

  static propTypes = {
    size: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    // this.state = {  querytext : "" };
  }

  // _handleChange = (event) => this.setState({querytext: e.target.value});


  render() {
    return (
        <form action="/question" method="" autoComplete="on" className={s.querybox}>
          <div>
            <input type="text" name="q" placeholder="Enter your question..." size={this.props.size}/>
            <input type="submit" value="Go" className={s.space}/>
          </div>
        </form>
    );
  }

}
export default withStyles(QueryBox, s);
