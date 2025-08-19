import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Add from './component/Add';
import { useState } from 'react';
import MediaCard from './component/cardlist';
import Edit from './component/edit';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // height: 650,
  // bgcolor: 'background.paper',
  bgcolor: '#fff',
  color: '#000',  
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(brand="", model="", vehicleid) {
  const [open, setOpen] = React.useState(false);
  const handleaddOpen = () => setOpen(true);
  const handleaddClose = () => setOpen(false);
  const [add,setadd] =useState([]) 
    
    function handleCreate(){
      handleaddClose();
     }
   

console.log(add,"ADDDDDDD");
  return (
    <>
      
    <div style={{ textAlign: 'right'}}>
        
        <Button  variant="contained" onClick={handleaddOpen}>Add vechile</Button>
        <Modal
          open={open}
          onClose={handleaddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Add onAdd={handleCreate} onCancel={handleaddClose} />
            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          </Typography>
        </Box>
        </Modal>
        </div>

   
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', gap: 40}}>
     
    { add &&
           
           add.map((item) => (
  <MediaCard 
    key={item.id}
    id={item.id}
    registration={item.registration}
    brand={item.brand}
    type={item.type}
    city={item.city}
    saledate={item.saledate}

  />
))}
</div>

</>
  );
}

            
          
      
    
  
