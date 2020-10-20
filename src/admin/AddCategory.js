import React ,{useState}from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from "../auth";
import {Link} from 'react-router-dom'
import {createCategory} from "./apiAdmin";


const AddCategory=()=>{
    const[name,setName]=useState('')
    const[error,setError]=useState(false)
    const[sucess,setSucess]=useState(false)

    //destructure use and token from localstorage
    const{user,token}=isAuthenticated()

    const handleChange=(e)=>{
        setError('')
        setName(e.target.value)
    }
    const clickSubmit=(e)=>{
        e.preventDefault()
        setError('')
        setSucess(false)
        //make request to api to create category
        createCategory(user._id,token,{name}).then(data =>{
            if(data.error){
                setError(true)
            }
            else{
                setError('')
                setSucess(true)
            }
        })


    }

    const newCategoryForm=()=>(
        <form onSubmit={clickSubmit} className={'container'}>

            <div className={"form-group"}>
                <label className={'text-muted'}>Name</label>
                <input
                    type={'text'}
                    className={'form-control'}
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />


            </div>
            <button
                className={'btn btn-outline-primary'}
            >
                Create Category
            </button>

        </form>
    )

    const showSucess=()=>{
        if(sucess){
            return <h3 className={'text-sucess'}>Category is created</h3>
        }
    }
    const showError=()=>{
        if(error){
            return <h3 className={'text-danger'}>Category should be unique</h3>
        }
    } 

    const goBack=()=>(
        <div>
            <Link to='/admin/dashboard' className={'text-warning'}>
                Back to Dashboard

            </Link>
        </div>
    )







    return(
        <Layout
            title={"Add a new category"}
            description={`${user.name},ready to add a new category`}

        >
            <div className={'row'}>

                <div className={'col-md-8 offset-md-2'}>
                    
                    {showSucess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>

        </Layout>
    )

}
export default AddCategory