import React, { Component } from 'react';
import Form from '../Form';


class UpdateCourse extends Component {

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
    }

   async componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass 
        const id = window.location.pathname.split('/')
        console.log(id.length)
        console.log(id[3])
        const theCourse = await context.data.getCourse(id[3], auth.username, hashPass);
        console.log(theCourse)
        

        let firstLine = theCourse.materialsNeeded.split(/\n/)
        console.log(firstLine)
        for (let i = 0 ; i < firstLine.length; i++) {
            console.log(firstLine[i])
            if (firstLine[i].charAt(0) !== '*') {
                firstLine[i] = `*${firstLine[i]}`;
            }


            console.log(firstLine[i])
        }

        console.log( firstLine.join(''))
        if (theCourse) {
           this.setState({
            id: id[3],
            title: theCourse.title,
            description: theCourse.description,
            estimatedTime: theCourse.estimatedTime,
            materialsNeeded:firstLine.join('                                                                                                  '),
            userId: auth.id,
            user: auth,
            hashPass: hashPass,
        })
    } else {
        this.props.history.push(`/course/notOwned`);
    }
    }

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
                                <div style={{display: 'inline-flex', 'margin-top': '80px'}}>
                                <div style={styles.div1}>
                                <label for="title" style={styles.title2} >Course Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.change}
                                    placeholder='Course Title...' 
                                    style={styles.title}/>
                                <span style={styles.name}>By: {user.name}</span>
                                <label for="description" style={styles.description2} >Course Description</label>
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
                                <label for="estimatedTime" style={styles.estimatedTime2} >Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="estimatedTime"
                                    value={estimatedTime}
                                    onChange={this.change}
                                    placeholder='Estimated Time...'
                                    style={styles.estimatedTime} />
                                <label for="materialsNeeded" style={styles.materialsNeeded2} >Materials Needed</label>
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

    cancel = () => {
        const { context } = this.props;
        const {
            id,
        } = this.state;

        // Create user
        const course = {
            id,
        };
        this.props.history.push(`/course/detail/${id}`);
    }
}

const styles = {
    div1: {
        width: '55%',
        height: '600px'
    },
    div2: {
        width: '30%',
        'margin-left': '150px',
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
            'margin-top': '-90px',
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