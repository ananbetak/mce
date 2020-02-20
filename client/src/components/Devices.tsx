import React, { Component } from 'react';
import '.././App.css';
import Tree from 'react-tree-graph';
import { MockData } from '../MockData';

export interface CustomProps {
    devices?: any;
}

type MyProps = any;
type MyState = any;

class Devices extends Component<CustomProps, MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            devices: [],
            ViewStatusType: 'Default',
            DataTo3D: null,
            MockData: null
        };
    }

    componentDidMount() {
        this.setState({
            devices: this.props.devices,
        }, () => {
            this.setDataTo3D();
        });
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (nextProps.devices !== prevState.devices) {
            return { devices: nextProps.devices };
        }
        else return null;
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.devices !== this.props.devices) {
            this.setState({ devices: this.props.devices }, () => this.setDataTo3D());
        }
    }

    setDataTo3D() {

        if (this.state.ViewStatusType === 'Type') {
            this.setState({ MockData: MockData });
            const { devices } = this.state;
            let tempdevices: any = devices;
            tempdevices = tempdevices.filter((x: any) => x.deviceDescriptor.bDescriptorType === 1);
            let tempData: any = {
                name: null,
                children: [],
            };
            tempData.name = 'Devices';
            tempData.children = [];
            for (let i = 0; i < tempdevices.length; i++) {
                let HubOrDevice = null;
                if (tempdevices[i].deviceDescriptor.bDescriptorType === 1) {
                    HubOrDevice = 'Device';
                } else {
                    HubOrDevice = 'Hub';
                }
                const tempData2 = {
                    name: `Device Address : ${tempdevices[i].deviceAddress} (${HubOrDevice})`,
                    children: [
                        {
                            name: `Device Vendor Id${tempdevices[i].deviceDescriptor.idVendor}`
                        },
                        {
                            name: `Device Product Id${tempdevices[i].deviceDescriptor.idProduct}`
                        }
                    ]
                }
                tempData.children.push(tempData2);
            }
            this.setState({
                DataTo3D: tempData
            }, () => {
                
            });
        } else {
            const { devices } = this.state;
            let tempData: any = {
                name: null,
                children: [],
            };
            tempData.name = 'USB CONNECTIONS';
            tempData.children = [];
            for (let i = 0; i < devices.length; i++) {
                let HubOrDevice = null;
                if (devices[i].deviceDescriptor.bDescriptorType === 1) {
                    HubOrDevice = 'Device';
                } else {
                    HubOrDevice = 'Hub';
                }
                const tempData2 = {
                    name: `Device Address : ${devices[i].deviceAddress} (${HubOrDevice})`,
                    children: [
                        {
                            name: `Device Vendor Id${devices[i].deviceDescriptor.idVendor}`
                        },
                        {
                            name: `Device Product Id${devices[i].deviceDescriptor.idProduct}`
                        }
                    ]
                }
                tempData.children.push(tempData2);
            }
            this.setState({
                DataTo3D: tempData
            }, () => {
            });
        }
    }

    handleView = (viewValue: string) => {
        if (viewValue === 'Default') {
            this.setState({ ViewStatusType: 'Default' }, () => this.setDataTo3D());
        } else if (viewValue === 'Type') {
            this.setState({ ViewStatusType: 'Type' }, () => this.setDataTo3D());
        } else {
            this.setState({ ViewStatusType: 'Default' }, () => this.setDataTo3D());
        }
    }

    render() {
        return (
            <div className="custom-container">
                <div>
                    <button className="button" onClick={() => this.handleView('Default')}>
                        Default View
                    </button>
                    <button className="button" onClick={() => this.handleView('Type')}>
                        Type View
                    </button>
                </div>
                {this.state.devices.length > 0 && this.state.DataTo3D !== null ?
                    <Tree
                        data={this.state.DataTo3D}
                        height={400}
                        width={400}
                        circle={15}
                        svgProps={{
                            className: 'custom'
                        }}
                    >
                    </Tree>
                    : <div className="Error"> No Data To Display </div>}
                {this.state.ViewStatusType === 'Type' && this.state.MockData !== null ?
                    <Tree
                        data={this.state.MockData}
                        height={400}
                        width={400}
                        circle={15}
                        svgProps={{
                            className: 'custom'
                        }}
                    >
                    </Tree> : null
                }
            </div>
        );
    }
}

export default Devices;
