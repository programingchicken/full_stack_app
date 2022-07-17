import React from "react";

//page
const ListItem = ({item}) => {
    console.log(item)
    return (
        <React.Fragment>
            <a type="button" href={`/course/${item.id}/detail`} style={styles.aButtons}><span style={styles.span}>Course</span><span style={styles.span2}>{item.title}</span></a>
        </React.Fragment>
    )
};


//styles
const styles = {
    aButtons: {
        padding: 70,
        marginTop: '25px',
        paddingLeft: 110,
        paddingRight: 110,
        justifyContent: 'left',
        alignItems: 'left',
        marginLeft: 25,
        width: 80,
        position: 'relative',
        top: '100px',
        background: '#7c689b',
        borderRadius: '15px',
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
        fontSize: '23px',

    }
}

export default ListItem;