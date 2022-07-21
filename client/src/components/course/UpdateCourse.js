import React, { Component } from 'react';
import Form from '../Form';



class UpdateCourse extends Component {
//org state
    state = {
        id: '',
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
   async componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass 
        const id = window.location.pathname.split('/')
        console.log(id.length)
        console.log(id[2])
        

        let theCourse = await context.data.getCourse(id[2]);
        console.log(theCourse)
        
        


            //check if you are owner if you are give data if not send some where else
        if (auth.id === theCourse.userId) {


        if (theCourse) {
                  //sets the state
           this.setState({
            id: id[2],
            title: theCourse.title,
            description: theCourse.description,
            estimatedTime: theCourse.estimatedTime,
            materialsNeeded: theCourse.materialsNeeded,
            userId: auth.id,
            user: auth,
            hashPass: hashPass,
        })
    } else {
        this.props.history.push(`/course/oopsNotFound`);
    }
    } else {
        this.props.history.push(`/course/notOwned`);
    }
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
                    <h1 style={styles.sup} >Update Course</h1>
                    <Form  
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                            <React.Fragment>
                                <div style={{display: 'inline-flex', marginTop: '80px'}}>
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
                                <span style={styles.name}>By: {user.name}</span>
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
                                    onChange={this.change}
                                    value={materialsNeeded}
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


        //put to the API
        context.data.updateCourse(id, course, user.emailAddress, hashPass)
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
        const {
            id,
        } = this.state;

        this.props.history.push(`/course/${id}/detail`);
    }
}

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

export default UpdateCourse