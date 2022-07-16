import React, { Component } from 'react';
import FormDetail from '../FormDetail';


class CourseDetail extends Component {

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




        if (theCourse) {
            let firstLine = theCourse.materialsNeeded.split(/\n/)
            console.log(firstLine)
            for (let i = 0 ; i < firstLine.length; i++) {
                console.log(firstLine[i])
                if (firstLine[i].charAt(0) !== '* ') {
                    if(firstLine[i] !== '') {
                        firstLine[i] = `*${firstLine[i]}`;
                    }
                }
    
    
                console.log(firstLine[i])
            }
           this.setState({
            id: id[3],
            title: theCourse.title,
            description: theCourse.description,
            estimatedTime: theCourse.estimatedTime,
            materialsNeeded: firstLine.join('                                                                                                  '),
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
                    <span style={styles.buttonBar}></span>
                    <h1 style={styles.sup}>Course Details</h1>
                    <FormDetail
                        style={styles.forms}
                        errors={errors}
                        update={this.update}
                        submit={this.submit}
                        cancel={this.cancel}
                        submitButtonText='Delete Course'
                        elements={() => (
                            <React.Fragment>
                                <label for="title" style={styles.title2} >Course</label>
                                <span
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    placeholder={title} 
                                    style={styles.title}>{title}
                                    </span>
                                    <span style={styles.name}>By: {user.name}</span>
                                <span
                                    id="description"
                                    name="dscription"
                                    value={description}
                                    placeholder={description}
                                    style={styles.description} >
                                        {description}
                                </span>
                                <label for="estimatedTime" style={styles.estimatedTime2} >Estimated Time</label>
                                <span
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="estimatedTime"
                                    value={estimatedTime}
                                    placeholder={estimatedTime} 
                                    style={styles.estimatedTime}>
                                        {estimatedTime}
                                 </span>
                                 <label for="materialsNeeded" style={styles.materialsNeeded2} >Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={materialsNeeded}
                                    placeholder={materialsNeeded}
                                    style={styles.materialsNeeded} >
                                </textarea>
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

        context.data.deleteCourse(id, course, user.username, hashPass)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${course.title} is successfully Deleted!`)

                            this.props.history.push('/courses');
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });

    }

    update = () => {
        const { context } = this.props;
        const {
            id,
        } = this.state;

        // Create user
        const course = {
            id,
        };
        this.props.history.push(`/course/update/${course.id}`)
    }

    cancel = () => {
        this.props.history.push('/courses');
    }
}


const styles = {
    buttonBar: {
        width: '100%',
        height: '80px',
        position: 'absolute',
        top: '67px',
        background: '#7c689b',
        opacity: '25%',
        left: '0px',
    },
    forms: {
        position: 'absolute'
    },
    title: {
        position: 'absolute',
        left: '55px',
        top: '280px',
        'font-size': '35px',
        width: '55%',
        color: '#7c689b',
    },
    title2: {
        position: 'absolute',
        left: '55px',
        top: '240px',
        width: '45%',
        color: 'darkgray',
        'border-bottom': '1px solid darkgray',
    },
    estimatedTime: {
        position: 'absolute',
        right: '55px',
        top: '270px',
        width: '30%',
    },
    estimatedTime2: {
        position: 'absolute',
        right: '55px',
        top: '240px',
        width: '30%',
        color: 'darkgray',
        'border-bottom': '1px solid darkgray',
    },
    sup: {
        height: '70px',
        position: 'absolute',
        left: '50px',
        top: '270px',
        'margin-top': '-90px',
    },
    description: {
        position: 'absolute',
        left: '55px',
        top: '410px',
        width: '55%',
    },
    description2: {
        position: 'absolute',
        left: '55px',
        top: '380px',
        width: '55%',
    },

    materialsNeeded: {
        position: 'absolute',
        right: '65px',
        top: '400px',
        width: '30%',
        border: 'none',
    },
    materialsNeeded2: {
        position: 'absolute',
        right: '55px',
        top: '350px',
        width: '30%',
        color: 'darkgray',
        'border-bottom': '1px solid darkgray',
    },
    name: {
        position: 'absolute',
        top: '350px',
        left: '55px',
    }

}

export default CourseDetail