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
import s from './HeaderSearch.scss';
import n from '../Navigation/Navigation.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import QueryBox from '../QueryBox';

class HeaderSearch extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    console.log("testttttttttttttttttttt");
    console.log(this.props.path);
    console.log("testttttttttttttttttttt2");

    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation className={s.nav} linkClassName={n.darklink}/>
          {this.props.path == "/" ? <div className={s.placeholder}></div> : <Link className={s.brand} to="/">
            <img src={require('./../../public/WDAquaLogo2.png')} height="24" alt="WDAqua" />
            </Link>}
          {this.props.path == "/" ? null : <QueryBox size="50"/>}
          <div className={s.banner}>
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(HeaderSearch, s, n);
