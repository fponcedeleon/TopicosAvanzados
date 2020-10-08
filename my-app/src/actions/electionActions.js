//  import Axios from "axios";
import {GET_ALL_PROPOUSES} from "../constants/apiRoutes";
import { getAllElections } from "../services/election";
import {ELECTION_LIST_REQUEST, ELECTION_LIST_SUCCESS, ELECTION_LIST_ERROR} from "../constants/electionConstant";

 const listElections = () => async (dispatch) =>{
    try
    {
        console.log(getAllElections());
    }
    catch(error )
    {
        // dispatch({type: ELECTION_LIST_ERROR, payload: error.message})
    }
 }

 export {listElections};