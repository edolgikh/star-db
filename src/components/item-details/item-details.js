import React, { Component } from 'react';
import Spinner from "../spinner";

import './item-details.css';

const Record = ({item, field, label}) =>{
    return(
        <li className="list-group-item">
            <span className="term">{ label }</span>
            <span>{ item[field] }</span>
        </li>
    );
};
export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        imageItem: null,
    };

    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId ||
           this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem(){
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId){
            return;
        }
        getData(itemId)
            .then((item)=>{
                this.setState({
                    item,
                    imageItem: getImageUrl(item),
                    loading: false,
                });
            });
    }

    render() {
        const { item, loading, imageItem } = this.state;
        const {children} = this.props;
        if (!item){
            return <span>Select an item from the list </span>;
        }

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <PersonView item={item} image = {imageItem} children = {children} /> : null;
        return (
            <div className="person-details card">
                { spinner }
                { content }
            </div>
        )
    }
}

const PersonView = ({ item, image, children }) =>{

    const { name } = item;
    return(
        <React.Fragment>
            <img className="person-image"
                 src={ image } />

            <div className="card-body">
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child)=>{
                            //добавляем свойство item каждой копии child, так как реакт элементы immutable
                            return React.cloneElement(child, {item});
                        })
                    }
                    {/*<li className="list-group-item">*/}
                    {/*    <span className="term">Gender</span>*/}
                    {/*    <span>{ gender }</span>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item">*/}
                    {/*    <span className="term">Birth Year</span>*/}
                    {/*    <span>{ birthYear }</span>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item">*/}
                    {/*    <span className="term">Eye Color</span>*/}
                    {/*    <span>{ eyeColor }</span>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </React.Fragment>
    )

}