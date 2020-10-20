import  React,{Fragment} from "react"
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
import Search from './Search'
const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return{color:'#ff9900'}
    }
    else{
        return{color:"#ffffff"}
    }
}



const Menu =({history}) =>(

    <div>

        <ul className={'nav nav-tabs bg-primary'}>
            <li>
                <Link className={'nav-link'} style={isActive(history,'/')} to={'/'}>Home </Link>
            </li>
            <li>
                <Link className={'nav-link'} style={isActive(history,'/shop')} to={'/shop'}>Shop </Link>
            </li>
            <li>
                <Link className={'nav-link'} style={isActive(history,'/cart')} to={'/cart'}>
                    Cart <sup small className={'cart-badge'}>{itemTotal()}</sup>
                    </Link>
            </li>

            {isAuthenticated() &&isAuthenticated().user.role===0 &&(
                <li>
                    <Link className={'nav-link'} style={isActive(history,'/user/dashboard')} to={'/user/dashboard'}>Dashboard </Link>
                </li>
            )}

            {isAuthenticated() &&isAuthenticated().user.role===1 &&(
                <li>
                    <Link className={'nav-link'} style={isActive(history,'/admin/dashboard')} to={'/admin/dashboard'}>Dashboard </Link>
                </li>
            )}

           {!isAuthenticated() && (
               <Fragment>
                    <li>
                        <Link className={'nav-link'} style={isActive(history,'/Signin')} to={'/signin'}>Signin </Link>
                     </li>
                    <li>
                        <Link className={'nav-link'} style={isActive(history,'/Signup')} to={'/signup'}>Signup </Link>
                     </li>

               </Fragment>
          )}
               {isAuthenticated() && (

                <li>
                <span
               
                className={'nav-link'} 
                style={{cursor:'pointer',color:'#ffffff'}} 
                onClick={()=>signout(()=>{
                    history.push('/')

                })}
                >
                    signout 
                </span>
            </li>
               )}
           

           
        </ul>
    </div>
)

export default withRouter(Menu)