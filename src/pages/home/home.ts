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
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50'
                ],
                hoverBackgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "#81C784"]

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