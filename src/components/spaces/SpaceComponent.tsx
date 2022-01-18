import { Component } from "react";
import './SpaceComponent.css';

interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    photoURL?: string,
    description?: string,
    reserveSpace: (spaceId: string) => void

}

const defaultImage: string = require('../../assets/lecture-theater.jpg');

export class SpaceComponent extends Component <SpaceComponentProps> {

    private renderImage(){
        if (this.props.photoURL) {
            return <img src={this.props.photoURL} alt='Photo of location'/>
        } else {
            return <img src={defaultImage} alt='Photo of location'/>
        }
    }

    render(){
        return (
            <div className='spaceComponent'>
                {this.renderImage()}
                <label className='name' >{this.props.name}</label><br/>
                <label className='spaceId'>{this.props.spaceId}</label><br/>
                <label className='location'>{this.props.location}</label><br/>
                <button onClick={() =>this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
            </div>
        );
    }
}
