import React, { Component } from 'react';
import ItemList from './ItemList';


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

        let theCourse
        if (auth) {
            theCourse = await context.data.getAllCourse(auth.username, hashPass);
            console.log(theCourse)
            console.log('poop')
        } else {
            this.props.history.push(`/course/notOwned`);
        }
            if (theCourse) {
           this.setState({
            id: theCourse.id,
            title: theCourse.title,
            userId: auth.id,
            user: auth,
            hashPass: hashPass,
            fullArray: theCourse,
        })
    }
} 

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