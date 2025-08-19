import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Edit  from './edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './add.css'
import Delete from './delete';


const style = {
  position: 'absolute',
  top: '50%',     
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // height: 700,
  // bgcolor: 'background.paper',
  bgcolor: '#fff',
  color: '#000',  
  border: '2px solid #000',
  boxShadow: 35,
  p: 4,
  gap: 10,
};

export default function MediaCard({registration,brand,type,city,saledate,vehicleid,onDeleted}) {

   const [ openedit, setopenedit]=React.useState(false);
  const handleditOpen = () => setopenedit(true);
  const handleeditClose = () => setopenedit(false);



  




  return (
    <div className='Cardd'>


    <Card sx={{ maxWidth: 400, maxHeight: 500, boxShadow:20}}>
      <CardContent >
      {/* <CardMedia
        sx={{ height: 150}}
        
       
      /> */}
      
        <div style={{left:150,bottom: 380}}>
          <br></br>
          <br></br>
          <h3> Registrtion number: {registration}</h3>
          <h3> vechile Brand: {brand}</h3>
          <h3> Vechile Type: {type}</h3>
          <h3> City: {city}</h3>
           <h3> Sale date: {saledate}</h3>
           </div>
          
          
    
      
      {/* <CardActions> */}
       
      


      <Button onClick={handleditOpen}  style={{left:220,bottom:250}}>   📝 Edit  </Button>
      <Modal
        open={openedit}
        onClose={handleeditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <Edit onCancel={handleeditClose} vehicleid={vehicleid} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          </Typography>
        </Box>
      </Modal>
    
            <Delete vehicleid={vehicleid} onDeleted={onDeleted} />
      {/* </CardActions> */}
       </CardContent>
    </Card>
   
  
 </div>
  );
 
}
