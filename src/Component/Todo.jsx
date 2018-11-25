import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import {Input, FormControl, InputLabel} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import '../App.css';


class Todo extends Component {
    constructor(){
        super();
        this.state={
            message: '',
            Todo:[],
            buttonText:'submit',
            index:0,
        };
    }
    getValue = option =>{
        const {name, value} = option.target;
        this.setState({
            [name]: value,
        });
    }
    
    onSubmit = () => {
        if (this.state.message === ''){
            return;
        }
        if (this.state.buttonText === "submit"){
            const newTodo = this.state.Todo.slice(0);
            newTodo.push(this.state.message);
            this.setState({
                Todo: newTodo,
                message: '',
            });
        }
        else if(this.state.buttonText === "Update"){
            const newArray = [...this.state.Todo];
            newArray[this.state.index]=this.state.message
            this.setState({
                Todo:newArray,
                message:"",
                buttonText:"submit"
            })
        }
    }
    onDismiss = (ind) =>{
        const updateRow = this.state.Todo.slice(0);
        this.setState({
            Todo: updateRow.filter((value, index) => index !== ind)
        });
    }
    onUpdate = (index) =>{
        const value= this.state.Todo[index];
        this.setState({
            message:value,
            buttonText:"Update",
            index:index
        })
        
    }

    render (){
        return (
            <div className='container'>
                <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                        To-Do Application
                        </Typography>
                    </Toolbar>
                </AppBar>
                </div><br></br>
                <div>
          <FormControl>
          <InputLabel>What you Do</InputLabel>
          <Input type="text" name="message" id="task" value={this.state.message} placeholder="What u thing to do" onChange={this.getValue} />
          </FormControl><br/><br/>
          <Button variant="contained" color="primary" onClick={this.onSubmit}>{this.state.buttonText}</Button>
          </div>        
                    <div className='inner-container'>
                        <Paper>
                        {this.state.Todo.length > 0 ?
                            <Table>
                                {this.state.Todo.map(
                                    (value, index) => {
                                        return(
                                            <tbody key={index}>
                                                <TableRow>
                                                    <TableCell className='cell-width'>{value}</TableCell>
                                                    <TableCell className='cell-width'><Button variant="contained" color="primary" onClick={() => this.onUpdate(index)}>Edit</Button></TableCell>
                                                    <TableCell className='cell-width'><Button variant="contained" color="primary" onClick={() => this.onDismiss(index)}>Delete</Button></TableCell>
                                                    </TableRow>
                                            </tbody>
                                        )
                                    }
                                )}
                                </Table>
                            :
                            ''}
                            </Paper>
                            </div>
                        
            </div>
        );
    }
}
export default Todo;