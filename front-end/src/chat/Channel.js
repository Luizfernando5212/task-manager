import React from 'react';

const Channel = (props) => {
    // const { channels, onClick } = props;

    const click = () => {
        props.onClick(props.id);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{props.name}</div>
            {/* <span>{props.participants}</span> */}
        </div>
    );
};

export default Channel;

// export class Channel extends React.Component {

//     click = () => {
//         this.props.onClick(this.props.id);
//     }

//     render() {
//         return (
//             <div className='channel-item' onClick={this.click}>
//                 <div>{this.props.name}</div>
//                 <span>{this.props.participants}</span>
//             </div>
//         )
//     }
// }