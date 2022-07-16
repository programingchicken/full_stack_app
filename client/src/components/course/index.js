import React, { Component } from 'react';
import ItemList from './ItemList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { add } from '@fortawesome/free-solid-svg-icons' // <-- import styles to be used

class Courses extends Component {

    state = {
        id: '',
        title: '',
        userId: '',
        user: '',
        hashPass: '',
        fullArray: [],
        errors: [],
    }

   async componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass 
        const theCourse = await context.data.getAllCourse( auth.username, hashPass);
        console.log(theCourse)
        if (theCourse) {
           this.setState({
            id: theCourse.id,
            title: theCourse.title,
            userId: auth.id,
            user: auth,
            hashPass: hashPass,
            fullArray: theCourse,
        })
    } else {

    }

    }

    render() {
        const {
            fullArray,
        } = this.state;
const items = fullArray.map(elm => <ItemList item={elm}/>) 
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <div style={styles.fix}><div style={styles.aDiv}>{items}<a type="button" href='/course/create' style={styles.aButtons2}><span style={styles.aButtons3}> + New Course</span></a></div></div>
                </div>
            </div>
        );
    }

    

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            user,
            hashPass,
        } = this.state;

        // Create user
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        };

        context.data.updateCourse(id, course, user.username, hashPass)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${course.title} is successfully authenticated!`)

                            this.props.history.push('/authenticatedCourse');
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });

    }

    cancel = () => {
        this.props.history.push('/courses');
    }
}

const styles = {

    aButtons2: {
        padding: 70,
        'padding-left': 110,
        'padding-right': 110,
        justifyContent: 'left',
        alignItems: 'left',
        'margin-left': 25,
        'width': 80,
        height: 30,
        background: '#7c689b',
        'border-radius': '15px',
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
        'margin-top': '-80px',
        height: '30%',

        width: '90%',
        display: 'flex',
        'flex-wrap': 'wrap',
        'justify-content': 'left',
        'align-content': 'space-around',
    },
    aDiv2: {
        'margin-top': '190px',
        'justify-content': 'left',

        height: '0px',
        width: '100%',
        display: 'flex',
    },
fix: {
    'justify-content': 'center',
    width: '100%',
}

}
export default Courses