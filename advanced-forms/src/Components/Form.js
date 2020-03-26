import React, {useState,useEffect} from "react"; 
import * as yup from "yup"; 
import axios from "axios"; 

// creating our schema 
// what additional inputs:   BenchPress limit, Pullups, Squat

const formSchema = yup.object().shape({
    name: yup.string().required("Please Fill Out Name."), 
    email: yup.string().email("Must be a valid Email Address.").required("Email Is A Required Field."), 
    password: yup.string().min(7, "Passwords must be at least 7 characters long.").required("Password Is Required"),
    benchpress: yup.string().required("Stop Being A Weakling, Tell me how much you press"),
    pullups: yup.string().required("You Better Tell Me How Much You Pull Up Bro!"), 
    squat: yup.string().required("BOY DONT TELL ME YOU SKIP LEG DAYYY"),
    terms: yup.boolean().oneOf([true], "Please Agree to Terms of Service."), 
})


export default function AdvancedForm() {
    // set states for information 

    const [formState,setFormState] = useState({
        name: "", 
        email: "", 
        password: "", 
        terms: "", 
        benchpress: "", 
        pullups: "", 
        squat: "", 
    })

    // set state for errors 
     
    const [errors, setErrors] = useState({
        name: "", 
        email: "", 
        password: "", 
        terms: "", 
        benchpress: "", 
        pullups: "", 
        squat: "", 
    })

    // set state for disabled button 

    const [disabledButton, setDisabledButton] = useState([true])

    // new state to set our post request to so that we can console.log and see it 

    const [user, setUser] = useState([]); 

    // changing the state of the button 

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setDisabledButton(!valid); 
        })
    }, [formState]); 

    // create the validate change function to reuse in input change

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({
                ...errors, 
                [event.target.name]: ""
            }); 
        })
        .catch(err => {
            setErrors({
                ...errors,
                [event.target.name]: err.errors[0]
            }); 
        }); 
    }// validateChange ends here 





    // functions down below 
    const formSubmit = event => {
        event.preventDefault(); 
        // axios post below 

        axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
            setUser(res.data)
            console.log("success", user); 

            setFormState({
                name: "", 
                email: "", 
                password: "", 
                terms: "", 
                benchpress: "", 
                pullups: "", 
                squat: "", 
            }); 
        })
        .catch(err => {
            console.log(err.res); 
        }); 


    }; // end of formSubmit

    const inputChange = event => {
        event.persist(); 

        const newData = {
            ...formState, 
            [event.target.name]:event.target.type === "checkbox" ? event.target.checked : event.target.value
        }; 

        validateChange(event); 

        setFormState(newData); 
    }

 


    return (
        <div>
            <h2>Form Sign Up</h2>

            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name: 
                    <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={inputChange}
                    value={formState.name}
                    />
                </label><br/>

                <label htmlFor="email">
                    Email: 
                    <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={inputChange}
                    value={formState.email}
                    />
                </label><br/>
            
                <label htmlFor="password" >
                    Password:
                    <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={inputChange}
                    value={formState.password}
                    />
                </label><br/>

                <label htmlFor="benchpress">
                    How Much Do You Press Homie?
                    <input
                    type="text"
                    id="benchpress"
                    name="benchpress"
                    onChange={inputChange}
                    value={formState.benchpress}/>
                    lbs
                </label> <br/>

                <label htmlFor="pullups">
                    Pull up On me, How much??
                    <input
                    type="text"
                    id="pullups"
                    name="pullups"
                    onChange={inputChange}
                    value={formState.pullups}/>
                </label> <br/>

                <label htmlFor="squat">
                    How Much You Squat??
                    <input
                    type="text"
                    id="squat"
                    name="squat"
                    onChange={inputChange}
                    value={formState.squat}/>
                    lbs
                </label> <br/>

                <label htmlFor="checkbox">
                    <input
                    id="checkbox"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                    /> 
                    Terms of Service
                </label><br/>

                <pre>{JSON.stringify(user,null,2)}</pre>
                <button disabled={disabledButton}>Submit</button>
            </form>
        </div>


    )
}