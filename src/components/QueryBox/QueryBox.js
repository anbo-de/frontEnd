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

class QueryBox extends Component {

  static propTypes = {};

  render() {
    return (
        <form action="" method="" autoComplete="on" className={s.querybox}>
          <div>
            <input type="text" name="question" placeholder="Enter your question..." size="50"/>
            <input type="submit" value="Go" className={s.space}/>
          </div>
        </form>
    );
  }

}
export default withStyles(QueryBox, s);
