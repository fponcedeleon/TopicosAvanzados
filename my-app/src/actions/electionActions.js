 import Axios from "axios";
import GET_ALL_PROPOUSES from "../constants/apiRoutes";
import {ELECTION_LIST_REQUEST, ELECTION_LIST_SUCCESS, ELECTION_LIST_ERROR} from "../constants/electionConstant";

 const listElections = () => async (dispatch) =>{
    try
    {
        dispatch(ELECTION_LIST_REQUEST);
        const {data} = await axios.get(GET_ALL_PROPOUSES);
        dispatch({type: ELECTION_LIST_SUCCESS, payload: data})
    }
    catch(error )
    {
        dispatch({type: ELECTION_LIST_ERROR, payload: error.message})
    }
 }

 export {listElections};