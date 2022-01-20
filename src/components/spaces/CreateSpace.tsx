import { Component, SyntheticEvent } from "react";
import { User } from "../../model/Model";
import { DataService } from "../../services/DataService";

interface CustomEvent {
    target: HTMLInputElement
}
export interface ICreateSpaceState {
    name?: string,
    location?: string,
    photoURL?: string,
    photo?: File
}
interface ICreateSpaceProps {
    dataService: DataService;
}

export class CreateSpace extends Component<ICreateSpaceProps, ICreateSpaceState> {

    state: ICreateSpaceState = {
        name:'',
        location: '',
        photoURL: ''
    }

    private setName(event: CustomEvent) {
        this.setState({ name: event.target.value });
    }

    private setLocation(event: CustomEvent) {
        this.setState({ location: event.target.value });
    }

    private setPhotoUrl(event: CustomEvent) {
        if (event.target.files && event.target.files[0]) {
            this.setState({ photo: event.target.files[0] });
        }
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const stateClone = {...this.state};
        console.log('State Clone')
        console.log(stateClone)
        try {
            const id = await this.props.dataService.createSpace(stateClone);  
            alert(`created space with id ${id}`);
        } catch (error) {
            alert(`Error while creating space`);
            console.error(error)
        }

    }

    render() {
            let photoSpace;
            if (this.state.photo) {
                const localPhotoURL = URL.createObjectURL(this.state.photo)
                photoSpace = <img alt='' src={localPhotoURL} />
            } else {
                photoSpace = <div></div>
            }
            return <form onSubmit={e => this.handleSubmit(e)}>
                <label>Name:<br />
                    <input name='space name' value={this.state.name} onChange={e => this.setName(e)} />
                </label><br />
                <label>Location:<br />
                    <input name='space location' value={this.state.location} onChange={e => this.setLocation(e)} />
                </label><br />
                <label>Photo:<br />
                    <input name='photo' type='file' onChange={e => this.setPhotoUrl(e)} />
                </label><br />
                {photoSpace}<br />
                <input data-test="submit-button" type="submit" value="Create space" />
            </form>
    }

}