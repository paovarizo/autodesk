import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showUser } from 'src/redux/actions';
import axios from 'axios';
import './Home.scss'
import { MdEmail } from 'react-icons/md';
import { FaUserCircle ,FaCalendar,FaPhoneAlt} from 'react-icons/fa';
import { BsGenderFemale,BsGenderMale} from 'react-icons/bs';
import { IoIosAdd} from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { Navigate, useNavigate } from 'react-router-dom';
import UserDetails from '../UserDetails/UserDetails';

const Home =()=>{
    const [datos, setDatos] = useState(null);
    const [open, setOpen] = useState(false);
    const [gender, setGender]= useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] =useState('')
    const [phone, setPhone]= useState('')
    const navigate = useNavigate()

    useEffect(() => {
      fetchData().then((response) => {
        setDatos(response);
      });
    }, []);
    const handleChangeName =(e)=>{
      setName(e.target.value)
    }
    const handleChangeDob =(e)=>{
      setDob(e.target.value)
    }
    const handleChangeGender =(e)=>{
      setGender(e.target.value)
    }
    const handleChangeEmail =(e)=>{
      setEmail(e.target.value)
    }
    const handleChangePhone =(e)=>{
      setPhone(e.target.value)
    }
    function getModalStyle() {
      const top = 50 ;
      const left = 50 ;
    
      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }
    const [modalStyle] = useState(getModalStyle)
    const fetchData = async () => {
      return fetch("https://autodesk.free.beeceptor.com/users").then((response) => {
        return response
          .json()
          .then((data) => {
            console.log(data.results);
            return data.results;
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    };
    const useStyles = makeStyles((theme) => ({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const postData=async()=>{
      fetch('https://autodesk.free.beeceptor.com/users-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, dob: dob, gender: gender, email:email, phone:phone})
      }).then(res => res.json())
        .then(res => console.log(res));
    }
    const addNewUser=()=>{
      if(name!=='' && dob !=='' && gender!=='' && gender!=='Select gender' && email!=='' && phone!==''){
        postData()
        handleClose()
      }
    }
    const showDetails=(name,lastname,email,phone)=>{
      navigate(`/details/${name}/${lastname}/${email}/${phone}`)
    }
    const classes = useStyles();
    const body = (
      <div style={modalStyle} className='modal'>
        <h2>ADD NEW USER</h2>
        <div className='textfield-container'>
          <TextField
          label="Name"
          type="text"
          value={name}
          onChange={handleChangeName}
          className='textfield-name'
          InputLabelProps={{
            shrink: true,
          }}
          />
        </div>
        <div className='textfield-container'>
          <TextField
          id="date"
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={handleChangeDob}
          defaultValue="1997-05-24"
          className='textfield-dob'
          InputLabelProps={{
            shrink: true,
          }}
          />
        </div>
        <div className='textfield-container'>
          <Select onChange={handleChangeGender} value={gender} displayEmpty className='select-gender'>
            <MenuItem value="" disabled>
              Select gender
            </MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </div>
        <div className='textfield-container'>
          <TextField
          label="Email"
          value={email}
          onChange={handleChangeEmail}
          type="email"
          className='textfield-email'
          InputLabelProps={{
            shrink: true,
          }}
          />
        </div>
        <div className='textfield-container'>
          <TextField
          label="Phone"
          type="number"
          value={phone}
          onChange={handleChangePhone}
          className='textfield-phone'
          InputLabelProps={{
            shrink: true,
          }}
          />
        </div>
        <div className='btn-container'>
          <button className='btn-cancel' onClick={handleClose}>CANCEL</button> <button className='btn-add' onClick={()=>addNewUser()}>CREATE</button>
        </div>
      </div>
    );
    return (
      <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <div className='container-btn'>
        <div className='sub-container-btn'>
          <button onClick={handleOpen} className='btn-add'><IoIosAdd/>ADD USER</button>
        </div>
      </div>
        <div className='container'>
        <table>
        <thead>
          <tr>
          <th className='th-table'><div className='div-th'><FaUserCircle className='name-icon'/> NAME</div></th>
            <th className='th-table'><div className='div-th'><FaCalendar className='dob-icon'/> DOB</div></th>
            <th className='th-table'><div className='div-th'><BsGenderFemale className='genderf-icon'/> <BsGenderMale className='gender-icon'/> GENDER</div></th>
            <th className='th-table'><div className='div-th email-label'><MdEmail className='email-icon'/> EMAIL</div></th>
            <th className='th-table'><div className='div-th phone-label'><FaPhoneAlt className='phone-icon'/> PHONE</div></th>
          </tr>
        </thead>
        <tbody>
          {datos &&
            datos.map((i, index) => {
              return (
                <tr key={index} className='tr-table'>
                <td className='td-table td-table-name' onClick={()=>showDetails(i.name.first,i.name.last,i.email,i.phone)}>
                  <div>
                    <p>{i.name.first} {i.name.last}</p>
                    <button className='btn-cancel-details'>SEE DETAILS</button>
                  </div>
                  </td>
                <td className='td-table'>{i.dob.date.substr(0,10)}</td>
                <td className='td-table'>{i.gender}</td>
                <td className='td-table'>{i.email}</td>
                <td className='td-table td-table-phone'>{i.phone.replace(/-/gi,'')}</td>
                </tr>

              );
            })}
        </tbody>
      </table>
      </div>
      </>
    );
}
export default Home;