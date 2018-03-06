import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getRoomList, createRoom } from '../actions';

class Lobby extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomName: ''
        }

        this.dbChatRef = db.ref('/chat-rooms');
    }

    componentDidMount(){
        this.dbChatRef.on('value', snapshot => {
            this.props.getRoomList(snapshot.val());
        });
    }

    componentWillUnmount(){
        this.dbChatRef.off();
    }

    handleCreateRoom(e){
        e.preventDefault();

        this.props.createRoom(this.state.roomName);

        this.setState({
            roomName: ''
        })
    }

    render(){
        const { roomName } = this.state;
        const { roomList } = this.props;

        // console.log('Lobby props', this.props);
        let rooms = [];

        if(roomList){
            rooms = Object.keys(roomList).map((key, index) => {
                return (
                    <li className='collection-item' key={index}>
                        <Link to={`/room/${key}/log/${roomList[key].chatLogId}`}>{ roomList[key].name }</Link>
                    </li>
                );
            });
        } else {
            rooms.push(<li key='0' className='collection-item'>No rooms available. Create one above.</li>)
        }

        return(
            <div>
                <h3>Lobby</h3>
                <form onSubmit={this.handleCreateRoom.bind(this)}>
                    <label>Chat Room Name</label>
                    <input type='text' onChange={ e => this.setState({ roomName: e.target.value })} value={ roomName }></input>
                    <button className='btn'>Create Room</button>
                </form>
                <ul className='collection'>
                    {rooms}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        roomList: state.chat.roomList
    }
}

export default connect( mapStateToProps, { getRoomList, createRoom } )(Lobby);
