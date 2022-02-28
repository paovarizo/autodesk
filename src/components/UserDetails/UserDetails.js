import { useNavigate, useParams } from 'react-router-dom';
import './UserDetails.scss'
import { MdArrowBackIosNew} from 'react-icons/md';
const UserDetails =()=>{
    let {name} = useParams()
    let {email} = useParams()
    let {phone} = useParams()
    let {lastname} = useParams()
    const navigate = useNavigate()

    let first_avatar = name.substring(0,1)
    let second_avatar = lastname.substring(0,1)
    
    const backButton=()=>{
        navigate('/')
    }
    return(
        <>
            <div className='back-container'>
                <div className='back-subcontainer'>
                    <MdArrowBackIosNew onClick={()=>backButton()}/>
                </div>
            </div>
            <div className='details-container'>
                <div className='details-subcontainer'>
                    <div className='container-avatar'>
                        <div className='avatar'>
                            {first_avatar} {second_avatar}
                        </div>
                    </div>
                    <div className='details-data-name'>{name} {lastname}</div>
                    <div className='details-data-email'>{email}</div>
                    <div className='details-data-phone'>{phone}</div>
                </div>
            </div>
        </>
    )
}
export default UserDetails;