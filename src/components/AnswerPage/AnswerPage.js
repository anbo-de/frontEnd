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


class AnswerPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      label : "",
      image : "",
      abstract : ""
    };
  }


  componentDidMount() {

    var qresult = $.post("http://wdaqua-qanary.univ-st-etienne.fr/gerbil", this.props.query, function (data){
      console.log("ressulllllttttttttttt");
      console.log(data);

      //would like to refactor the following to separate functions. this.setState() is not recognized in
      //nested functions


      var gerbilResult={"questions":[{"question":{"answers":"{   \"head\": {     \"vars\": [ \"x\" ]   } ,   \"results\": {     \"bindings\": [       {         \"x\": { \"type\": \"uri\" , \"value\": \"http://dbpedia.org/resource/Michelle_Obama\" }       }     ]   } } ","language":[{"SPARQL":"SELECT DISTINCT ?x WHERE {    <http://dbpedia.org/resource/Barack_Obama> <http://dbpedia.org/property/spouse> ?x .    ?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://dbpedia.org/ontology/Agent> .  }  limit 1000"}]}}]};

      var jresult = JSON.parse(data.questions[0].question.answers);

      // console.log("json parse printtttttt");
      // console.log("result count: " + jresult.results.bindings.length);
      // console.log("results: ");
      // console.log(jresult.results.bindings[0].x);

      console.log("json");
      console.log(jresult);
      console.log("result count: " + jresult.results.bindings.length);
      console.log("results: ");


      //depending on the number of results, handle accordingly:
      if (jresult.results.bindings.length == 1){

        console.log("Variable"+jresult.head.vars[0]);
        var variable=jresult.head.vars[0];

        var type=jresult.results.bindings[0][variable].type;
        var value=jresult.results.bindings[0][variable].value;
        console.log("Result "+type+" "+value);

        if (type="uri"){
          //There is only one uri
          var sparqlQuery="select ?label ?abstract ?image where { "
            + "<"+value+"> rdfs:label ?label . "
            + " OPTIONAL{ "
            + "<"+value+"> dbo:thumbnail ?image . "
            + "} "
            + " OPTIONAL{ "
            + "<"+value+"> dbo:abstract ?abstract . "
            + "} "
            + " FILTER (lang(?label)=\"en\" && lang(?abstract)=\"en\") "
            + " } ";

          this.serverRequest = $.get(
            "http://dbpedia.org/sparql?query="+encodeURIComponent(sparqlQuery)+"&format=application%2Fsparql-results%2Bjson&CXML_redir_for_hrefs=&timeout=30000&debug=on",
            function (result) {
              console.log(result);
              console.log(result.results.bindings[0].label.value);
              console.log(result.results.bindings[0].image.value);
              console.log(result.results.bindings[0].abstract.value);
              this.setState({ label : result.results.bindings[0].label.value,
                abstract : result.results.bindings[0].abstract.value,
                image : result.results.bindings[0].image.value});
            }.bind(this), "json")


        }
        else if (type == "literal") {
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
        < ImageComponent image={this.state.image}></ImageComponent>
        <Label>{this.state.label}</Label>
        <Label>{this.state.abstract}</Label>
      </div>
    );
  }




}
export default withStyles(AnswerPage, s);
