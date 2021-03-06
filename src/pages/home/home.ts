import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('pieCanvas') pieCanvas;

    halfDoughnutChart: any;
    barChart: any;

    root = MemberPassbookPage;
    tab1Root = HomePage;
    tab2Root = MembersPage;
    tab3Root = MemberPassbookPage;

    yAxixThreshold: number;
    mySelectedIndex: number;

    single: any[];
    multi: any[];

    view: any[] = [400, 140];
    view1: any[] = [450, 180];
    // options
    showLegend = true;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // pie
    showLabels = true;
    explodeSlices = true;
    doughnut = false;
    chartData = false;

    single1 = [{ "name": "Own Share", "value": 26000 }, { "name": "Interest", "value": 15000 }, { "name": "Penulty", "value": 9000 }];

     single2 = [{ "name": "Share", "value": 290000 }, { "name": "Interest", "value": 125000 },  { "name": "Available", "value": 180000 }];
    
    // multi1 = [{
    //     "name": "Germany", "series": [{ "name": "2010", "value": 7300000 }, { "name": "2011", "value": 8940000 }]
    // }, {
    //     "name": "USA", "series": [{ "name": "2010", "value": 7870000 },
    //     { "name": "2011", "value": 8270000 }]
    // }, { "name": "France", "series": [{ "name": "2010", "value": 5000002 }, { "name": "2011", "value": 5800000 }] }];


    constructor(public nav: NavController, navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
        this.yAxixThreshold = 227000;
    }

    onSelect(event) {
        console.log(event);
    }

    ionViewDidLoad() {
        //this.createBarChart();
        //this.createPieChart();

        // Chart.pluginService.register({
        //     beforeDraw: function (chart) {
        //         if (chart.config.type === 'doughnut') {
        //             var data = chart.data.datasets[0].data;
        //             var sum = data.reduce(function (a, b) {
        //                 return a + b;
        //             }, 0);
        //             var width = chart.chart.width,
        //                 height = chart.chart.height,
        //                 ctx = chart.chart.ctx;
        //             ctx.restore();
        //             var fontSize = (height / 10).toFixed(2);
        //             ctx.font = fontSize + "px Arial";
        //             ctx.textBaseline = "middle";
        //             var text = sum,
        //                 textX = Math.round((width - ctx.measureText(text).width) / 2),
        //                 textY = height - 15;
        //             ctx.fillText(text, textX, textY);
        //             ctx.save();
        //         }
        //     }
        // });
        // this.halfDoughnutChart = this.getHalfDoughnutChart();

        this.chartData = true;
        //Object.assign(this, { single, multi })
    }

    createBarChart() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'horizontalBar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5],
                    backgroundColor: ["Red", 'Blue', 'Yellow', 'Green'],
                    hoverBackgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
                    borderColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: this.yAxixThreshold
                        }
                    }]
                }
            }

        });
    }

    createPieChart() {
        this.barChart = new Chart(this.pieCanvas.nativeElement, {

            type: 'pie',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [2478, 5267, 734, 784, 433]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }

        });
    }

    gotToMemberList() {
        this.nav.push(MembersPage);
    }

    gotToMemberPassbook() {
        this.nav.push(MemberPassbookPage);
    }
    getHalfDoughnutChart() {

        let data = {
            labels: ["Own Contribution", "Interest received"],
            datasets: [{
                label: '# of Total',
                data: [26000, 1500],
                backgroundColor: [
                    '#FF6E40',
                    '#4CAF50',
                    // '#FFEA00',
                    // '#FE5151'
                ],
                // hoverBackgroundColor: ["#81C784", "#FF7043", "#FFEE58", "#FAA0A1"]
                hoverBackgroundColor: ["#FF7043", "#81C784"]
            }]
        };

        let options = {
            circumference: Math.PI,
            rotation: 1.0 * Math.PI
        }

        return this.halfDoughnutChart = new Chart(this.halfDoughnutCanvas.nativeElement, { type: 'doughnut', data, options });
    }
}