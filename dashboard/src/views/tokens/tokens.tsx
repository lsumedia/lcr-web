import * as React from 'react';
import Axios from 'axios';

import { LoadingIndicator } from '../../components/loading/loading';
import { ResponsiveContainer } from '../../components/responsiveContainer';
import { Button, Table} from 'reactstrap';


export class TokensView extends React.Component<any, any> {
 
    secrets = {};

    private async updateTokensList(){
        const response = await Axios.get('/api/private/token');
        this.setState({tokens: response.data});
    }

    private async getSecretForToken(id: string){
        const response = await Axios.get(`/api/private/token/${id}`)
        this.secrets[id] = response.data.secret;
        this.setState({});
    }

    private async generateNewToken(){
        await Axios.post(`/api/private/token/`);
        this.updateTokensList();
    }

    private async deleteToken(id: string){
        await Axios.delete(`/api/private/token/${id}`);
        this.updateTokensList();
    }

    componentWillMount(){
        this.updateTokensList();
    }

    componentWillUnmount(){
    }

    constructor(props: any){
        super(props);

        this.state = {
            tracks : [],
            tokens : []
        };
    }

    render() {

        try{

            const tokenList: any =  this.state.tokens.map((prop: any, key: any) => {
                                    
                var creation = new Date(prop.createdAt);
                var date = creation.toDateString() + " " + creation.toLocaleTimeString();
                
                var updated = new Date(prop.updatedAt);
                var updateDate = updated.toDateString() + " " + updated.toLocaleTimeString();

                var id = prop._id;

                var secret = (this.secrets[id])? 
                    (<input type="text" className="form-control" readOnly={true}  value={this.secrets[id]} /> )
                    : (
                    <input type="text" onClick={() => {this.getSecretForToken(id)}} style={{cursor: "pointer"}} className="form-control" value="Click to reveal secret" />);

                return (
                    <tr key={key}>
                        <td>{prop._id}</td>
                        <td>{date}</td>
                        <td>{updateDate}</td>
                        <td style={{textAlign : "right"}}>{secret}</td>
                        <td style={{cursor: "pointer", textAlign : "right"}}><Button color="danger" onClick={() => { this.deleteToken(id)}} >Delete</Button></td>
                    </tr>
                )
            });

            return (
                <div className="tokens">
                    <ResponsiveContainer title="Authentication Tokens" noPadding={true}>
                        <div>
                            <Button className="btn btn-flat" style={{float: "right", marginRight: 15, marginBottom: 15}} color="success" onClick={() => {this.generateNewToken()}}>Generate New Token</Button>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Created At</th>
                                        <th>Last used</th>
                                        <th>Secret</th>
                                        <th style={{textAlign : "right"}}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tokenList }
                                </tbody>
                            </Table>
                        </div>
                    </ResponsiveContainer>
                </div>
            );

        }catch(err){
                
            return <LoadingIndicator message={err.message}/>
        }
    }
}