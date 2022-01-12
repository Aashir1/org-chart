import React from 'react';
import * as TreeChart from "d3-org-chart";
import * as d3 from "d3";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class OrgChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
    }

    componentDidMount() {
        this.createDiagram();
    }

    componentDidUpdate(prevProps, prevState) {
        this.createDiagram();
    }

    render() {
        return (
            <div>
                <button onClick={this._exportPdf}>
                    export pdf
                </button>
                <div style={{ width: "50vw", border: "1px solid" }} ref={(node) => (this.node = node)} />
            </div>
        );
    }
    _exportPdf = () => {

        // html2canvas(this.node).then(canvas => {
        //     document.body.appendChild(canvas);  // if you want see your screenshot in body.
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     pdf.addImage(imgData, 'PNG', 0, 0);
        //     pdf.save("download.pdf");
        // });      

    }

    createDiagram() {
        const node = this.node;
        if (!this.props.data) {
            return;
        }
        if (!this.chart) {
            this.chart = new TreeChart();
        }
        this.chart
            .container(node)
            .data(this.props.data)
            .svgWidth(500)
            .initialZoom(0.4)
            .onNodeClick(d => console.log(d + " node clicked"))
            .render();

    }
    getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function (property) {
            return typeof object[property] == 'function';
        });
    }
}

export default OrgChartComponent;