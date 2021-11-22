import React, { Component } from 'react';
import Form from '../Form';


class CreateCourse extends Component {
    state = {
        courseTitle: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        errors: [],
    }

    componentDidMount() {
        const { context } = this.props;
        const auth = context.authenticatedUser
           this.setState({
            userId: auth.id
        })
    }

    render() {
        const {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
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
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={courseTitle}
                                    onChange={this.change}
                                    placeholder="Course Title" />
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={courseDescription}
                                    onChange={this.change}
                                    placeholder="Course Description">
                                </textarea>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="estimatedTime"
                                    value={estimatedTime}
                                    onChange={this.change}
                                    placeholder="Estimated Time" />
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={materialsNeeded}
                                    onChange={this.change}
                                    placeholder="Materials Needed">
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
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        } = this.state;

        // Create user
        const course = {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        };

        context.data.createCourse(course)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${course.courseTitle} is successfully authenticated!`)
                        .then(() => {
                            this.props.history.push('/authenticated');
                        });
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

export default CreateCourse