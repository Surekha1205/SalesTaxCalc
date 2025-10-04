import React, { useState } from "react";
import { api_endpoint } from "./apiConfig";
import axios from "axios";
import './EmailTextParser.css'

const EmailTextParser = () => {
    const[form, setForm] = useState({
        "TaxRate": '',
        "EmailOrTextInput": ''
    });
    const[error,setError] = useState('');
    const[output, setOutput] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async () =>{
        setOutput(null);
        setError('');
        if(form.TaxRate < 0 || !form.TaxRate){
            setError('Valid Tax Rate is required');
            return;
        }

        if(!form.EmailOrTextInput){
            setError('Input is required');
            return;
        }
        try{
            const callApi = await axios.post(`${api_endpoint}?taxRate=${form.TaxRate}&emailOrTextInput=${form.EmailOrTextInput}`);
          /*  const callApi = await axios.post(api_endpoint, {
        taxRate: form.TaxRate,
        emailOrTextInput: form.EmailOrTextInput
      });*/
                
        console.log(callApi);
        setOutput(callApi.data);
        }
        catch(err){
            console.log("Error object:", err);
            console.log("Error response:", err.response);
            setError(err.response?.data?.error || err.response?.data?.message || err.message || 'Failed');
        }
    }

    const handleClear = () =>{
        setForm({'TaxRate': '', 'EmailOrTextInput': ''});
        setError('');
        setOutput(null);
    }


    return(
        <div id="mainDiv">  
        <h3>Sales Tax Calculator</h3>          
            <div className="form-group">
                <label htmlFor="TaxRate">Tax Rate %</label>
                <input type="number" name="TaxRate" value={form.TaxRate} onChange={handleChange} placeholder="Enter the Sales Tax in Percentage"></input>
            </div>
            <div className="form-group">
                <label htmlFor="EmailOrTextInput">Email/Text Input</label>
                <input type="text" name="EmailOrTextInput" value={form.EmailOrTextInput} onChange={handleChange}  style= {{resize:'vertical'}} placeholder="Paste email or text block"></input>
            </div>
            {error && (
            <div className="error">
                {error}
            </div>
            )}
            <div className="button-group">
                <button type="submit" onClick={handleSubmit}>Submit</button>      
                <button type="submit" onClick={handleClear}>Clear</button>  
            </div> 

            {output && (
                <div className="output">
                    <strong>Output: {JSON.stringify(output,null,2)}</strong>
                </div>
            )}               
        </div>
    )
}

export default EmailTextParser;