import React, {useEffect, useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from "../auth";
import {Link} from 'react-router-dom'
import {getProduct,deleteProduct,updateOrderStatus,getProducts} from "./apiAdmin";

const ManageProduct=()=>{
    const [products,setProducts]=useState([])
    const {user,token}=isAuthenticated()
    const loadProducts=()=>{
        getProducts().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }
    const destroy=productId=>{
        deleteProduct(productId,user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                loadProducts()
            }
        })
    }

    useEffect(()=>{
        loadProducts()

    },[])

    return(


        <Layout title={'Home Page'} description={'Pastor Patrick App: Video,Audio,Book'} className={'container-fluid'}>
                <div className={'row'}>
                        <div className={'col-12'}>
                            <h2 className={'text-center'}>
                                Total {products.length} products
                            </h2>
                            <ul className={'list-group-item'}>
                                {
                                    products.map((p,i)=>(
                                        <li key={i} className={'list-group-item d-flex justify-content-between align-items-center'}>
                                            <strong>{p.name}</strong>
                                            <Link to={`/admin/product/update/${p._id}`}>
                                                <span className={'badge badge-warning badge-pill'}>
                                                    update
                                                </span>

                                            </Link>
                                            <span onClick={()=>destroy(p._id)}  className={'badge badge-danger badge-pill '} style={{cursor:"pointer"}}>
                                                    Delete
                                            </span>


                                        </li>
                                    ))
                                }

                            </ul>

                        </div>

                </div>

        </Layout>
    )
}
export  default ManageProduct