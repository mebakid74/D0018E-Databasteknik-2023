import React from "react";
class Contentlist extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.elements.map((el) => <li key={el}>{el}</li>)}
                </ul>
            </div>
        );
    }
}
export default Contentlist;