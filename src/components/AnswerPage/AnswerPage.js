/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import ImageComponent from '../ImageComponent'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AnswerPage.scss';
import $ from 'jquery';
import Label from '../Label';
import Loader from 'react-loader';


class AnswerPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      information: [],
      loaded: false,
    };
  }


  componentDidMount() {
    //retrives the answer from the gerbil interface
    var qresult = $.post("http://wdaqua-qanary.univ-st-etienne.fr/gerbil", this.props.query, function (data){
      console.log(data);

      //would like to refactor the following to separate functions. this.setState() is not recognized in
      //nested functions

      var jresult = JSON.parse(data.questions[0].question.answers);

      console.log("json");
      console.log(jresult);

      //check if it is an ask query
      if (jresult.hasOwnProperty("boolean")){
        var information = this.state.information;
        information.push({
          label: (jresult.boolean==true) ? "True" : "False",
          answerType: "simple",
        })
        this.setState({
          information: information,
          loaded: true,
        })
      } else {
        var variable=jresult.head.vars[0];
        //depending on the number of results, handle accordingly:
        if(jresult.results.bindings.length < 200) {
          jresult.results.bindings.map(function(binding,k) {
            if (k<10) {
              console.log("k:" + k);
              console.log(variable);
              //console.log("Variable" + jresult.head.vars[0]);
              //var variable = jresult.head.vars[0];

              var type = binding[variable].type;
              var value = binding[variable].value;
              console.log("Result " + type + " " + value);

              if (type == "uri") {
                //There is only one uri
                var sparqlQuery = "select ?label ?abstract ?image where { "
                  + "<" + value + "> rdfs:label ?label . "
                  + " OPTIONAL{ "
                  + "<" + value + "> dbo:thumbnail ?image . "
                  + "} "
                  + " OPTIONAL{ "
                  + "<" + value + "> dbo:abstract ?abstract . "
                  + "} "
                  + " FILTER (lang(?label)=\"en\" && lang(?abstract)=\"en\") "
                  + " } ";

                this.serverRequest = $.get(
                  "http://dbpedia.org/sparql?query=" + encodeURIComponent(sparqlQuery) + "&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on",
                  function (result) {
                    console.log(result);
                    console.log("Label" + result.results.bindings[0].label.value);
                    console.log("Abstract" + result.results.bindings[0].abstract.value);
                    var image = (result.results.bindings[0].image != undefined) ? result.results.bindings[0].image.value : "";
                    var information = this.state.information;
                    information.push({
                      label: result.results.bindings[0].label.value,
                      abstract: result.results.bindings[0].abstract.value,
                      image: image,
                      loaded: true,
                      answertype: "detail"
                    })
                    this.setState({
                      information: information,
                      loaded: true,
                    })
                  }.bind(this), "json")
              }
              else if (type == "typed-literal" || type == "literal") {
                var information = this.state.information;
                information.push({
                  label: jresult.results.bindings[0][variable].value,
                  loaded: true,
                  answertype: "simple"
                })
                this.setState({
                  information: information,
                  loaded: true,
                });
              }
            }
          }.bind(this), "json")
        }
        else if (jresult.results.bindings.length > 5) {
          //do something
        }
        else {
          this.setState({
            label: "No results",
            loaded: true,
            answertype: "simple"
          });
        }
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

    // var answerformat;
    // if (this.state.answertype == "simple") {
    //   answerformat = <Label>{this.state.abstract}</Label>;
    // } else if (this.state.answertype == "detail") {
    //   answerformat = ();
    // }
    // else {}




    //

//to refactor so don't have to check the same answer type multiple times
    console.log("Loaded "+this.state.loaded);
    console.log("Information "+this.state.information.length);
    return (
      <div className={s.container}>
        <Loader loaded={this.state.loaded}>
          {this.state.information.map(function(info,index) {
            console.log("k"+index);
            console.log(info);
            return (
              <div key={index} >
                 {(info.answertype == "simple") ? <Label css={s.answer}>{info.label}</Label> : null}
                 {(info.answertype == "detail") ? <ImageComponent image={info.image}></ImageComponent> : null}
                 {(info.answertype == "detail") ? <div className={s.textboxes}>
                 <Label css={s.answer}>{info.label}</Label>
                 <Label>{info.abstract}</Label>
                 </div> : null}
              </div>)
          }.bind(this), "json")}
        </Loader>
      </div>
    );
  }


}
export default withStyles(AnswerPage, s);
