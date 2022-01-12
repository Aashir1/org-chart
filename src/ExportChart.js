import React, { useRef } from "react";
import "./styles.css";
import OrganizationChart from "@dabeng/react-orgchart";
import { orgData } from "./Tree";
import { User, ExternalLink } from "react-feather";

const OrgChart = () => {

    const node = useRef();

    const renderNode = ({ nodeData }) => {
        return (
            <div className="org-node-container">
                <div
                    className="open-user-details"
                    onClick={() => {
                        window.open("https://h65cz.csb.app/");
                    }}
                >
                    <ExternalLink size={14} />
                </div>
                <div className="org-person">
                    <div>
                        <User size={32} />
                    </div>
                </div>
                <div className="org-name">{nodeData.name}</div>
                <div className="org-title">{nodeData.designation}</div>
                <div className="org-title">
                    Data unclassified: {nodeData.data_unclassified}
                </div>
                <div className="org-title">compliance: {nodeData.compliance}</div>
                {nodeData.children.length > 0 && (
                    <div
                        className="org-node-children"
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            let childNodes = document.getElementById(nodeData.id)
                                .parentElement.childNodes;
                            if (childNodes[1].className.includes("hidden")) {
                                childNodes[0].className = "oc-node";
                                childNodes[1].className = "";
                            } else {
                                childNodes[0].className = "oc-node isChildrenCollapsed";
                                childNodes[1].className = "hidden";
                            }
                        }}
                    >
                        {nodeData.children.length} Reportees
                    </div>
                )}
            </div>
        );
    }

    const exportTo = () => {
        console.log(node)
        node.current.exportTo("chart", 'pdf');
    };

    return (
        <div style={{ width: "50vw" }}>
            <button
                onClick={exportTo}
                style={{ marginLeft: "2rem" }}
            >
                Export
            </button>
            <OrganizationChart
                ref={node}
                datasource={orgData}
                chartClass="sekure-org-chart"
                pan={true}
                zoom={true}
                NodeTemplate={renderNode}
            />
        </div>
    );

}

export default OrgChart;
