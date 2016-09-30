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
import Label from '../Label';



//methods to handle and render/display the results retrieved from the wdaqua server

// function handledata(data){
//
//   var jresult = JSON.parse(data.questions[0].question.answers);
//
//   console.log("json parse printtttttt");
//   console.log("result count: " + jresult.results.bindings.length);
//   console.log("results: ");
//   console.log(jresult.results.bindings[0].x);
//
//   //depending on the number of results, handle accordingly:
//   if (jresult.results.bindings.length == 1){
//     var tags = getresulttags(jresult.results.bindings[0].x);
//     console.log("results tags.........:");
//     console.log(tags);
//   }
//   else if (jresult.results.bindings.length > 1) {
//     //do something
//   }
//   else {
//     //if there are no results...
//   }
//
// }

////still need to check the type somewhere. For now this method only works for a uri
// function getresulttags(obj){
//   console.log(obj.value);
//
//   //get label of the result, for now this is returned in English
//   var sparqlQuery="SELECT ?label WHERE { " +
//     " <" + obj.value + "> " + "<http://www.w3.org/2000/01/rdf-schema#label> ?label " +
//     "FILTER (lang(?label)=\"en\") " +
//     "}";
//   //console.log("http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on");
//
//   var lab = null;
//   var labelrequest = $.get(
//     "http://dbpedia.org/sparql?query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on",
//     function (result) {
//       console.log("Internal return........:");
//       console.log(result);
//
//       console.log(result.results.bindings[0].label.value);
//
//       lab =  result.results.bindings[0].label.value;
//       //
//       // this.setState({
//       //   label:result.results.bindings[0].label.value
//       // });
//     }.bind(this));
//
//   return labelrequest;
// }



class AnswerPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {  label : "", abstract: "" };
  }

  componentDidMount() {

    var qresult = $.post("http://wdaqua-qanary.univ-st-etienne.fr/gerbil", this.props.query, function (data){
      console.log("ressulllllttttttttttt");
      console.log(data);

      //would like to refactor the following to separate functions. this.setState() is not recognized in
      //nested functions

        var jresult = JSON.parse(data.questions[0].question.answers);

        console.log("json parse printtttttt");
        console.log("result count: " + jresult.results.bindings.length);
        console.log("results: ");
        console.log(jresult.results.bindings[0].x);

        var obj = jresult.results.bindings[0].x;

        //depending on the number of results, handle accordingly:
      //also need to make a check for the obj.type (uri or literal)
        if (jresult.results.bindings.length == 1){
          // var tags = getresulttags(jresult.results.bindings[0].x);
          // console.log("results tags.........:");
          // console.log(tags);

            console.log(obj.value);

          if(obj.type == "uri"){

            //get label of the result, for now this is returned in English
            var sparqlQuery="SELECT ?label WHERE { " +
              " <" + obj.value + "> " + "<http://www.w3.org/2000/01/rdf-schema#label> ?label " +
              "FILTER (lang(?label)=\"en\") " +
              "}";

            var labelrequest = $.get(
              "http://dbpedia.org/sparql?query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on",
              function (result) {

                this.setState({
                  label: result.results.bindings[0].label.value
                });

                console.log("the label has changed to..........:");
                console.log(this.state.label);

              }.bind(this));
            }
            else if (obj.type == "literal"){
              //do something
            }
          }

        else if (jresult.results.bindings.length > 1) {
          //do something
        }
        else {
          //if there are no results...
        }


    }.bind(this), "json");

    // qresult.done(function (data){
    //   console.log("This is when the get finishes............:");
    //   console.log(" ");
    // });

  }

  render() {
    console.log("query paramsss...............:");
    console.log(this.props.query);
    console.log("the label has become....:");
    console.log(this.state.label);
    return (
      <div className={s.container}>
        <h1>Answer</h1>
        <Label>{this.state.label}</Label>
        <Label>{this.state.abstract}</Label>
      </div>
    );
  }

}
export default withStyles(AnswerPage, s);
