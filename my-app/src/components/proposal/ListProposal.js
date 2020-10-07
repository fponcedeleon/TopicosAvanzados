import React, { Component } from 'react';
import {render} from 'react-dom';
import '../../index.css';
import data from '../../data.js'; 

export class ListProposal extends Component
{    
render()
    {  
        const propouse =  this.props.propouse.propouseParam
        const options =  data.opciones.filter(x => x.idPropouse == propouse.id)
        const funcionRetorno = this.props.funcionGetValue

        return <div className="custom-row" >
        <div>{propouse.name}</div>
        <div className="custom-row" >
            <select class="form-control" data-attrId={propouse.id} onChange={funcionRetorno.bind(this)}>  
                {options.map(option => 
                    <option>{option.valor}</option> 
                    )}
            </select> 
        </div> 
    </div> 
    }
}