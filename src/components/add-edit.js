import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { history } from "../history/history";
import axios from "axios";
import {
    updateTasksAction,
    completeTasksAction
} from "../actions/task-actions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class AddEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {
                title: "",
                description: "",
                completed: false,
                id: 0
            }
        }
    }
    componentDidMount() {
        this.getTasks().then(res => {
            this.setState({ task: res[0] })
        })
    }

    getTasks() {

        let id = this.props.match.params.id;
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        return axios({
            method: 'get',
            url: Task_Url,
        }).then(function (response) {
            if (response.status === 200) {
                return response.data.filter(function (item) {
                    return (parseInt(item.id) === parseInt(id))
                });
            }
            console.log(response);
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { task } = this.state;

        this.setState({
            task: {
                ...task,
                [name]: value
            }
        });
    };

    saveForm = (event) => {
        debugger
        // const { task } = this.state;
        //task.id = parseInt(this.props.match.params.id, 10);
        // this.props.updateTasksAction(task);
        // debugger
         const { task } = this.state
         let model = { title: task.title, description: task.description, completed: task.completed, id: parseInt(this.props.match.params.id, 10) };
         let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
         let Req_Url = `${Task_Url}/${parseInt(this.props.match.params.id, 10)}`

        axios({
            method: 'PATCH',
            url: Req_Url,
            data: model
        }).then(function (response) {
            debugger
            console.log(response);
            history.push("/list");
        });
       
    };

    updateTask() {
        const { task } = this.state
        let model = { title: task.title, description: task.description, completed: task.completed, id: parseInt(this.props.match.params.id, 10) };
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        let Req_Url = `${Task_Url}/${parseInt(this.props.match.params.id, 10)}`
        return axios({
            method: 'Patch',
            url: Req_Url,
            data: model
        }).then(function (response) {
            if (response.status == 200) {
                return response.data;
            }
        })
    }
    completetask(id) {
        //this.props.completeTasksAction(id);
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        let Req_Url = `${Task_Url}/${id}`
        axios({
            method: 'Put',
            url: Req_Url,
        }).then(function (response) {
            debugger
            if (response.status == 200) {
                history.push("/list");
            }
        });

    }
    deleteTask(id) {
        debugger
        // let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        // let Req_Url = `${Task_Url}/${id}`
        // axios({
        //     method: 'delete',
        //     url: Req_Url,
        // }).then(function (response) {
        //     debugger
        //     if (response.status == 200) {
        //         history.push("/list");
        //     }
        // });
    }
    render() {
        const { task } = this.state;
        return (
            <div>
                <TextField label="Title*" placeholder="Title*" name="title" value={task.title} onChange={this.handleChange} />
                <Button color="default" variant="contained" onClick={() => { this.completetask(this.props.match.params.id) }}>Complete</Button>
                <br />
                <TextField label="Description" placeholder="Description" name="description" value={task.description} onChange={this.handleChange} />
                <br />
                <Button color="default" variant="contained" onClick={this.saveForm}>Save</Button>&nbsp;
                <Button color="primary" variant="contained" onClick={() => { this.deleteTask(this.props.match.params.id) }}>Delete</Button> &nbsp;
                <Button color="default" variant="contained" onClick={() => { history.push("/list") }}>Cancel</Button>
            </div >
        );
    };
}

const margin = {
    marginLeft: "50px",
    marginTop: "10px"
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateTasksAction: updateTasksAction,
            completeTasksAction: completeTasksAction,
        },
        dispatch);

function mapStateToProps(state) {
    const { task } = state;
    return { task: task };
}

const addEditConnect = connect(mapStateToProps, mapDispatchToProps)(AddEdit);
export { addEditConnect as AddEdit };