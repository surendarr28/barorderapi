import React, { Component } from 'react';
import { connect } from 'react-redux';
import './title.component.css';

import { titleAction, title2Action } from '../../actions/titleAction'

class Title extends Component {

  componentDidMount = () => {
    this.props.showTitle();
    var title = document.getElementById("title");
    window.addEventListener("mousemove", (e) => {
    var percent = (e.pageX / window.innerWidth) * 100;
    var y = 0;
    var x = 0;
    if (percent < 50) {
      y = Math.floor(Math.random() * -150) + -1
    }
    if (percent > 50) {
      y = Math.floor(Math.random() * 150) + 1
    }

    title.style.left = y +"px";
  });
  }
  render() {
    return (
      <div className="title-cont" id="title">
        {
          this.props.title.name
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  showTitle: () => dispatch(titleAction()),
  showFullTitle: () => dispatch(title2Action())
})

export default connect(mapStateToProps, mapDispatchToProps)(Title);
