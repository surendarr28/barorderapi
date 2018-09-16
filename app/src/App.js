import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import mainImage from './images/doll.png';
import Title from './components/title/title.component';
import Timer from './components/timer/timer.component';


class App extends Component {

  componentDidMount = () => {
    
    let doll = document.getElementById("doll")
    window.addEventListener("mousemove", (e) => {
      var deg = (e.pageX / window.innerWidth) * 100;
      var deegg = 0;
      if (deg < 50) {
        deegg = Math.floor(Math.random() * -30) + -1
      }


      if (deg > 50) {
        deegg = Math.floor(Math.random() * 30) + 1;
      }

      doll.style.transform = "translate(-50%, -50%) rotate(" + deegg + "deg)";
    })

    doll.addEventListener("mouseover", e => {
      doll.style.top = "85%";
    });

    doll.addEventListener("mouseout", e => {
      doll.style.top = "90%";
    });

    // doll.addEventListener("click", e => {
    //   if (doll.style.top === "85%") {
    //     for (var i = 1; i <= 5; i++) {
    //       document.getElementById("box" + i).style.bottom = "-1000px";
    //     }
    //     doll.style.top = "90%";
    //   } else {
    //     dollChange();
    //   }
    // })
    // let box = document.getElementsByClassName('box');
    // console.log(box);
    // for (var i = 0; i < box.length; i++) {
    //   console.log(box[i]);
    //   box[i].addEventListener("mouseover", e => {
    //     console.log(e);
    //     for (var i = 0; i < box.length; i++) {
    //       box[i].style.width = "100px";
    //       box[i].style.height = "100px";
    //       box[i].style.bottom = "10%";
    //       box[i].style.left = "50%";
    //       box[i].style.transform = "translate(-50%, -50%) rotate(0deg)";
    //       dollChange();
    //     }
    //     e.target.style.width = "500px";
    //     e.target.style.height = "300px";
    //     e.target.style.bottom = "10%";
    //     e.target.style.left = "50%";
    //     e.target.style.transform = "translate(-50%, -50%) rotate(0deg)";
    //     e.target.style.backgroundColor = "#b4b3b3";
    //     e.target.style.zIndex = 1000;
    //   })
    // }

    // let dollChange = () => {
    //   doll.style.top = "85%";
    //   // document.getElementById("box1").style.left = Math.floor(Math.random() * 700) + 300+"px";
    //   // document.getElementById("box2").style.left = Math.floor(Math.random() * 700) + 300+"px";
    //   // document.getElementById("box3").style.left = Math.floor(Math.random() * 700) + 300+"px";
    //   // document.getElementById("box4").style.left = Math.floor(Math.random() * 700) + 300+"px";
    //   // document.getElementById("box5").style.left = Math.floor(Math.random() * 700) + 300+"px";

    //   for (var i = 1; i <= 5; i++) {
    //     document.getElementById("box" + i).style.bottom = Math.floor(Math.random() * 250) + 200 + "px";
    //     document.getElementById("box" + i).style.width = "100px";
    //     document.getElementById("box" + i).style.height = "100px";
    //     document.getElementById("box" + i).style.backgroundColor = "#E91E63";
    //     document.getElementById("box" + i).style.zIndex = 1;
    //     document.getElementById("box" + i).style.left = Math.floor(Math.random() * 700) + 300 + "px";
    //     document.getElementById("box" + i).style.transform = "translate(-50%, -50%) rotate(" + Math.floor(Math.random() * -10) + 10 + "deg)";
    //   }
    // }

  }
  render() {
    return (
      <div>
        {/* <div className="box box1" id="box1">
          <div className="close-box"></div>
        </div>
        <div className="box box2" id="box2">
          <div className="close-box"></div>
        </div>
        <div className="box box3" id="box3">
          <div className="close-box"></div>
        </div>
        <div className="box box4" id="box4"></div>
        <div className="box box5" id="box5"></div> */}
        <div className="center-focus" id="doll">
          <img src={mainImage} />
        </div>
        <Title></Title>
        <Timer type="mirrage" position="top-left"></Timer>
        <Timer type="birth" position="bottom-right"></Timer>
        <Timer type="birthinit" position="top-right"></Timer>
      </div>
    );
  }
}

export default connect()(App);
