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
import s from './AnswerPage.scss';
import $ from 'jquery';


//methods to handle and render/display the results retrieved from the wdaqua server

function handledata(data){

  var jresult = JSON.parse(data.questions[0].question.answers);

  console.log("json parse printtttttt");
  console.log("result count: " + jresult.results.bindings.length);
  console.log("results: ");
  console.log(jresult.results.bindings[0].x);

  //depending on the number of results, handle accordingly:
  if (jresult.results.bindings.length == 1){

  }
  else if (jresult.results.bindings.length > 1) {
    //do something
  }
  else {
    //if there is no results...
  }

}


class AnswerPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {  label : "" };
  }


  componentDidMount() {

    var qresult = $.post("http://wdaqua-qanary.univ-st-etienne.fr/gerbil", this.props.query, function (data){
      console.log("ressulllllttttttttttt");
      console.log(data);

      handledata(data);

    }.bind(this), "json");

    // qresult.done(function (data){
    //   console.log(data);
    // });

  }

  render() {
    console.log("query paramsss...............:");
    console.log(this.props.query);
    return (
      <div className={s.container}>
        <h1>Answer</h1>
      </div>
    );
  }

}
export default withStyles(AnswerPage, s);
