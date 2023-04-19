import { Select, Switch } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { fieldType } from "./utils/data";
import { useState,useEffect, useRef } from "react";
export function Field({
  onAdd,
  onDelete,
  onChangeRequired,
  name,
  type,
  required,
  enableTypeChange,
  children
}: Props) {

  const [propertyName, setPropertyName] = useState<string>(name);
  const oldPropName=useRef("");

  useEffect(()=>{
    setPropertyName(name);
  },[name])
  
  return (
    <>
      <div className="field field-custom-css">
        <div className="field-left">
          <input type="text" value={propertyName} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setPropertyName(e.target.value)
          }} className="field-left-name" onFocus={(e)=>{
            
            oldPropName.current=propertyName;
          }} onBlur={(e)=>{
            if(oldPropName.current!==propertyName){
            onChangeRequired(oldPropName.current,3,undefined,propertyName);
            }
          }} />
          <Select
            value={type}
            onChange={(e)=>{
              onChangeRequired(name,2,undefined,e as string)}
            }
            data={fieldType}
            disabled={enableTypeChange}
            size="xs"
            rightSection={<IconChevronDown size="1rem" />}
          />
          
        </div>
        <div className="field-right">
          <div className="field-right-require">
            <span className="field-right-require-title">Required</span>
            <Switch
              checked={required}
              onChange={(e) => {onChangeRequired(name,1,e.currentTarget.checked,"")}}
              className="field-right-require-switch"
            />
          </div>
          <div className="field-right-buttons">
            {type==="object" &&<button onClick={() => onAdd(name)}>+</button>}
            <button onClick={() => onDelete(name)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={16} height={16} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg>
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

type Props = {
  onDelete: (id: string) => void;
  onAdd: (id: string) => void;
  onChangeRequired: (id: string,arg:number, req: boolean|undefined,type:string) => void;
  name: string;
  type: string;
  enableTypeChange:boolean,
  required: boolean | undefined;
  children?: React.ReactNode;
};
