import React, { Component } from 'react';
import { connect } from 'react-redux';
import './timer.component.css';

import { MrriageTimer, BirthInitTimer, BirthTimer } from '../../actions/timerAction'

class Timer extends Component {

    componentDidMount = () => {
        console.log(this.props.type);
        switch (this.props.type) {
            case "mirrage":
                this.props.showMarriageTimer();
            case "birthinit":
                this.props.showBirthInitTimer();
            case "birth":
                this.props.showBirthTimer();
        }
        let marrageElm = document.getElementById(this.props.type);
        console.log(marrageElm);

        marrageElm.addEventListener("mouseover", e => {
            dollChange();
            console.log("dd")
        });

        let dollChange = () => {
            console.log(document.getElementById("box1"));
            //doll.style.top = "85%";
            // document.getElementById("box1").style.left = Math.floor(Math.random() * 700) + 300+"px";
            // document.getElementById("box2").style.left = Math.floor(Math.random() * 700) + 300+"px";
            // document.getElementById("box3").style.left = Math.floor(Math.random() * 700) + 300+"px";
            // document.getElementById("box4").style.left = Math.floor(Math.random() * 700) + 300+"px";
            // document.getElementById("box5").style.left = Math.floor(Math.random() * 700) + 300+"px";

            for (var i = 1; i <= 5; i++) {
                document.getElementById("box" + i).style.bottom = Math.floor(Math.random() * 250) + 200 + "px";
                document.getElementById("box" + i).style.width = "100px";
                document.getElementById("box" + i).style.height = "100px";
                document.getElementById("box" + i).style.backgroundColor = "#E91E63";
                document.getElementById("box" + i).style.zIndex = 1;
                document.getElementById("box" + i).style.left = Math.floor(Math.random() * 700) + 300 + "px";
                document.getElementById("box" + i).style.transform = "translate(-50%, -50%) rotate(" + Math.floor(Math.random() * -10) + 10 + "deg)";
            }
        }
    }

    render() {
        let abs_days = 0;
        let position = this.props.position;
        if (this.props.timer[this.props.type]) {
            let f_month = this.props.timer[this.props.type].month.toString().length == 1 ?
                "0" + this.props.timer[this.props.type].month :
                this.props.timer[this.props.type].month;
            let f_date = this.props.timer[this.props.type].date.toString().length == 1 ?
                "0" + this.props.timer[this.props.type].date :
                this.props.timer[this.props.type].date;

            let f_year = this.props.timer[this.props.type].year;

            var date_future = new Date(f_month + "/" + f_date + "/" + f_year);
            var date_now = new Date();

            var seconds = Math.floor((date_future - (date_now)) / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);

            hours = hours - (days * 24);
            minutes = minutes - (days * 24 * 60) - (hours * 60);
            seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

            abs_days = Math.abs(days);
        }

        return (
            <div className={["timer", position].join(' ')} id={this.props.type}>
                {
                    this.props.timer[this.props.type] && (<div className='timer-continer'>
                        {/* <div>{this.props.timer[this.props.type].slogan}</div> */}
                        <div className='timer-date'>
                            {this.props.timer[this.props.type].date.toString().length == 1 ?
                                "0" + this.props.timer[this.props.type].date :
                                this.props.timer[this.props.type].date}
                        </div>
                        <div className="timer-devider"><i className="fas fa-heart"></i></div>
                        <div className='timer-month'>
                            {this.props.timer[this.props.type].month.toString().length == 1 ?
                                "0" + this.props.timer[this.props.type].month :
                                this.props.timer[this.props.type].month}
                        </div>
                        <div className="timer-devider"><i className="fas fa-heart"></i></div>
                        <div className='timer-year'>
                            {this.props.timer[this.props.type].year}
                        </div>
                    </div>)

                }
                <div className="days">
                    {abs_days + " DAYS"}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    showMarriageTimer: () => dispatch(MrriageTimer()),
    showBirthInitTimer: () => dispatch(BirthInitTimer()),
    showBirthTimer: () => dispatch(BirthTimer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
