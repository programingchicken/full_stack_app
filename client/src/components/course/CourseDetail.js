import React, { Component } from 'react';

//got this from stack over flow Couldnt get text
import ReactMarkdown from "react-markdown";
import FormDetail from '../FormDetail';


class CourseDetail extends Component {
//org state
    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        courseUserId: '',
        user: '',
        hashPass: '',
        errors: [],
        name: '',
    }

    //mounts after
   async componentDidMount() {

    //vars
        const { context } = this.props;
        const auth = context.authenticatedUser
        const hashPass = context.hashPass 
        const id = window.location.pathname.split('/')
        console.log(id.length)
        console.log(id[2])
        let theCourse = await context.data.getCourse(id[2]);
        console.log(theCourse)
    


        if (theCourse ) {


            //fix error for if you are not auth but need data
                if (auth) {
                    this.setState({
                        id: id[2],
                        title: theCourse.title,
                        description: theCourse.description,
                        estimatedTime: theCourse.estimatedTime,
                        materialsNeeded: theCourse.materialsNeeded,
                        userId: auth.id,
                        courseUserId: theCourse.userId,
                        user: auth,
                        hashPass: hashPass,
                        name: theCourse.name,
                    })
                } else { 
                    this.setState({
                        id: id[2],
                        title: theCourse.title,
                        description: theCourse.description,
                        estimatedTime: theCourse.estimatedTime,
                        materialsNeeded: theCourse.materialsNeeded,
                        name: theCourse.name,
                    })
                }

    } else {
            this.props.history.push(`/course/oopsNotFound`);
        
    }

    }



    //page
    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            courseUserId,
            errors,
            name
        } = this.state;

console.log(name)
 
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <span style={styles.buttonBar}></span>
                    <h1 style={styles.sup}>Course Details</h1>
                    <FormDetail
                        style={styles.forms}
                        errors={errors}
                        user={userId}
                        courseUserId={courseUserId}
                        update={this.update}
                        submit={this.submit}
                        cancel={this.cancel}
                        submitButtonText='Delete Course'
                        elements={() => (
                            <React.Fragment>
                                <label htmlFor="title" style={styles.title2} >Course</label>
                                <span
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    placeholder={title} 
                                    style={styles.title}>{title}
                                    </span>
                                    <span style={styles.name}>By: {name}</span>
                                    <ReactMarkdown 
                                    id="description"
                                    name="dscription" 
                                    className='description'>
                                    {description}
                                    </ReactMarkdown>
                                <label htmlFor="estimatedTime" style={styles.estimatedTime2} >Estimated Time</label>
                                <span
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="estimatedTime"
                                    value={estimatedTime}
                                    placeholder={estimatedTime} 
                                    style={styles.estimatedTime}>
                                        {estimatedTime}
                                 </span>
                                 <label htmlFor="materialsNeeded" style={styles.materialsNeeded2} >Materials Needed</label>
                                 <ReactMarkdown className='materialsNeeded'>{materialsNeeded}</ReactMarkdown>
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

        //delete
        context.data.deleteCourse(id, course, user.emailAddress, hashPass)
            .then(errors => {

               //change page
                if (errors.length !== 0) {
                    this.props.history.push(`/course/notOwned`);
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

    //update page
    update = () => {
        const {
            id,
        } = this.state;

        this.props.history.push(`/course/${id}/update`)
    }


      //cancel to route
    cancel = () => {
        this.props.history.push('/courses');
    }
}


//styles

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
        fontSize: '35px',
        width: '55%',
        color: '#7c689b',
    },
    title2: {
        position: 'absolute',
        left: '55px',
        top: '240px',
        width: '45%',
        color: 'darkgray',
        borderBottom: '1px solid darkgray',
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
        borderBottom: '1px solid darkgray',
    },
    sup: {
        height: '70px',
        position: 'absolute',
        left: '50px',
        top: '270px',
        marginTop: '-90px',
    },
    description2: {
        position: 'absolute',
        left: '55px',
        top: '380px',
        width: '55%',
    },

    materialsNeeded2: {
        position: 'absolute',
        right: '55px',
        top: '350px',
        width: '30%',
        color: 'darkgray',
        borderBottom: '1px solid darkgray',
    },
    name: {
        position: 'absolute',
        top: '350px',
        left: '55px',
    }

}

export default CourseDetail