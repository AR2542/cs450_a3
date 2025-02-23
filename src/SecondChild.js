import React, { Component } from "react";
import * as d3 from "d3";

class SecondChild extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() { this.secondchildgraph(); }
    componentDidUpdate() { this.secondchildgraph(); }
    secondchildgraph() {
        const { seconddata } = this.props;
        const margin = { top: 40, right: 50, bottom: 50, left: 50 };
        const width = 1000;
        const height = 400;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(".SecondChild_svg").attr("width", width).attr("height", height);
        const innerChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
        const Days = [...new Set(seconddata.map(d => d.day))]; //Obtains all unique days that are in the data
        const avgdailytip = d3.rollup(seconddata, v => d3.mean(v, d => d.tip), d => d.day); //Calculates the average tip grouped by all days

        const avgArray = Array.from(avgdailytip, ([day, avgTip]) => ({ day, avgTip }))

        const xScale = d3.scaleBand().domain(Days).range([0, innerWidth]).padding(0.3);
        const yScale = d3.scaleLinear().domain([0, d3.max(avgArray, d => d.avgTip)]).range([innerHeight, 0]);

        innerChart.append("g").attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
        innerChart.append("g").call(d3.axisLeft(yScale));

        innerChart.selectAll("rect").data(avgArray).enter()
            .append("rect")
            .attr("x", d => xScale(d.day))
            .attr("y", d => yScale(d.avgTip))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.avgTip))
            .attr("fill", "#69b3a2");
        
        //The Texts containing the titles
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("Average Tip by Day");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - margin.bottom / 4)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Day");

        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", margin.left / 4)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Average Tip");
    }
    render() {
        return (<svg className="SecondChild_svg"></svg>);
    }
}

export default SecondChild;