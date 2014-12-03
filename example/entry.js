'use strict';

var React = require('react');
var R = React.DOM;
var Console = React.createFactory(require('./../index'));

var inputStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 32,
  border: '1px solid black',
  appearance: 'none',
  padding: 8
};

var ContainerClass = React.createClass({

  getInitialState: function(){
    return {
      logs: [
        'sdhc', 'sdhc', 'sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc',
        'sdhc', 'sdhc', 'sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc',
        'sdhc', 'sdhc', 'sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc','sdhc',
        'sdkjclsdclsc sdkhvlsdcnlsc',
        '"skdhcsdkjch"',
        'skdckjsdcklsc'
      ],
      width: 1440,
      height: 768,
      scrollTop: 0
    };
  },

  componentDidMount: function(){
    this.resize();
    global.addEventListener('resize', this.resize);
    global.addEventListener('scroll', this.scroll);
  },

  componentWillUnmount: function(){
    global.removeEventListener('resize', this.resize);
    global.removeEventListener('scroll', this.scroll);
  },

  resize: function(){
    this.setState({width: global.innerWidth, height: global.innerHeight});
  },

  scroll: function(){
    this.setState({scrollTop: global.scrollY});
  },

  addLog: function(e){
    if(e.keyCode === 13){
      var input = this.refs.input.getDOMNode();
      var text = input.value;
      this.state.logs.push(text);
      input.value = '';
      this.forceUpdate();
    }
  },

  render: function () {
    return R.span({},
      Console({
        logs: this.state.logs,
        width: this.state.width,
        height: this.state.height,
        scrollTop: this.state.scrollTop,
        padding: 8,
        lineHeight: 120
      }),
      R.input({type: 'text', ref: 'input', onKeyUp: this.addLog, style: inputStyle})
    );
  }

});

var Container = React.createFactory(ContainerClass);

global.onload = function(){
  React.render(Container(), global.document.body);
};