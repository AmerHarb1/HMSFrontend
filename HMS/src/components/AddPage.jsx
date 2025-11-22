import {React} from 'react';
import  {AddForm } from './AddForm';

export function AddPage(props) {
  return (
    <div >
    	<AddForm name= {props.name} lnk={props.lnk} obj={props.obj}/>      
    </div>
  );
}