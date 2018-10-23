import React from "react";
import Link from "react-router-dom/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField"
import axios from "axios";
import { history } from "../history/history"
import { Button, Radio, RadioGroup, FormLabel } from "@material-ui/core";
import {
    getTasksAction,
    deleteTasksAction,
    completeTasksAction,
    createTasksAction
} from "../actions/task-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class List extends React.Component {

    constructor(props) {
        super();
        this.state = {
            tasks: [],
            task: {
                title: "",
            }

        }
    }

    handleChange = (event) => {
        debugger
        const { name, value } = event.target;
        const { task } = this.state;
        this.setState({
            task: {
                ...task,
                [name]: value,
            }
        })
    }

    componentDidMount() {
        this.props.getTasksAction();
        // this.getTasks().then(res => {
        //     debugger
        //     this.setState({ tasks: res })
        // })
    }

    getTasks() {
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        return axios({
            method: 'get',
            url: Task_Url,
        }).then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
            console.log(response);
        });
    }

    saveForm = (event) => {
        const { task } = this.state;
        this.props.createTasksAction(task.title);
        // this.saveData().then(res => {
        //     this.setState({ tasks: res })
        // })
    }

    saveData() {

        const { task } = this.state
        let model = { title: task.title };
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";

        return axios({
            method: 'post',
            url: Task_Url,
            data: model
        }).then(function (response) {
            debugger
            if (response.status == 200) {
                return response.data;
            }
        });
    }

    deleteTask = (id) => {
        this.props.deleteTasksAction(id);

        // this.delete(id).then(res => {
        //     this.setState({ tasks: res })
        // })
    }

    delete(id) {
        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        let Req_Url = `${Task_Url}/${id}`
        return axios({
            method: 'delete',
            url: Req_Url,
        }).then(function (response) {
            debugger
            if (response.status == 200) {
                return response.data;
            }
        });
    }
    completeTask = (id) => {

        // this.props.completeTasksAction(id);

        let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
        let Req_Url = `${Task_Url}/${id}`
        axios({
            method: 'Put',
            url: Req_Url,
        }).then(function (response) {
            debugger
            if (response.status == 200) {
                window.location.reload();
            }
        });
    }


    render() {
        const { task } = this.state;
        const { tasks } = this.props;
        return (
            <div>
                {task &&
                    <div style={margin}>
                        <TextField label="Title*" placeholder="Title*" name="title" value={task.title} onChange={this.handleChange}></TextField>&nbsp;
                    <Button color="primary" variant="contained" onClick={this.saveForm}>Save</Button>
                        <br />
                    </div>}
                <Table style={tableStyles}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title </TableCell>
                            <TableCell >Description </TableCell>
                            <TableCell>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tasks && tasks.map((row, i) =>
                                <TableRow key={i}>
                                    <TableCell
                                        className={row.completed == true ? "strike" : "input-width"}>
                                        <a onClick={() => { history.push("/addedit/" + row.id) }}>{row.title}</a>
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="contained" onClick={() => { this.completeTask(row.id) }} >Completed</Button>&nbsp;
                                        <Button color="primary" variant="contained" onClick={() => { this.deleteTask(row.id) }} >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        );
    };
}

const tableStyles = {
    width: "80%",
    marginLeft: "50px",
    marginRight: "50px",
    border: "1px solid"
}
const margin = {
    marginLeft: "50px",
    marginTop: "10px"
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getTasksAction: getTasksAction,
        deleteTasksAction: deleteTasksAction,
        completeTasksAction: completeTasksAction,
        createTasksAction: createTasksAction,
    }, dispatch);

function mapStateToProps(state) {
    debugger
    const { tasks, task } = state;
    return {
        tasks: tasks,
        task: task
    };
}

const connectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
export { connectedTodoList as List };