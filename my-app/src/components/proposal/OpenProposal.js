import React, { Component } from 'react';
import {render} from 'react-dom';
import '../../index.css';


export class OpenProposal extends Component
{    
    render()
    {  
        const propouse =  this.props.propouse.propouseParam
        const funcionRetorno = this.props.funcionGetValue
        const id = propouse.id

        return <div className="custom-row" >
        <div>{propouse.name}</div>
        <div className="custom-row" >
            <textarea className="form-control" placeholder="Inserte su respuesta aqui." data-attrId={id} onChange={funcionRetorno.bind(this)}>

            </textarea>
        </div>
    </div> 
    }
}