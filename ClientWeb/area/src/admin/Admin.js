import React, {Component} from 'react';
import Navbar from '../utility/Navbar'
import {DataTable, TableHeader, Textfield, Button, FABButton, Icon,
    Dialog, DialogTitle, DialogContent, DialogActions} from 'react-mdl';
import "../App.css"
import Axios from "axios";
import {connect} from "react-redux";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [{id: 0, email: 'yann.probst@epitech.eu', status: 'false'},
                {id: 1, email: 'pierre.probst@epitech.eu', status: 'false'},
                {id: 2, email: 'loic.probst@epitech.eu', status: 'false'}],
            data: [],
            dataLength: 0,
            i: 0,
            email: '',
            status: '',
            password: '',
            id: '',
            url: 'http://localhost:3000/api/users',
            openDial: false,
            openDialog: false,
            update: false,
            token: this.props.myToken
        };

        this.selection = this.selection.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateMail = this.updateMail.bind(this);
        this.validation = this.validation.bind(this);
        this.add = this.add.bind(this);
        this.data = this.data.bind(this);
        this.adding = this.adding.bind(this);
        this.changeDial = this.changeDial.bind(this)
        this.closeDial = this.closeDial.bind(this)
        this.closeDialog = this.closeDialog.bind(this);
        this.updateBDD = this.updateBDD.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.changeUserBDD = this.changeUserBDD.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
    }

    changeInfo() {
        const query = this.state.url + "/" + this.state.i;
        console.log("query = " + query)
        Axios({
            baseURL: query,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.props.myToken}`,
                "Content-Type": 'application/json'
            },
            data: {
                "createdAt": "2019-01-22T22:43:28.4948015+01:00",
                "updatedAt": "2019-01-22T22:43:28.4948015+01:00",
                "email": this.state.email,
                "password": this.state.password,
                "services": []
            }
        })
            .then((response) => {
                alert("OK")
                console.log("OK")
                console.log(response.data)
                this.setState( {
                    update: this.state.update = true
                });
            })
            .catch((error) => {
                alert("NO")
            });
    }

    ///bouton pour delete un user
    deleteUser() {
        const query = this.state.url + "/" + this.state.i;
        console.log("query = " + query)
        Axios({
            baseURL: query,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.props.myToken}`
            }
        })
            .then((response) => {
                alert("OK")
                console.log("OK")
                console.log(response.data)
                this.setState( {
                    update: this.state.update = true
                });
            })
            .catch((error) => {

            });
    }



    changeUserBDD() {
        console.log("JE FAIS AXIOOOOOOOOOOOOOOOOOS")
        const query = this.state.url + "/" + this.state.i
        console.log("query = " + query)
        Axios({
            baseURL: query,
            method: "put",
            headers: {
                Authorization: `Bearer ${this.props.myToken}`
            },
            data: {
                "createdAt": "2019-01-22T22:43:28.4948015+01:00",
                "updatedAt": "2019-01-22T22:43:28.4948015+01:00",
                "email": "daby@epitech.eu",
                "password": "azert"
            }
        })
            .then((response) => {
                console.log(response.data);
                console.log("ici")
                this.setState( {
                    update: this.state.update = true
                });
            })
            .catch((error) => {
                //TODO notifications error with response code
                alert("EROR");
                if (error.response) {

                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("LA")
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
                //console.log(error.config);
                console.log("FIN DES ERRORS")
            });
    }

    updateBDD() {
        if (this.state.update === true) {
            Axios({
                method: 'post',
                url: 'http://localhost:3000/api/users',
                timeout: 8000, // Let's say you want to wait at least 8 seconds
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json'
                },
                data: {
                    "email": this.state.email,
                    "password": this.state.password,
                    "services": []
                }
            })
                .then(function (response) {
                    console.log(response.status);
                    console.log("Success, please confirm your mail and log in");
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    alert("Error");
                });
        }
    }

    closeDialog() {
        this.setState({
            openDialog: false
        });
    }

    closeDial(e) {
        this.setState( {
            openDial: false
        });
    }

    changeDial(e) {
        this.setState( {
            openDial: true
        });
    }

    adding(e) {
        console.log("CHIPS")
        this.setState( {
            openDialog: true
        });
    }

    data(e) {
        const query = this.state.url
        Axios({
            baseURL: query,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.props.myToken}`
            }
        })
            .then((response) => {
                if (response.data.length !== this.state.dataLength || this.state.update === true)
                {
                    this.setState( {
                        data: response.data,
                        dataLength: response.data.length,
                        update: this.state.update = false
                    });
                }
            })
            .catch((error) => {
                alert("ERROR");
            });
    }

    selection(e) {
        this.setState({
            i: this.state.i = e[e.length - 1]
        });
        if (!this.state.i) {
            this.setState({
                i: this.state.i = 0
            });
        }
        if (e.length != 0) {
            this.changeDial()
        }
    }

    updatePassword(e) {
        e.preventDefault();
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            password: this.state.password = value
        });
    }

    updateStatus(e) {
        e.preventDefault();
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            status: this.state.password = value
        });
    }

    updateMail(e) {
        e.preventDefault();
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            email: this.state.email = value
        });
    }

    add(e) {
        e.preventDefault();
        var create = 0;

        if (!this.state.name && !this.state.email && !this.state.status) {
            alert("Champ vide");
        } else {
            for (var i = 0; i < this.state.data.length; i++) {
                if (this.state.email.localeCompare(this.state.data[i].email) === 0) {
                    create = 1;
                }
            }
            if (create === 0) {
                this.setState({
                    update: this.state.update = true
                });
                this.closeDialog();
            } else {
                alert("Adresse mail déjà utilisée");
            }
        }
    }

    validation(e) {
        console.log("JE DOIS VALIDER")
        e.preventDefault();
        let error = 1;

        if (this.state.status.toString() === "true" || this.state.status.toString() === "false") {
            error = 0;
        } else {
            alert("Status must be true or false")
        }
        if (error === 0) {
            if (this.state.email) {
                this.changeUserBDD();
                //delete a user and create a new one ?
                // this.setState({
                //     email: this.state.data[this.state.i].email = this.state.email
                // });
            } else {
                console.log("step")
            }
            this.setState({
                email: this.state.email = "",
                status: this.state.status = "",
            });
            this.closeDial();
        }
    }

    render() {
        this.data();
        return (
            <div>
                <Navbar arg={this.props}/>
                <div className="admin">
                    <DataTable
                        rows={this.state.data}
                        selectable
                        shadow={0}
                        rowKeyColumn="id"
                        onSelectionChanged={this.selection}
                    >
                        <TableHeader numeric name="email" tooltip="Number of materials">Email</TableHeader>
                        <TableHeader numeric name="verified" cellFormatter={(id) => `\ ${id.toString()}`} tooltip="Number of materials">Status</TableHeader>
                    </DataTable>
                </div>
                <div className="button">
                    <Button onClick={this.adding} raised ripple>Add new user</Button>
                </div>

                <Dialog open={this.state.openDial}>
                    <DialogTitle>change user</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Textfield
                            onChange={this.updateMail}
                            label="username"
                            style={{width: '200px'}}
                        />
                        <Textfield
                            onChange={this.updatePassword}
                            label="password"
                            style={{width: '200px'}}
                        />
                        <Button type='button' onClick={this.deleteUser} >Delete User</Button>
                        <Button type='button' onClick={this.changeInfo} >Change Info</Button>
                        <Button type='button' onClick={this.closeDial} >Cancel</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.openDialog}>
                    <DialogTitle>new user</DialogTitle>
                    <DialogContent>
                        <Textfield
                            onChange={this.updateMail}
                            label="username"
                            style={{width: '200px'}}
                        />
                        <Textfield
                            onChange={this.updatePassword}
                            label="password"
                            style={{width: '200px'}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.add} >Ok</Button>
                        <Button type='button' onClick={this.closeDialog} >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.isAdmin,
        myToken: state.myToken
    }
}
export default connect(mapStateToProps)(Admin)
