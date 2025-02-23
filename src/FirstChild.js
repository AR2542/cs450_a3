import React, { Component } from "react";
import * as d3 from "d3";

class FirstChild extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() { this.firstchildgraph(); }
    componentDidUpdate() { this.firstchildgraph(); }
    firstchildgraph() {
        const { firstdata } = this.props;
        const margin = { top: 40, right: 50, bottom: 50, left: 50 };
        const width = 1000;
        const height = 400;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(".FirstChild_svg").attr("width", width).attr("height", height);
        const innerChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleLinear().domain([0, d3.max(firstdata, d => d.total_bill)]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([0, d3.max(firstdata, d => d.tip)]).range([innerHeight, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        innerChart.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);
        innerChart.append("g").call(yAxis);
        innerChart.selectAll("circle").data(firstdata).enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", "#69b3a2")
            .attr("cx", d => xScale(d.total_bill))
            .attr("cy", d => yScale(d.tip));

        //The Texts containing the titles
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2) 
            .attr("text-anchor", "middle") 
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("Total Bill vs. Tips");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - margin.bottom / 4)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Total Bill");

        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", margin.left / 4) 
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Tips");
    }
    render() {
        return (<svg className="FirstChild_svg"></svg>);
    }
}

export default FirstChild;