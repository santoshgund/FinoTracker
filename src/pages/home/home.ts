import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { MembersPage } from '../members/members';
import { MemberPassbookPage } from "../member-passbook/member-passbook";


@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class HomePage {
    username: string;
    @ViewChild('halfDoughnutCanvas') halfDoughnutCanvas;
    halfDoughnutChart: any;

    constructor(
        public nav: NavController) { }

    ionViewDidLoad() {
        Chart.pluginService.register({
            beforeDraw: function (chart) {
                var data = chart.data.datasets[0].data;
                var sum = data.reduce(function (a, b) {
                    return a + b;
                }, 0);
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
                ctx.restore();
                var fontSize = (height / 10).toFixed(2);
                ctx.font = fontSize + "px Arial";
                ctx.textBaseline = "middle";
                var text = sum,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    //textY = 120;
                    textY = height - 15;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        });
        this.halfDoughnutChart = this.getHalfDoughnutChart();


    }

    gotToMemberList() {
        this.nav.push(MembersPage);
    }

    gotToMemberPassbook() {
        this.nav.push(MemberPassbookPage);
    }
    getHalfDoughnutChart() {

        let data = {
            labels: ["Available", "Disbussed", "Interest", "Penulty"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    '#4CAF50',
                    '#FF6E40',
                    '#FFEA00',
                    '#FE5151'
                ],
                hoverBackgroundColor: ["#81C784", "#FF7043", "#FFEE58", "#FAA0A1"]

            }]
        };

        let options = {
            circumference: Math.PI,
            rotation: 1.0 * Math.PI
        }

        return this.halfDoughnutChart = new Chart(this.halfDoughnutCanvas.nativeElement, { type: 'doughnut', data, options });
        //return this.getChart(this.halfDoughnutCanvas.nativeElement, "doughnut", data, options);


    }
}