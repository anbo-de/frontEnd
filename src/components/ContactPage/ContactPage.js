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
import s from './ContactPage.scss';
import $ from 'jquery';

const title = 'Contact Us';

class ContactPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {  label : "" };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
    var sparqlQuery="SELECT ?label WHERE { " +
      " <http://dbpedia.org/resource/Barack_Obama> <http://www.w3.org/2000/01/rdf-schema#label> ?label " +
      "FILTER (lang(?label)=\"en\") " +
      "}";
    console.log("http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on");
    this.serverRequest = $.get(
      "http://dbpedia.org/sparql?query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on",
      function (result) {
        console.log(result);

        console.log(result.results.bindings[0].label.value);
        //this.context.onSetLabel(result.results.bindings[0].label.value);
        //var lastGist = result[0];
        this.setState({
          label: result.results.bindings[0].label.value
          //lastGistUrl: lastGist.html_url
        });
      }.bind(this));
  }


  componentWillUnmount() {
    this.serverRequest.abort();
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.state.label}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }


  // componentWillMount() {
  //   this.context.onSetTitle(title);
  // }


}

export default withStyles(ContactPage, s);
