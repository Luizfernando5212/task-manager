import React from 'react';

const Channel = (props) => {
    // const { channels, onClick } = props;

    const click = () => {
        props.onClick(props.id);
    }

    return (
        <li><button
            className="button-chat"
            data-user={props.name}
            onClick={click}>{props.name}</button>
        </li>

        // <div className='channel-item' onClick={click}>
        //     <div>{props.name}</div>
        //     {/* <span>{props.participants}</span> */}
        // </div>
    );
};

export default Channel;
