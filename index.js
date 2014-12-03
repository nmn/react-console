'use strict';

var React = require('react');
var R = React.DOM;
var s = require('react-prefixr');

module.exports = React.createClass({

  render: function(){

    // a bunch of default styling for text in a console : Always assuming a default letter-spacing
    // TODO refactor to use defaultProps
    var fontFamily = this.props.fontFamily || '"Menlo", "courier", "fixed-width"';
    var fontSize = this.props.fontSize || 16;
    var lineHeight = this.props.lineHeight || 100;
    var paddingTop = this.props.paddingTop || this.props.padding || 0;
    var paddingLeft = this.props.paddingLeft || this.props.padding || 0;
    var paddingRight = this.props.paddingRight || this.props.padding || 0;
    var paddingBottom = this.props.paddingBottom || this.props.padding || 0;

    var comp = this.props.component || R.div;
    var width = this.props.width; // required. More work outside, less work inside = more control
    var height = this.props.height;
    var scrollTop = this.props.scrollTop;

    var fromTop = 0;
    var texts = this.props.logs.map(function(log, index){

      var styles = s({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingTop: paddingTop,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        paddingLeft: paddingLeft,
        transform: 'translateY('+fromTop+'px)'
      });

      var numOfLines = Math.ceil((log.length * 0.6 * fontSize)/(width - paddingLeft - paddingRight));
      var elHeight = (numOfLines * (fontSize * lineHeight/100)) + paddingTop + paddingBottom;

      fromTop += elHeight;

      if(scrollTop > fromTop || (fromTop-elHeight) > (scrollTop + height) ){
        return null;
      }

      return comp({
        style: styles,
        key: 'log-' + index
      }, log);
    });

    texts = texts.filter(function(el){return !!el;});

    return R.section({
      style: {
        fontFamily: fontFamily,
        background: 'rgb(220,220,220)',
        fontSize: fontSize,
        lineHeight: lineHeight + '%',
        width: this.props.width,
        position: 'relative',
        height: fromTop
      },
    },
      texts
    );
  }

});

