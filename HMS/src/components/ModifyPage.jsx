import  {ModifyForm } from './ModifyForm';

export function ModifyPage(props) {
  return (
    <div >
        <ModifyForm name= {props.name} lnk={props.lnk} obj={props.obj}/>      
    </div>
  );
}