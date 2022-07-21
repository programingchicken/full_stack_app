import React, { Component } from 'react';
import Form from '../Form';


class CreateCourse extends Component {
//org state
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        user: '',
        hashPass: '',
        errors: [],
        name: '',
    }
    //mounts after
    componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass
        console.log(hashPass)
        console.log(auth)
           this.setState({
            userId: auth.id,
            user: auth,
            hashPass: hashPass,
            name: auth.name,
        })
    }

    //page
    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Create Course</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <React.Fragment>
                                <div style={{display: 'inline-flex'}}>
                                <div style={styles.div1}>
                                <label htmlFor="title" style={styles.title2} >Course Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.change}
                                    placeholder='Course Title...' 
                                    style={styles.title}/>

                                <span id="name"
                                    name="name"
                                    value={user.name} style={styles.name}>By: {user.name}</span>
                                <label htmlFor="description" style={styles.description2} >Course Description</label>
                                <textarea

                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={this.change}
                                    placeholder='Course Description...'
                                    style={styles.description}>
                                </textarea>
                                </div>
                                <div style={styles.div2}>
                                <label htmlFor="estimatedTime" style={styles.estimatedTime2} >Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="estimatedTime"
                                    value={estimatedTime}
                                    onChange={this.change}
                                    placeholder='Estimated Time...'
                                    style={styles.estimatedTime} />
                                <label htmlFor="materialsNeeded" style={styles.materialsNeeded2} >Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={materialsNeeded}
                                    onChange={this.change}
                                    placeholder='Materials List...'
                                    style={styles.materialsNeeded} >
                                </textarea>
                                </div>
                                </div>
                            </React.Fragment>
                        )} />
                </div>
            </div>
        );
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


    //submit
    submit = () => {
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            user,
            hashPass,
            name,
        } = this.state;

        // Create user
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            name,
        };
console.log(hashPass)
console.log(name)

//post to API
        context.data.createCourse(course, user.emailAddress, hashPass)
            .then(errors => {
                          //set state errors
                if (errors.length !== 0) {
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


      //cancel to route
    cancel = () => {
        this.props.history.push('/courses');
    }
}

//styles
const styles = {
div1: {
    width: '55%',
    height: '600px'
},
div2: {
    width: '30%',
    marginLeft: '150px',
},
    title: {
        position: 'relative',
        // left: '-45px',
        // top: '85px',
        // width: '75%',
    },
    title2: {
        position: 'relative',
        // left: '45px',
        // top: '35px',
        // width: '55%',
    },
    estimatedTime: {
        position: 'relative',
        // right: '40px',
        // top: '-270px',
        // width: '30%',
    },
    estimatedTime2: {
        position: 'relative',
        // left: '120px',
        // top: '-315px',
        // width: '30%',
    },
    sup: {
        height: '70px',
        position: 'absolute',
        left: '50px',
        top: '200px',
        marginTop: '-90px',
    },
    description: {
        position: 'relative',
        // left: '40px',
        top: '60px',
        // width: '55%',
    },
    description2: {
        position: 'relative',
        left: '-65px',
        top: '60px',
        // width: '55%',
    },
    materialsNeeded: {
        position: 'relative',
        // right: '-710px',
        // top: '-205px',
        // width: '30%',
    },
    materialsNeeded2: {
        position: 'relative',
        // right: '-885px',
        // top: '-540px',
        // width: '30%',
    },
    name: {
        position: 'relative',
        top: '20px',
        // left: '-755px',
    }
}

export default CreateCourse