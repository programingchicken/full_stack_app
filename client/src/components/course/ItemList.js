import React from "react";


const ListItem = ({item}) => {
    console.log(item)
    return (
        <React.Fragment>
            <a type="button" href={`/course/detail/${item.id}`} style={styles.aButtons}><span style={styles.span}>Course</span><span style={styles.span2}>{item.title}</span></a>
        </React.Fragment>
    )
};

const styles = {
    aButtons: {
        padding: 70,
        'margin-top': '25px',
        'padding-left': 110,
        'padding-right': 110,
        justifyContent: 'left',
        alignItems: 'left',
        'margin-left': 25,
        'width': 80,
        position: 'relative',
        top: '100px',
        background: '#7c689b',
        'border-radius': '15px',
        color: '#fff'
    },

    span: {
        position: 'relative',
        right: '70px',
        top: '-25px',
        opacity: '80%',
    },
    span2: {
        position: 'relative',
        right: '120px',
        'font-size': '23px',

    }
}

export default ListItem;