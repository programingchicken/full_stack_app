import React, { Component } from 'react';
import ItemList from './ItemList';


class Courses extends Component {
//org state
    state = {
        id: '',
        title: '',
        userId: '',
        user: '',
        hashPass: '',
        fullArray: [],
        errors: [],
    }

        //mounts after
   async componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass 


        //checks for auth

        let theCourse = await context.data.getAllCourse();
            console.log(theCourse)
            console.log('poop')


            
            if (theCourse) {
   
            //fix error for if you are not auth but need data
                if (auth) {
                    this.setState({
                        id: theCourse.id,
                        title: theCourse.title,
                        userId: auth.id,
                        user: auth,
                        hashPass: hashPass,
                        fullArray: theCourse,
                    })
                } else { 
                    this.setState({
                        id: theCourse.id,
                        title: theCourse.title,
                        fullArray: theCourse,
                    })
                }

    }
} 


  //page
    render() {
        const {
            fullArray,
        } = this.state;
const items = fullArray.map(elm => <ItemList key={elm.id} item={elm}/>) 
    return (

        <div className="bounds">
            <div className="grid-33 centered signin">
                <div style={styles.fix}><div style={styles.aDiv}>{items}<a type="button" href='/course/create' style={styles.aButtons2}><span style={styles.aButtons3}> + New Course</span></a></div></div>
            </div>
        </div>
)



    }

    

  //change vals of text input 
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }



    //cancel
    cancel = () => {
        this.props.history.push('/courses');
    }
}



//styles
const styles = {

    aButtons2: {
        padding: 70,
        paddingLeft: 110,
        paddingRight: 110,
        justifyContent: 'left',
        alignItems: 'left',
        marginLeft: 25,
        width: 80,
        height: 30,
        background: '#7c689b',
        borderRadius: '15px',
        opacity: '30%',
        color: '#7c689b',
        position: 'relative',
        right: '0px',
        top: '125px',
    },
    aButtons3: {
        justifyContent: 'left',
        alignItems: 'left',
        opacity: '100%',
        color: '#fff',
        position: 'relative',
    },
    aDiv: {
        margin: '15%',
        marginTop: '-80px',
        height: '30%',

        width: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignContent: 'space-around',
    },
    aDiv2: {
        marginTop: '190px',
        justifyContent: 'left',

        height: '0px',
        width: '100%',
        display: 'flex',
    },
fix: {
    justifyContent: 'center',
    width: '100%',
}

}
export default Courses