import React, { Component } from 'react';
import { connect } from 'react-redux';
import './title.component.css';
import { titleAction, title2Action } from '../../actions/titleAction'
import mojs from 'mo-js';

class Heart extends mojs.CustomShape {
  getShape() { return '<path d="M92.5939814,7.35914503 C82.6692916,-2.45304834 66.6322927,-2.45304834 56.7076029,7.35914503 L52.3452392,11.6965095 C51.0327802,12.9714696 48.9328458,12.9839693 47.6203869,11.6715103 L47.6203869,11.6715103 L43.2705228,7.35914503 C33.3833318,-2.45304834 17.3213337,-2.45304834 7.43414268,7.35914503 C-2.47804756,17.1963376 -2.47804756,33.12084 7.43414268,42.9205337 L29.7959439,65.11984 C29.7959439,65.1323396 29.8084435,65.1323396 29.8084435,65.1448392 L43.2580232,78.4819224 C46.9704072,82.1818068 52.9952189,82.1818068 56.7076029,78.4819224 L70.1696822,65.1448392 C70.1696822,65.1448392 70.1696822,65.1323396 70.1821818,65.1323396 L92.5939814,42.9205337 C102.468673,33.12084 102.468673,17.1963376 92.5939814,7.35914503 L92.5939814,7.35914503 Z"></path>'; }
}
mojs.addShape('heart', Heart);


class Title extends Component {

  componentDidMount = () => {
    var burst = new mojs.Burst({
      radius: { 0: 110 },
      count: 10,
      children: {
        repeat: 999,
        shape: 'heart',
        points: 500,
        fill: ["#ed3c63", "#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"],
        degree: 30,
        angle: { 360: 0 },
        duration: 2000,
        delay: 'stagger( rand(0, 100) )'
      }
    });
    const coords = { x: 0, y: - ((window.innerHeight / 2)-100) };
    console.log(coords);
    burst.tune(coords).play();


    this.props.showTitle();
    // var title = document.getElementById("title");
    // window.addEventListener("mousemove", (e) => {
    //   var percent = (e.pageX / window.innerWidth) * 100;
    //   var y = 0;
    //   var x = 0;
    //   if (percent < 50) {
    //     y = Math.floor(Math.random() * -150) + -1
    //   }
    //   if (percent > 50) {
    //     y = Math.floor(Math.random() * 150) + 1
    //   }

    //   title.style.left = y + "px";
    // });
  }
  render() {
    return (
      <div className="title-cont" id="title" >
      <svg aria-hidden="true" data-prefix="far" data-icon="heart" class="heart-img svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="-5 -20 520 520">
      <path fill="#FFFFFF" stroke="#ed3c63" stroke-width="4" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
      </svg>
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
